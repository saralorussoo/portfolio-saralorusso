import { useRef } from "react";
import DraggableSticker from "./DraggableSticker";
import Star from "./Star";
import NameSticker from "./stickers/NameSticker";
import LearningSticker from "./stickers/LearningSticker";
import LocationSticker from "./stickers/LocationSticker";
import CoffeeSticker from "./stickers/CoffeeSticker";
import InterestsSticker from "./stickers/InterestsSticker";
import PhotoSticker from "./stickers/PhotoSticker";
import ContactSticker from "./stickers/ContactSticker";
import LinkedInSticker from "./stickers/LinkedInSticker";
import MusicSticker from "./stickers/MusicSticker";
import starLarge from "../assets/home/star6.svg";
import starMedium from "../assets/home/star8.svg";
import starSmall from "../assets/home/star7.svg";

/**
 * Sticker layout is intentionally split by breakpoint rather than scaled
 * continuously, since card padding/fonts don't shrink at the same rate:
 *  - below 768px (phones, small tablets): one screen tall; the name sticker is
 *    pinned in the centre and the others are scattered evenly around it;
 *  - 768–1023px: compact arrangement, name first;
 *  - `lg`+: the free-floating arrangement traced from the Figma canvas
 *    (1440 x 884 content box; percentages are the Figma offsets over that).
 */
export default function Hero() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#fafafa]">
      {/* Draggable playground layer */}
      <div
        ref={constraintsRef}
        className="relative mx-auto min-h-[990px] w-full max-w-[1440px] px-4 pb-16 pt-32 sm:min-h-[1140px] md:min-h-[980px] xl:min-h-[884px] xl:pt-28"
      >
        {/* Pink stars: decoration only, under the stickers. */}
        <Star
          src={starLarge}
          box={94.307}
          size={73}
          rotate={-20.99}
          inset={[-17.73, -18.5, -12.96, -18.5]}
          delay={0.2}
          className="hidden xl:flex xl:left-[18.36%] xl:top-[76.4%]"
        />
        <Star
          src={starLarge}
          box={95.257}
          size={73}
          rotate={22.32}
          inset={[-17.73, -18.5, -12.96, -18.5]}
          delay={0.5}
          className="left-[74%] top-[18px] scale-[0.6] md:left-[84%] md:top-[60px] md:scale-75 xl:left-[65.07%] xl:top-[7.47%] xl:scale-100"
        />
        <Star
          src={starMedium}
          box={56.748}
          size={46.492}
          rotate={14.67}
          inset={[-27.84, -28.11, -21.14, -28.11]}
          delay={0.8}
          className="left-[80%] top-[385px] scale-75 sm:top-[470px] md:left-[90%] md:top-[520px] md:scale-100 xl:left-[44.1%] xl:top-[63.57%]"
        />
        <Star
          src={starSmall}
          box={47.538}
          size={36.94}
          rotate={20.5}
          inset={[-35.04, -34.96, -26.96, -34.96]}
          delay={1.1}
          className="hidden md:flex md:left-[50%] md:top-[640px] xl:left-[70.63%] xl:top-[29.86%]"
        />
        <Star
          src={starSmall}
          box={48.534}
          size={36.94}
          rotate={-23.29}
          inset={[-35.04, -34.96, -26.96, -34.96]}
          delay={1.4}
          className="left-[84%] top-[470px] scale-75 sm:top-[560px] md:left-[92%] md:top-[300px] md:scale-100 xl:left-[86.81%] xl:top-[19.57%]"
        />
        <Star
          src={starSmall}
          box={45.059}
          size={36.94}
          rotate={-14.6}
          inset={[-35.04, -34.96, -26.96, -34.96]}
          delay={1.7}
          className="left-[3%] top-[330px] scale-75 sm:top-[420px] md:left-[3%] md:top-[190px] md:scale-100 xl:left-[11.3%] xl:top-[27.46%]"
        />

        {/* Name — vector lettering. Pinned in the centre below 768px, draggable from md up. */}
        <DraggableSticker
          key="name"
          constraintsRef={constraintsRef}
          enterDelay={0}
          fixedBelow={768}
          className="left-[calc(50%-130px)] top-[404px] sm:left-[calc(50%-160px)] sm:top-[480px] md:left-[calc(50%-210px)] md:top-[110px] xl:left-[33.26%] xl:top-[35.29%]"
        >
          <NameSticker />
        </DraggableSticker>

        <DraggableSticker
          key="learning"
          constraintsRef={constraintsRef}
          enterDelay={0.15}
          className="left-[4%] top-[96px] sm:top-[100px] md:left-[5%] md:top-[250px] xl:left-[16.18%] xl:top-[18.21%]"
        >
          <LearningSticker />
        </DraggableSticker>

        <DraggableSticker
          key="location"
          constraintsRef={constraintsRef}
          enterDelay={0.25}
          className="left-[6%] top-[180px] max-[359px]:left-[3%] sm:top-[205px] md:left-[30%] md:top-[262px] xl:left-[30.07%] xl:top-[23.53%]"
        >
          <LocationSticker />
        </DraggableSticker>

        <DraggableSticker
          key="coffee"
          constraintsRef={constraintsRef}
          enterDelay={0.35}
          className="left-[56%] top-[310px] sm:top-[400px] md:left-[62%] md:top-[250px] xl:left-[54.17%] xl:top-[19.12%]"
        >
          <CoffeeSticker />
        </DraggableSticker>

        <DraggableSticker
          key="photo"
          constraintsRef={constraintsRef}
          enterDelay={0.3}
          className="left-[calc(100%-146px)] top-[104px] sm:left-[60%] sm:top-[100px] md:left-[6%] md:top-[360px] xl:left-[76.18%] xl:top-[25.68%]"
        >
          <PhotoSticker />
        </DraggableSticker>

        <DraggableSticker
          key="interests"
          constraintsRef={constraintsRef}
          enterDelay={0.45}
          className="left-[4%] top-[510px] sm:top-[610px] md:left-[33%] md:top-[380px] xl:left-[5.56%] xl:top-[39.03%]"
        >
          <InterestsSticker />
        </DraggableSticker>

        <DraggableSticker
          key="music"
          constraintsRef={constraintsRef}
          enterDelay={0.55}
          className="left-[16%] top-[792px] sm:left-[8%] sm:top-[900px] md:left-[5%] md:top-[700px] xl:left-[61.94%] xl:top-[62.78%]"
        >
          <MusicSticker />
        </DraggableSticker>

        <DraggableSticker
          key="contact"
          constraintsRef={constraintsRef}
          enterDelay={0.6}
          className="left-[8%] top-[710px] sm:left-[52%] sm:top-[720px] md:left-[46%] md:top-[720px] xl:left-[34.44%] xl:top-[79.41%]"
        >
          <ContactSticker />
        </DraggableSticker>

        <DraggableSticker
          key="linkedin"
          constraintsRef={constraintsRef}
          enterDelay={0.75}
          className="left-[4%] top-[244px] sm:top-[290px] md:left-[72%] md:top-[390px] xl:left-[29.44%] xl:top-[65.72%]"
        >
          <LinkedInSticker />
        </DraggableSticker>
      </div>
    </section>
  );
}
