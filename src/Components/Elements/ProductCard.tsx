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
    <div className="absolute left-3 top-3 flex h-[26px] w-[55px] items-center justify-center rounded-[4px] bg-[#DB4444] text-xs font-semibold leading-[18px] text-white">
      -{sale}%
    </div>
  ) : isNew ? (
    <div className="absolute left-3 top-3 flex h-[26px] w-[55px] items-center justify-center rounded-[4px] bg-[#00FF66] text-xs font-semibold leading-[18px] text-white">
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
      onClick={() => {
        transition.start();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group/card flex w-fit cursor-pointer flex-col gap-4 rounded-[4px] font-poppins"
      data-id={id}
    >
      <div className="relative overflow-hidden">
        <div className="flex h-[250px] w-[270px] items-center justify-center overflow-hidden rounded-lg bg-[#F5F5F5]">
          <img
            src={thumbnail}
            alt="product image"
            className="scale-75 drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover/card:scale-[0.85]"
          />
        </div>
        <FloatCard sale={sale} isNew={newProduct} />
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <StyledDiv className="active:scale-90">
            {!trashPage ? (
              <WishlistIcon size={24} productId={String(id)} />
            ) : null}
            {isTrash ? <TrashIcon productId={String(id)} /> : null}
          </StyledDiv>
          {!trashPage ? (
            <StyledDiv className="active:scale-90">
              <EyeIcon />
            </StyledDiv>
          ) : null}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const updatedCart = [...userCart, String(id)];

            if (
              [...userCart.filter((product) => product === String(id))]
                .length >=
              stock - minAmount
            ) {
              toast.error(
                `${products.find((product) => String(product.id) === String(id))?.title} Is Out Of Stock Now!!`,
              );
              return;
            } else {
              toast.success(
                `${products.find((product) => String(product.id) === String(id))?.title} Added To Your Cart Successfully!!`,
              );
            }
            setUserCart(updatedCart);
          }}
          className="pointer-events-none absolute bottom-0 z-30 h-10 w-[270px] translate-y-[110%] items-center justify-center rounded-bl rounded-br bg-black text-base font-medium text-white opacity-0 transition-all duration-300 group-hover/card:pointer-events-auto group-hover/card:flex group-hover/card:translate-y-0 group-hover/card:opacity-100"
        >
          Add To Cart
        </button>
      </div>
      <div className="flex flex-col gap-2 text-base font-medium">
        <span className="transition-colors duration-300 group-hover/card:text-[#Db4444]">
          {title && title.length > 30 ? title.slice(0, 30) + "..." : title}
        </span>
        <div className="flex gap-3">
          <span className="text-[#DB4444]">
            ${(price * ((100 - sale) / 100)).toFixed(2)}
          </span>
          {sale ? (
            <del className="text-black opacity-50">
              ${price && price.toFixed(2)}
            </del>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={rating && rating} />
          <span className="font-semibold text-black opacity-50">
            ({reviewsNo})
          </span>
        </div>
      </div>
    </Link>
  );
}
