import coffee from "../../assets/home/coffee.png";

export default function CoffeeSticker() {
  return (
    <div className="flex w-fit items-center gap-1.5 whitespace-nowrap rounded-xl border-4 border-white bg-[#f0dcad] px-4 py-2.5 shadow-sticker-sm sm:px-5 sm:py-3">
      <p className="text-[13px] font-medium tracking-[-0.3px] text-[#684c0b] sm:text-base">
        Coffee addict
      </p>
      {/* Moka pot, cropped from the Figma emoji sheet. */}
      <span aria-hidden="true" className="relative h-[25px] w-5 shrink-0 overflow-hidden">
        <img
          src={coffee}
          alt=""
          draggable={false}
          className="absolute left-[-40%] top-[-20%] h-[140%] w-[175%] max-w-none"
        />
      </span>
    </div>
  );
}
