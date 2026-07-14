import LanguageSelect from "./LanguageSelect";

export default function TopHeader() {
  return (
    <span className="flex w-full items-center justify-center gap-2 bg-black py-3 font-poppins text-[14px] font-normal leading-[21px] text-white">
      <span className="h-[21px]">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
      </span>
      <a
        href="#"
        className="self-center font-semibold leading-[21px] underline"
      >
        Shop Now
      </a>
      <LanguageSelect />
    </span>
  );
}
