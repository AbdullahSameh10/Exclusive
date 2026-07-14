export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        placeholder="What are you looking for?"
        className="h-9 w-60 rounded-md border-none bg-[#F4F4F5] py-[7px] pl-5 pr-11 font-poppins text-xs leading-[18px] outline-none"
      />
      <img
        src="../../../src/Components/Assets/SearchIcon.svg"
        alt="search icon"
        className="absolute right-3 top-[7px]"
      />
    </div>
  );
}
