import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { ProductsContext, UserContext } from "@Contexts/index";
import { toast } from "react-toastify";

type TrashIconProps = {
  size?: number;
  className?: string;
  productId: string;
};

export default function TrashIcon({
  size = 18,
  className,
  productId,
}: TrashIconProps) {
  const { userWishlist, setUserWishlist } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  return (
    <button
      type="button"
      aria-label="Remove item"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setUserWishlist(userWishlist.filter((id: string) => id !== productId));
        toast.success(
          `${products.find((product) => String(product.id) === productId)?.title} Removed From Your Wishlist Successfully!!`,
        );
      }}
      className={`group flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 active:scale-95 dark:bg-neutral-900 dark:hover:bg-red-500 ${className}`}
    >
      <FontAwesomeIcon
        icon={faTrashCan}
        style={{ fontSize: size }}
        className="transition-colors duration-300 group-hover:text-red-600"
      />
    </button>
  );
}
