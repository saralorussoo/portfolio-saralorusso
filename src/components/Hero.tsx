import { useRef } from "react";
import DraggableSticker from "./DraggableSticker";
import NameSticker from "./stickers/NameSticker";
import LearningSticker from "./stickers/LearningSticker";
import InterestsSticker from "./stickers/InterestsSticker";
import PhotoSticker from "./stickers/PhotoSticker";
import ContactSticker from "./stickers/ContactSticker";
import LinkedInSticker from "./stickers/LinkedInSticker";
import heroBg from "../assets/images/hero-bg.jpg";

/**
 * Sticker layout is intentionally split by breakpoint rather than scaled
 * continuously, since card padding/fonts don't shrink at the same rate:
 *  - below 768px (phones, small tablets): one screen tall; the name sticker is
 *    pinned in the centre and the others are scattered evenly around it;
 *  - 768–1023px: compact vertical cascade, name first;
 *  - `lg`+: the free-floating arrangement traced from the Figma canvas
 *    (1440 x 880 content box; percentages are the Figma offsets over that).
 */
export default function Hero() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden border-b-4 border-[#ffc9f1] bg-[#ff8fc0]"
    >
      {/* Background: pink halftone texture, slightly blurred (as in Figma). Oversized so the blurred edges are cropped. */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[112%] w-[122%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover blur-[2.5px]"
        />
      </div>

      {/* Draggable playground layer */}
      <div
        ref={constraintsRef}
        className="relative mx-auto min-h-[max(100dvh,550px)] w-full max-w-[1440px] px-4 pb-16 pt-32 sm:min-h-[max(100dvh,720px)] md:min-h-[1100px] lg:min-h-[880px] lg:pt-28"
      >
        {/* Name — sticker-sara.png. Pinned in the centre below 768px, draggable from md up. */}
        <DraggableSticker
          key="name"
          constraintsRef={constraintsRef}
          enterDelay={0}
          fixedBelow={768}
          className="left-[calc(50%-130px)] top-[calc(50%-40px)] sm:left-[calc(50%-160px)] sm:top-[calc(50%-49px)] md:left-[8%] md:top-16 lg:left-[33.1%] lg:top-[35.2%]"
        >
          <NameSticker />
        </DraggableSticker>

        <DraggableSticker
          key="learning"
          constraintsRef={constraintsRef}
          enterDelay={0.15}
          className="left-[5%] top-[14%] md:left-[6%] md:top-[19%] lg:left-[24.7%] lg:top-[17.5%]"
        >
          <LearningSticker />
        </DraggableSticker>

        <DraggableSticker
          key="photo"
          constraintsRef={constraintsRef}
          enterDelay={0.3}
          className="left-[58%] top-[15%] sm:top-[10%] md:left-[8%] md:top-[30%] lg:left-[76.2%] lg:top-[25.8%]"
        >
          <PhotoSticker />
        </DraggableSticker>

        <DraggableSticker
          key="interests"
          constraintsRef={constraintsRef}
          enterDelay={0.45}
          className="left-[38%] top-[60%] md:left-[6%] md:top-[50%] lg:left-[5.55%] lg:top-[39.2%]"
        >
          <InterestsSticker />
        </DraggableSticker>

        <DraggableSticker
          key="contact"
          constraintsRef={constraintsRef}
          enterDelay={0.6}
          className="left-[3%] top-[87%] md:left-[6%] md:top-[78%] lg:left-[20.35%] lg:top-[72.5%]"
        >
          <ContactSticker />
        </DraggableSticker>

        <DraggableSticker
          key="linkedin"
          constraintsRef={constraintsRef}
          enterDelay={0.75}
          className="left-[5%] top-[29%] md:left-[8%] md:top-[88%] lg:left-[67.8%] lg:top-[64.3%]"
        >
          <LinkedInSticker />
        </DraggableSticker>
      </div>
    </section>
  );
}
