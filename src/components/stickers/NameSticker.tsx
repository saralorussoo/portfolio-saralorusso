import saraStroke from "../../assets/home/sara-stroke.svg";
import uxDesigner from "../../assets/home/ux.svg";
import uxDesignerStroke from "../../assets/home/ux-stroke.svg";
import nameEye from "../../assets/home/name-eye.svg";

/**
 * "sara lo russo / ux/ui designer" lettering: vector art exported from Figma
 * (white outline and soft shadow included). Everything is placed in % of the
 * 552.25 x 162.48 Figma block, so it scales with the width alone.
 */
export default function NameSticker() {
  return (
    <div
      role="img"
      aria-label="Sara Lo Russo, UX/UI designer"
      className="relative aspect-[552.252/162.482] w-[260px] select-none sm:w-[320px] md:w-[420px] xl:w-[552px]"
    >
      <img
        src={saraStroke}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute max-w-none"
        style={{ left: "-0.724%", top: 0, width: "101.449%", height: "62.09%" }}
      />
      <div
        className="absolute"
        style={{ left: "18.63%", top: "59.63%", width: "62.74%", height: "40.37%" }}
      >
        <img
          src={uxDesigner}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute max-w-none"
          style={{ left: "1.443%", top: "13.72%", width: "97.11%", height: "84.76%" }}
        />
        <img
          src={uxDesignerStroke}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute max-w-none"
          style={{ left: "-1.154%", top: 0, width: "102.31%", height: "112.2%" }}
        />
        {["31.32%", "61.05%"].map((left) => (
          <img
            key={left}
            src={nameEye}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute max-w-none"
            style={{ left, top: "6.86%", width: "4.04%", height: "21.34%" }}
          />
        ))}
      </div>
    </div>
  );
}
