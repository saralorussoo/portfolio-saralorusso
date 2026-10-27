import { Bodies, Body, Composite, Constraint, Engine, Events, type IEventCollision } from "matter-js";

/**
 * Physics behind the About › Tools box (Matter.js, rendered as plain DOM).
 *
 * - Drop: each chip is released above the box and falls under gravity. A
 *   hidden "ledge" under its Figma position catches it, so the settled layout
 *   is the designed one — but chips still collide with each other, the walls
 *   and their ledge on the way down, so nothing falls on a scripted path.
 * - Rest: once a chip has stopped, gravity no longer acts on it (the box is a
 *   free-floating playground, like the Home stickers) and it stays where it is.
 * - Play: a chip is dragged with a spring to the pointer; on release it keeps
 *   its velocity and spin, bounces off walls and other chips (which are shoved
 *   in turn) and slows down through air friction.
 */

export type ToolSpec = {
  /** Resting tilt in degrees (from Figma). */
  rot: number;
  /** Resting centre in the sm+ layout: px in the 1038 x 299 Figma box. */
  desktop: [number, number];
  /** Resting centre in the phone layout: x in % of the box, y in px. */
  mobile: [number, number];
};

type ChipState = {
  w: number;
  h: number;
  body: Body | null;
  ledge: Body | null;
  released: boolean;
  landed: boolean;
  entered: boolean;
  touched: boolean;
  restFrames: number;
  releasedAt: number;
  /** Short ease from where the chip came to rest onto its exact Figma spot. */
  snap: { t0: number; dur: number; x: number; y: number; a0: number; a1: number } | null;
};

const STEP = 1000 / 60;
// Three physics sub-steps per frame: a falling chip moves a third as far per step,
// so it penetrates the ledge far less deep before the solver pushes it out
// (deep penetrations are what used to spin chips over on landing).
const SUB = 3;
const DT = STEP / SUB;
const WALL = 200;
// Matter reports velocities per 16.7 ms whatever the sub-step, so these
// limits and the rest thresholds below are in px (or rad) per frame.
const MAX_SPEED = 30;
// Terminal velocity while dropping in: the same gentle impact on a short desktop
// box and a tall phone one (a harder hit makes a chip tumble off its ledge).
const MAX_FALL = 8;
// Bounciness while dropping onto the ledge vs once the chip is free to be thrown.
const FALL_BOUNCE = 0.2;
const PLAY_BOUNCE = 0.45;
const MAX_SPIN = 0.35;
const REF_W = 1038;
const REF_H = 299;
const PHONE_QUERY = "(max-width: 639px)";

const CAT_WALL = 1 << 20;
const CAT_TOP = 1 << 21;
const chipCat = (i: number) => 1 << i;
const ledgeCat = (i: number) => 1 << (10 + i);

const rad = (deg: number) => (deg * Math.PI) / 180;

let topZ = 1;

export class ToolWorld {
  private engine: Engine;
  private chips: ChipState[];
  private walls: Body[] = [];
  private allChipsMask: number;
  private drag: Constraint | null = null;
  private grabbed = -1;
  private pointer = { x: 0, y: 0 };
  private W = 0;
  private H = 0;
  private phone = false;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private idleFrames = 0;
  private pending = 0;
  private timers: number[] = [];
  private destroyed = false;

  constructor(
    private box: HTMLElement,
    private els: HTMLElement[],
    private specs: ToolSpec[],
    private reduce: boolean,
  ) {
    this.engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
      positionIterations: 8,
      velocityIterations: 6,
      constraintIterations: 3,
    });
    this.allChipsMask = (1 << specs.length) - 1;
    this.chips = specs.map(() => ({
      w: 0,
      h: 0,
      body: null,
      ledge: null,
      released: false,
      landed: false,
      entered: false,
      touched: false,
      restFrames: 0,
      releasedAt: 0,
      snap: null,
    }));
    this.measure();
    this.buildWalls();

    if (reduce) {
      // No fall for reduced motion: chips sit at their places, hidden until `drop()`.
      this.chips.forEach((_, i) => this.placeAtRest(i));
    } else {
      this.pending = this.chips.length;
    }

    Events.on(this.engine, "beforeUpdate", this.beforeUpdate);
    Events.on(this.engine, "afterUpdate", this.afterUpdate);
    Events.on(this.engine, "collisionStart", this.onCollision);
    this.render();
  }

  // ---- layout ---------------------------------------------------------

  private measure() {
    this.W = this.box.clientWidth;
    this.H = this.box.clientHeight;
    this.phone = window.matchMedia(PHONE_QUERY).matches;
    this.chips.forEach((c, i) => {
      c.w = this.els[i].offsetWidth;
      c.h = this.els[i].offsetHeight;
    });
  }

  private rest(i: number) {
    const s = this.specs[i];
    return this.phone
      ? { x: (s.mobile[0] / 100) * this.W, y: s.mobile[1] }
      : { x: (s.desktop[0] / REF_W) * this.W, y: (s.desktop[1] / REF_H) * this.H };
  }

  private buildWalls() {
    Composite.remove(this.engine.world, this.walls);
    const { W, H } = this;
    const opts = {
      isStatic: true,
      friction: 1,
      restitution: 0,
      collisionFilter: { category: CAT_WALL, mask: this.allChipsMask },
    };
    const top = Bodies.rectangle(W / 2, -WALL / 2, W + WALL * 2, WALL, {
      ...opts,
      collisionFilter: { category: CAT_TOP, mask: this.allChipsMask },
    });
    this.walls = [
      Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, opts),
      // Side walls reach well above the box so chips can't slip out while falling in.
      Bodies.rectangle(-WALL / 2, (H - 1200) / 2, WALL, H + 1200, opts),
      Bodies.rectangle(W + WALL / 2, (H - 1200) / 2, WALL, H + 1200, opts),
      top,
    ];
    Composite.add(this.engine.world, this.walls);
  }

  private makeBody(i: number, x: number, y: number, angle: number) {
    const { w, h } = this.chips[i];
    return Bodies.rectangle(x, y, w, h, {
      chamfer: { radius: h * 0.3 },
      angle,
      density: 0.001,
      restitution: FALL_BOUNCE,
      friction: 0.6,
      frictionStatic: 0.9,
      frictionAir: 0.012,
      plugin: { chip: i },
      collisionFilter: {
        category: chipCat(i),
        mask: this.allChipsMask | CAT_WALL | ledgeCat(i),
      },
    });
  }

  /**
   * Thin ledge under the chip's resting place, tilted like the chip, with a
   * small lip at its low end so a tilted chip can't slide off it.
   */
  private makeLedge(i: number) {
    const { w, h } = this.chips[i];
    const { x, y } = this.rest(i);
    const theta = rad(this.specs[i].rot);
    // Thick on purpose: a chip falls ~15px per step and the engine has no
    // continuous collision detection, so a thin ledge would let it tunnel.
    const thick = 40;
    const off = h / 2 + thick / 2;
    const cx = x - off * Math.sin(theta);
    const cy = y + off * Math.cos(theta);
    const part = {
      friction: 1,
      angle: theta,
      plugin: { ledge: i },
      collisionFilter: { category: ledgeCat(i), mask: chipCat(i) },
    };
    const parts = [Bodies.rectangle(cx, cy, w * 1.2, thick, part)];
    if (Math.abs(theta) > 0.05) {
      const s = Math.sign(theta);
      const reach = w * 0.6 + 2;
      const lipX = cx + s * reach * Math.cos(theta) + (thick / 2) * Math.sin(theta);
      const lipY = cy + s * reach * Math.sin(theta) - (thick / 2) * Math.cos(theta);
      parts.push(Bodies.rectangle(lipX, lipY, 6, 26, part));
    }
    // The compound parent needs the same filter as its parts, or it would
    // collide with every chip instead of only its own.
    const ledge = Body.create({ parts, collisionFilter: part.collisionFilter, plugin: part.plugin });
    Body.setStatic(ledge, true);
    return ledge;
  }

  // ---- lifecycle ------------------------------------------------------

  /** Starts the fall (or, for reduced motion, just reveals the chips). */
  drop() {
    if (this.destroyed) return;
    if (this.reduce) {
      this.els.forEach((el, i) => {
        window.setTimeout(() => {
          el.style.opacity = "1";
          el.dataset.ready = "true";
        }, i * 50);
      });
      this.start();
      return;
    }
    // Bottom chips first: a chip never has to fall through a place that's
    // still empty above one that has already landed.
    const order = this.chips
      .map((_, i) => i)
      .sort((a, b) => this.rest(b).y - this.rest(a).y);
    // A chip spawns just above the box, so it may only be released once the
    // previous chip in its lane has fallen clear of the spawn spot (else the
    // two would start out overlapping and the solver would fling them apart).
    const at = new Map<number, number>();
    order.forEach((i, rank) => {
      let t = 200 + rank * 130;
      for (const [j, tj] of at) {
        const sameLane =
          Math.abs(this.rest(i).x - this.rest(j).x) < (this.chips[i].w + this.chips[j].w) / 2 + 8;
        if (sameLane) t = Math.max(t, tj + 300);
      }
      at.set(i, t);
      this.timers.push(window.setTimeout(() => this.release(i), t));
    });
  }

  private release(i: number) {
    if (this.destroyed) return;
    const c = this.chips[i];
    if (c.released) return;
    const { x } = this.rest(i);
    // Almost flat on purpose: a clean landing, not a corner-first tumble.
    const spin = (i % 2 === 0 ? 1 : -1) * (0.4 + (i % 3) * 0.3);
    c.body = this.makeBody(i, x, -c.h / 2 - 6, rad(this.specs[i].rot + spin));
    c.ledge = this.makeLedge(i);
    c.released = true;
    c.releasedAt = performance.now();
    this.pending -= 1;
    Composite.add(this.engine.world, [c.body, c.ledge]);
    this.start();
  }

  private placeAtRest(i: number) {
    const c = this.chips[i];
    if (c.body) Composite.remove(this.engine.world, c.body);
    if (c.ledge) Composite.remove(this.engine.world, c.ledge);
    const { x, y } = this.rest(i);
    c.body = this.makeBody(i, x, y, rad(this.specs[i].rot));
    c.body.frictionAir = this.reduce ? 0.5 : 0.028;
    c.body.restitution = PLAY_BOUNCE;
    c.body.collisionFilter.mask = (c.body.collisionFilter.mask ?? 0) | CAT_TOP;
    c.ledge = null;
    c.released = c.landed = c.entered = true;
    Composite.add(this.engine.world, c.body);
  }

  /** Window or font changes: rebuild everything at the new size. */
  resize() {
    if (this.destroyed) return;
    const oldW = this.W;
    const oldH = this.H;
    const oldPhone = this.phone;
    const oldSizes = this.chips.map((c) => `${c.w}x${c.h}`).join();
    this.measure();
    if (
      this.W === oldW &&
      this.H === oldH &&
      this.phone === oldPhone &&
      this.chips.map((c) => `${c.w}x${c.h}`).join() === oldSizes
    ) {
      return;
    }
    this.buildWalls();
    this.letGo();
    const started = this.chips.some((c) => c.released);
    if (!started && !this.reduce) {
      // Nothing has fallen yet: chips are placed from the fresh measurements on release.
      this.render();
      return;
    }
    const dropping = started && this.chips.some((c) => !c.landed);
    if (dropping || this.phone !== oldPhone) {
      // Mid-fall or a different layout: just put every chip in its place.
      this.timers.forEach((t) => window.clearTimeout(t));
      this.timers = [];
      this.pending = 0;
      this.chips.forEach((_, i) => {
        this.placeAtRest(i);
        this.els[i].dataset.ready = "true";
      });
    } else {
      this.chips.forEach((c, i) => {
        if (!c.body) return;
        const x = (c.body.position.x / oldW) * this.W;
        const y = (c.body.position.y / oldH) * this.H;
        const angle = c.body.angle;
        Composite.remove(this.engine.world, c.body);
        c.body = this.makeBody(i, x, y, angle);
        c.body.frictionAir = this.reduce ? 0.5 : 0.028;
    c.body.restitution = PLAY_BOUNCE;
        c.body.collisionFilter.mask = (c.body.collisionFilter.mask ?? 0) | CAT_TOP;
        Composite.add(this.engine.world, c.body);
      });
    }
    this.render();
  }

  destroy() {
    this.destroyed = true;
    this.timers.forEach((t) => window.clearTimeout(t));
    if (this.raf) cancelAnimationFrame(this.raf);
    Events.off(this.engine, "beforeUpdate", this.beforeUpdate);
    Events.off(this.engine, "afterUpdate", this.afterUpdate);
    Events.off(this.engine, "collisionStart", this.onCollision);
    Composite.clear(this.engine.world, false);
    Engine.clear(this.engine);
  }

  // ---- pointer --------------------------------------------------------

  private toBox(clientX: number, clientY: number) {
    const r = this.box.getBoundingClientRect();
    return {
      x: Math.min(this.W - 4, Math.max(4, clientX - r.left - this.box.clientLeft)),
      y: Math.min(this.H - 4, Math.max(4, clientY - r.top - this.box.clientTop)),
    };
  }

  /** Picks chip `i` up with a spring at the pointer. Returns false if it can't be grabbed yet. */
  grab(i: number, clientX: number, clientY: number) {
    const c = this.chips[i];
    if (!c.landed || !c.body || this.grabbed >= 0) return false;
    const p = this.toBox(clientX, clientY);
    this.pointer = p;
    c.snap = null;
    this.drag = Constraint.create({
      pointA: { x: p.x, y: p.y },
      bodyB: c.body,
      pointB: { x: p.x - c.body.position.x, y: p.y - c.body.position.y },
      stiffness: this.reduce ? 0.6 : 0.2,
      damping: 0.12,
      length: 0,
    });
    Composite.add(this.engine.world, this.drag);
    this.grabbed = i;
    topZ += 1;
    this.els[i].style.zIndex = String(topZ);
    this.els[i].dataset.grabbed = "true";
    this.start();
    return true;
  }

  moveTo(clientX: number, clientY: number) {
    if (!this.drag) return;
    this.pointer = this.toBox(clientX, clientY);
    this.drag.pointA = { x: this.pointer.x, y: this.pointer.y };
    this.start();
  }

  /** Lets go: the chip keeps its velocity and spin (that's the throw). */
  letGo() {
    if (this.drag) {
      Composite.remove(this.engine.world, this.drag);
      this.drag = null;
    }
    if (this.grabbed >= 0) delete this.els[this.grabbed].dataset.grabbed;
    this.grabbed = -1;
    this.start();
  }

  // ---- simulation -----------------------------------------------------

  private beforeUpdate = () => {
    // Constant (not scaled with the box): impact speed stays gentle on tall phone boxes too.
    const g = 0.00105;
    this.chips.forEach((c) => {
      const b = c.body;
      if (!b) return;
      if (c.released && !c.landed) {
        Body.applyForce(b, b.position, { x: 0, y: b.mass * g });
      }
      if (c.snap) this.stepSnap(c, b);
      if (!c.entered && b.bounds.min.y >= 1) {
        // Fully inside: from now on the ceiling stops it too.
        c.entered = true;
        b.collisionFilter.mask = (b.collisionFilter.mask ?? 0) | CAT_TOP;
      }
      const limit = c.released && !c.landed ? MAX_FALL : MAX_SPEED;
      if (b.speed > limit) {
        const k = limit / b.speed;
        Body.setVelocity(b, { x: b.velocity.x * k, y: b.velocity.y * k });
      }
      if (Math.abs(b.angularVelocity) > MAX_SPIN) {
        Body.setAngularVelocity(b, Math.sign(b.angularVelocity) * MAX_SPIN);
      }
    });
  };

  private stepSnap(c: ChipState, b: Body) {
    const s = c.snap;
    if (!s) return;
    const i = this.chips.indexOf(c);
    const p = Math.min(1, (performance.now() - s.t0) / s.dur);
    const e = 1 - (1 - p) * (1 - p);
    const target = this.rest(i);
    Body.setPosition(b, { x: s.x + (target.x - s.x) * e, y: s.y + (target.y - s.y) * e });
    Body.setAngle(b, s.a0 + (s.a1 - s.a0) * e);
    Body.setVelocity(b, { x: 0, y: 0 });
    Body.setAngularVelocity(b, 0);
    if (p >= 1) c.snap = null;
  }

  private afterUpdate = () => {
    const now = performance.now();
    this.chips.forEach((c, i) => {
      const b = c.body;
      if (!b || !c.released || c.landed) return;
      const calm = c.touched && b.speed < 0.4 && Math.abs(b.angularSpeed) < 0.02;
      c.restFrames = calm ? c.restFrames + 1 : 0;
      if (c.restFrames >= 10 * SUB || now - c.releasedAt > 4500) this.land(i);
    });
  };

  private land(i: number) {
    const c = this.chips[i];
    const b = c.body;
    if (!b) return;
    c.landed = true;
    if (c.ledge) {
      Composite.remove(this.engine.world, c.ledge);
      c.ledge = null;
    }
    b.frictionAir = 0.028;
    b.restitution = PLAY_BOUNCE;
    const { x, y } = this.rest(i);
    const rot = rad(this.specs[i].rot);
    // Angle difference wrapped to [-PI, PI]: a chip that tumbled may have turned a full circle.
    const turn = Math.atan2(Math.sin(b.angle - rot), Math.cos(b.angle - rot));
    // Whatever the tumble, the intro ends on the designed layout: ease onto the
    // exact Figma position and tilt (usually a few px; longer if it was knocked far).
    const dist = Math.hypot(b.position.x - x, b.position.y - y);
    c.snap = {
      t0: performance.now(),
      dur: Math.min(500, 200 + dist * 4),
      x: b.position.x,
      y: b.position.y,
      a0: b.angle,
      // End angle is `rot` modulo a full turn, picked so the ease turns the short way.
      a1: b.angle - turn,
    };
    Body.setVelocity(b, { x: 0, y: 0 });
    Body.setAngularVelocity(b, 0);
    this.els[i].dataset.ready = "true";
  }

  private onCollision = (event: IEventCollision<Engine>) => {
    for (const { bodyA, bodyB } of event.pairs) {
      for (const body of [bodyA, bodyB]) {
        const i = body.plugin?.chip as number | undefined;
        if (i !== undefined) this.chips[i].touched = true;
      }
    }
  };

  private render() {
    this.chips.forEach((c, i) => {
      const el = this.els[i];
      let x: number;
      let y: number;
      let angle: number;
      if (c.body && c.released) {
        ({ x, y } = c.body.position);
        angle = c.body.angle;
      } else {
        // Waiting above the box (clipped) until its turn to fall.
        x = this.rest(i).x;
        y = -c.h;
        angle = rad(this.specs[i].rot);
      }
      el.style.transform = `translate(${(x - c.w / 2).toFixed(2)}px, ${(y - c.h / 2).toFixed(2)}px) rotate(${angle.toFixed(4)}rad)`;
    });
  }

  private isIdle() {
    if (this.pending > 0 || this.grabbed >= 0) return false;
    return this.chips.every((c) => {
      const b = c.body;
      return c.landed && !c.snap && !!b && b.speed < 0.03 && Math.abs(b.angularSpeed) < 0.002;
    });
  }

  private start() {
    this.idleFrames = 0;
    if (this.raf || this.destroyed) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (t: number) => {
    this.raf = 0;
    if (this.destroyed) return;
    this.acc += Math.min(t - this.last, 50);
    this.last = t;
    let steps = 0;
    while (this.acc >= STEP && steps < 4) {
      for (let k = 0; k < SUB; k += 1) Engine.update(this.engine, DT);
      this.acc -= STEP;
      steps += 1;
    }
    if (this.acc > STEP) this.acc = 0;
    this.render();
    this.idleFrames = this.isIdle() ? this.idleFrames + 1 : 0;
    // Everything has come to rest: stop spending frames until the next touch.
    if (this.idleFrames > 45) return;
    this.raf = requestAnimationFrame(this.tick);
  };
}
