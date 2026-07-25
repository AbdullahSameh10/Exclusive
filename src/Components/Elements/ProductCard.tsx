import styled from "styled-components";
import { EyeIcon, TrashIcon, WishlistIcon } from "@Assets/Assets Elements";
import { Link } from "react-router";
import { useRouteTransition } from "@Hooks/index";
import StarRating from "./StarRating";
import { useContext } from "react";
import { ProductsContext, UserContext } from "../Contexts";
import { toast } from "react-toastify";

export type ProductCardPropsTypes = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  sale?: number;
  stock: number;
  minAmount: number;
  newProduct?: boolean;
  reviewsNo: number;
  isTrash?: boolean;
  trashPage?: boolean;
};

const StyledDiv = styled.div`
  display: flex;
  height: 34px;
  width: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
`;

function FloatCard({ sale, isNew }: { sale: number; isNew: boolean }) {
  return sale ? (
    <div className="absolute left-3 top-3 flex h-6 w-14 items-center justify-center rounded bg-[#DB4444] text-xs font-semibold text-white">
      -{sale}%
    </div>
  ) : isNew ? (
    <div className="absolute left-3 top-3 flex h-6 w-14 items-center justify-center rounded bg-[#00FF66] text-xs font-semibold text-white">
      NEW
    </div>
  ) : null;
}

export default function ProductCard(props: ProductCardPropsTypes) {
  const transition = useRouteTransition();

  const { setUserCart, userCart } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  const {
    id,
    title,
    price,
    rating,
    thumbnail,
    sale = 0,
    stock,
    minAmount,
    newProduct = false,
    reviewsNo,
    isTrash,
    trashPage,
  } = props;

  return (
    <Link
      to={`/product/${id}/${title}`}
      data-id={id}
      onClick={() => {
        transition.start();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="group/card flex w-[220px] shrink-0 flex-col gap-4 rounded font-poppins sm:w-[240px] lg:w-[270px]"
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden rounded-lg">
        <div className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-[#F5F5F5] sm:h-[220px] lg:h-[250px]">
          <img
            src={thumbnail}
            alt="product image"
            className="max-h-[80%] max-w-[80%] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover/card:scale-110"
          />
        </div>

        <FloatCard sale={sale} isNew={newProduct} />

        {/* ACTIONS */}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <StyledDiv className="active:scale-90">
            {!trashPage && <WishlistIcon size={22} productId={String(id)} />}

            {isTrash && <TrashIcon productId={String(id)} />}
          </StyledDiv>

          {!trashPage && (
            <StyledDiv className="active:scale-90">
              <EyeIcon />
            </StyledDiv>
          )}
        </div>

        {/* ADD TO CART */}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const updatedCart = [...userCart, String(id)];

            if (
              userCart.filter((p) => p === String(id)).length >=
              stock - minAmount
            ) {
              toast.error(
                `${
                  products.find((p) => String(p.id) === String(id))?.title
                } Is Out Of Stock Now!!`,
              );

              return;
            }

            toast.success(
              `${
                products.find((p) => String(p.id) === String(id))?.title
              } Added To Your Cart Successfully!!`,
            );

            setUserCart(updatedCart);
          }}
          className="pointer-events-none absolute bottom-0 left-0 z-30 flex h-10 w-full translate-y-full items-center justify-center bg-black text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:opacity-100"
        >
          Add To Cart
        </button>
      </div>

      {/* INFO */}

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium transition-colors text-black dark:text-white/90 duration-300 group-hover/card:text-[#DB4444] sm:text-base">
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </span>

        <div className="flex flex-wrap gap-2">
          <span className="font-medium text-[#DB4444]">
            ${(price * ((100 - sale) / 100)).toFixed(2)}
          </span>

          {sale > 0 && (
            <del className="text-black dark:text-white opacity-50">${price.toFixed(2)}</del>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StarRating rating={rating} />

          <span className="text-sm font-semibold text-black opacity-50">
            ({reviewsNo})
          </span>
        </div>
      </div>
    </Link>
  );
}
