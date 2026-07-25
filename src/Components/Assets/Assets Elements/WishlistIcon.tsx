import { ProductsContext, UserContext } from "@Contexts/index";
import { useContext, type Dispatch, type SetStateAction } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

type WishlistIconPropsTypes = {
  productId: string;
  navigating?: boolean;
  size?: number;
};

export default function WishlistIcon({
  productId,
  navigating = false,
  size = 32,
}: WishlistIconPropsTypes) {
  const location = useLocation();

  const { userWishlist, setUserWishlist } = useContext(UserContext) as {
    userWishlist: string[];
    setUserWishlist: Dispatch<SetStateAction<string[]>>;
  };

  const { products } = useContext(ProductsContext);

  const isWishlistPage = location.pathname === "/wishlist";

  // Header icon does not represent a product
  const isFavourite =
    productId !== "Header" && userWishlist.includes(productId);

  const product = products.find((item) => String(item.id) === productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!navigating) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Header icon is only decorative/navigation indicator
    if (productId === "Header") return;

    const alreadyFavourite = userWishlist.includes(productId);

    setUserWishlist((prev) =>
      alreadyFavourite
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );

    toast.success(
      `${product?.title ?? "Product"} ${
        alreadyFavourite ? "Removed From" : "Added To"
      } Your Wishlist Successfully!!`,
    );
  };

  return (
    <button
      type="button"
      aria-label={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
      onClick={handleClick}
      className="flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-90"
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
          className={`stroke-[1.5] transition-all duration-300 ${
            (isWishlistPage && navigating) || isFavourite
              ? `fill-[#DB4444] stroke-[#DB4444] hover:fill-transparent hover:stroke-black dark:hover:stroke-white`
              : `fill-transparent stroke-black hover:fill-[#DB4444] hover:stroke-[#DB4444] dark:stroke-white/90`
          } `}
        />
      </svg>
    </button>
  );
}
