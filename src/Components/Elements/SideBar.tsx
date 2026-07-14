export default function SideBar() {
  return (
    <div className="h-[384px] w-[233px] border-r-[0.5px] border-black border-opacity-30 pr-4 pt-10 dark:border-gray-500 dark:border-opacity-30">
      <ul className="flex flex-col gap-4 font-poppins text-base font-normal leading-6 text-[#000000] dark:text-[#e2e2e2]">
        <li className="group flex cursor-pointer justify-between transition-colors duration-300 hover:text-[#DB4444]">
          <span>Woman’s Fashion</span>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.95 6.364L0 1.414L1.414 0L7.778 6.364L1.414 12.728L0 11.314L4.95 6.364Z"
              className="fill-black dark:fill-white group-hover:fill-[#DB4444] transition-colors duration-300"
            />
          </svg>
        </li>
        <li className="group flex cursor-pointer justify-between transition-colors duration-300 hover:text-[#DB4444]">
          <span>Men's Fashion</span>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.95 6.364L0 1.414L1.414 0L7.778 6.364L1.414 12.728L0 11.314L4.95 6.364Z"
              className="fill-black dark:fill-white group-hover:fill-[#DB4444] transition-colors duration-300"
            />
          </svg>
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Electronics
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Home & Lifestyle
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Medicine
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Sports & Outdoor
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Baby’s & Toys
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Groceries & Pets
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-[#DB4444]">
          Health & Beauty
        </li>
      </ul>
    </div>
  );
}
