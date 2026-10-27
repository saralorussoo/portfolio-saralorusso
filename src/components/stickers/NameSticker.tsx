import stickerSara from "../../assets/images/sticker-sara.png";

export default function NameSticker() {
  return (
    <img
      src={stickerSara}
      alt="Sara Lo Russo, UX/UI designer"
      className="w-[260px] select-none sm:w-[320px] lg:w-[556px]"
      draggable={false}
      loading="eager"
    />
  );
}
