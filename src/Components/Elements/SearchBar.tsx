import { SearchIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSearch = () => {
    const query = value.trim();

    navigate(
      query ? `/products?search=${encodeURIComponent(query)}` : "/products",
    );
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="h-10 w-full rounded-lg border border-transparent bg-[#F5F5F5] py-2 pl-4 pr-11 font-poppins text-sm text-black outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-[#DB4444]/30 focus:border-[#DB4444] focus:bg-white focus:ring-2 focus:ring-[#DB4444]/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 dark:hover:border-[#DB4444]/50 dark:focus:border-[#DB4444] dark:focus:bg-neutral-900 dark:focus:ring-[#DB4444]/20"
      />

      <button
        type="button"
        onClick={handleSearch}
        aria-label="Search"
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 transition-all duration-300 hover:bg-[#DB4444]/10 active:scale-90 dark:hover:bg-[#DB4444]/20"
      >
        <SearchIcon
          size={18}
          className="text-neutral-600 transition-colors duration-300 dark:text-neutral-300"
        />
      </button>
    </div>
  );
}
