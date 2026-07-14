import { useState } from "react";
import { useLocation } from "react-router";

type WishlistIconPropsTypes = {
  navigating?: boolean;
  size?: number;
};

export default function WishlistIcon({
  navigating = false,
  size = 32,
}: WishlistIconPropsTypes) {
  const location = useLocation();
  const isWishlistPage = location.pathname === "/wishlist";
  const [favourite, setFavourite] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        if (!navigating) {
          e.preventDefault();
          e.stopPropagation();
          setFavourite((prev) => !prev);
        }
      }}
      className="cursor-pointer"
    >
      <svg
        viewBox="0 0 32 32"
        className="group"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
          className={`stroke-[1.5] transition-all duration-300 ${
            isWishlistPage || favourite
              ? "fill-red-500 stroke-red-500"
              : "fill-transparent stroke-black group-hover:fill-red-500 group-hover:stroke-red-500"
          }`}
        />
      </svg>
    </button>
  );
}
