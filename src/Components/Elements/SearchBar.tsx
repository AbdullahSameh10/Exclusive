import Searchicon from "@Assets/SearchIcon.svg";
import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";

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
    <div className="relative">
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
        className="h-9 w-60 rounded-md border-none bg-[#F4F4F5] py-[7px] pl-5 pr-11 font-poppins text-xs leading-[18px] outline-none"
      />

      <button onClick={handleSearch} className="absolute right-3 top-[7px]">
        <img src={Searchicon} alt="Search" />
      </button>
    </div>
  );
}
