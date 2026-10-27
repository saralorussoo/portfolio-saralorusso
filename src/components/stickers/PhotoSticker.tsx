import slrPhoto from "../../assets/images/slr-photo.jpg";

export default function PhotoSticker() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white bg-white p-1.5 shadow-sticker sm:p-2">
      <div className="flex flex-col items-center gap-1.5 rounded-md border border-black/10 bg-white p-2 sm:gap-2 sm:p-2.5">
        <div className="h-[130px] w-[98px] overflow-hidden rounded-md sm:h-[215px] sm:w-[162px]">
          <img
            src={slrPhoto}
            alt="Sara Lo Russo davanti a un cancello verde"
            className="h-full w-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </div>
        <p className="whitespace-nowrap text-center text-sm tracking-[-0.32px] text-black sm:text-base">
          it's me, SLR
        </p>
      </div>
    </div>
  );
}
