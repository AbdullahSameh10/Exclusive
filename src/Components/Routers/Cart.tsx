import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AmountCounter, Breadcrumb, Button } from "@Elements/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { toast } from "react-toastify";
import { ProductsContext, UserContext } from "@Contexts/index";
import type { Product } from "../Types/Data.types";
import styles from "@/styles.module.css";

interface CartProduct extends Product {
  quantity: number;
}
interface ProductsContextState {
  products: Product[];
}
interface UserCartContextState {
  userCart: string[];
  setUserCart: React.Dispatch<React.SetStateAction<string[]>>;
  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
}
export default function Cart() {
  const transition = useRouteTransition();
  const { user } = useAuth();
  const { products } = useContext(ProductsContext) as ProductsContextState;
  const { userCart, setUserCart, discount, setDiscount } = useContext(
    UserContext,
  ) as UserCartContextState;
  const promoInputRef = useRef<HTMLInputElement | null>(null);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (!products.length || !userCart.length) {
      setCartProducts([]);
      return;
    }

    const grouped = new Map<number, CartProduct>();

    userCart.forEach((id) => {
      const product = products.find((item) => item.id === Number(id));

      if (!product) return;

      const existing = grouped.get(product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        grouped.set(product.id, {
          ...product,
          quantity: 1,
        });
      }
    });

    const newCartProducts = Array.from(grouped.values());

    setCartProducts((prev) => {
      const isSame =
        prev.length === newCartProducts.length &&
        prev.every(
          (item, index) =>
            item.id === newCartProducts[index].id &&
            item.quantity === newCartProducts[index].quantity,
        );

      return isSame ? prev : newCartProducts;
    });
  }, [products, userCart]);
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 0;
  const total = (subtotal + shipping) * (1 - discount);
  const removeItem = (id: number) => {
    setUserCart((prev) => prev.filter((item) => item !== String(id)));
  };
  const updateQuantity = (id: number, quantity: number) => {
    setUserCart((prev) => {
      const idString = String(id);

      const currentCount = prev.filter((item) => item === idString).length;

      if (quantity === currentCount) return prev;

      if (quantity > currentCount) {
        return [...prev, ...Array(quantity - currentCount).fill(idString)];
      }

      let removed = 0;

      return prev.filter((item) => {
        if (item !== idString) return true;

        if (removed < currentCount - quantity) {
          removed += 1;
          return false;
        }

        return true;
      });
    });
  };
  const clearCart = () => {
    setUserCart([]);
    toast.success("Cart Cleared Successfully!!");
  };
  const updateDiscount = () => {
    if (!promoInputRef.current?.value) {
      toast.error("Please Write The Promocode First!");
      return;
    }
    if (
      promoInputRef.current.value.toUpperCase() !==
        user?.name.toUpperCase().split(" ").at(0) &&
      promoInputRef.current.value.toUpperCase() !== "SAVE10" &&
      promoInputRef.current.value.toUpperCase() !== "FIFA26"
    ) {
      toast.error("Promocode Is Invalid Or Expired, Please Try Another One!");
      return;
    }
    switch (promoInputRef.current.value.toUpperCase()) {
      case user?.name.toUpperCase().split(" ").at(0):
        setDiscount(0.5);
        break;
      case "SAVE10":
        setDiscount(0.1);
        break;
      case "FIFA26":
        setDiscount(0.25);
        break;
      default:
        toast.success("Promocode Applied Successfully!!");
    }
    promoInputRef.current.value = "";
  };
  if (userCart.length === 0) {
    return (
      <>
        {" "}
        <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Cart" />{" "}
        <div className="my-[140px] mt-24 flex flex-col items-center gap-6">
          {" "}
          <div className="text-7xl">🛒</div>{" "}
          <h2 className="text-3xl font-semibold">Your cart is empty</h2>{" "}
          <p className="max-w-md text-center text-neutral-500">
            {" "}
            Looks like you haven't added anything to your shopping cart
            yet.{" "}
          </p>{" "}
          <Link
            to="/products"
            onClick={() => {
              transition.start();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {" "}
            <Button>Continue Shopping</Button>{" "}
          </Link>{" "}
        </div>{" "}
      </>
    );
  }

  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Cart" />

      <section className="mx-auto mb-[140px] mt-5 px-4 sm:px-6 lg:px-8">
        <div className={`${styles.hiddenScrollbar} overflow-x-auto rounded-lg`}>
          <table className="w-full min-w-[750px] border-separate border-spacing-y-6">
            <thead>
              <tr className="rounded bg-white shadow dark:bg-neutral-900 dark:text-white">
                <th className="rounded-l px-6 py-6 text-left font-medium">
                  Product
                </th>

                <th className="px-6 py-6 text-left font-medium">Price</th>

                <th className="px-6 py-6 text-left font-medium">Quantity</th>

                <th className="rounded-r px-6 py-6 text-right font-medium">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {cartProducts.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white text-black shadow transition hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900 dark:text-white"
                >
                  <td className="rounded-l px-6 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-500 text-white transition hover:scale-110 hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>

                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-20 w-20 shrink-0 object-contain"
                      />

                      <span className="max-w-[250px] truncate font-medium">
                        {item.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">${item.price}</td>

                  <td className="px-6 py-5">
                    <AmountCounter
                      minAmount={item.minimumOrderQuantity}
                      maxAmount={item.stock}
                      counter={
                        item.minimumOrderQuantity +
                        Math.abs(item.quantity - item.minimumOrderQuantity)
                      }
                      setCounter={(value) =>
                        updateQuantity(
                          item.id,
                          typeof value === "function"
                            ? value(item.quantity)
                            : value,
                        )
                      }
                    />
                  </td>

                  <td className="rounded-r px-6 py-5 text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            to="/products"
            onClick={() => {
              transition.start();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <button className="w-full rounded-md border-2 border-black/30 bg-transparent px-8 py-4 font-semibold transition duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white active:scale-95 dark:border-white/30 dark:text-white dark:hover:border-[#DB4444]">
              Return To Shop
            </button>
          </Link>

          <button
            onClick={clearCart}
            className="w-full rounded-md border-2 border-black/30 bg-transparent px-8 py-4 font-semibold transition duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white active:scale-95 dark:border-white/30 dark:text-white dark:hover:border-[#DB4444] sm:w-auto"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Coupon Code"
                ref={promoInputRef}
                className="h-14 rounded-md border border-neutral-300 bg-white px-5 text-black outline-none transition focus:border-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-white"
              />

              <Button onClick={updateDiscount} className="h-14 min-w-[180px]">
                Apply Coupon
              </Button>
            </div>

            {discount === 0 ? (
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                You Can Use{" "}
                <button
                  onClick={() => {
                    if (promoInputRef.current) {
                      promoInputRef.current.value =
                        user?.name.toUpperCase().split(" ").at(0) || "";
                    }
                  }}
                  className="cursor-pointer rounded-full bg-green-200 px-3 py-1 text-xs text-black backdrop-blur-md transition duration-300 active:scale-95 dark:bg-green-800 dark:text-white sm:px-6 sm:text-sm"
                >
                  {user?.name.toUpperCase().split(" ").at(0)}
                </button>
                {" , "}
                <button
                  onClick={() => {
                    if (promoInputRef.current) {
                      promoInputRef.current.value = "SAVE10";
                    }
                  }}
                  className="cursor-pointer rounded-full bg-green-200 px-3 py-1 text-xs text-black backdrop-blur-md transition duration-300 active:scale-95 dark:bg-green-800 dark:text-white sm:px-6 sm:text-sm"
                >
                  SAVE10
                </button>
                {" , "}
                <button
                  onClick={() => {
                    if (promoInputRef.current) {
                      promoInputRef.current.value = "FIFA26";
                    }
                  }}
                  className="cursor-pointer rounded-full bg-green-200 px-3 py-1 text-xs text-black backdrop-blur-md transition duration-300 active:scale-95 dark:bg-green-800 dark:text-white sm:px-6 sm:text-sm"
                >
                  FIFA26
                </button>{" "}
                For Discount
              </p>
            ) : (
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                You Are Now Enjoy With {discount * 100}% Sale Off{" "}
                <button
                  onClick={() => setDiscount(0)}
                  className="cursor-pointer font-bold text-red-600 underline-offset-2 transition-all hover:text-red-700 hover:underline active:scale-95"
                >
                  [REMOVE]
                </button>
              </p>
            )}
          </div>
          <div className="w-full max-w-md justify-self-end rounded-lg border-2 border-black bg-white p-8 dark:border-white dark:bg-neutral-900 dark:text-white">
            <h2 className="text-2xl font-semibold">Cart Total</h2>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-neutral-700 dark:text-neutral-300">
                  Subtotal
                </span>

                <span className="font-medium">
                  ${Number(subtotal.toFixed(0)).toLocaleString()}
                </span>
              </div>

              <hr className="border-neutral-200 dark:border-neutral-700" />

              <div className="flex items-center justify-between">
                <span className="text-neutral-700 dark:text-neutral-300">
                  Shipping
                </span>

                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>

              <hr className="border-neutral-200 dark:border-neutral-700" />

              {discount !== 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700 dark:text-neutral-300">
                      Discount ({discount * 100}%)
                    </span>

                    <span className="font-medium text-green-600 dark:text-green-400">
                      -${Number((subtotal - subtotal * discount).toFixed(0)).toLocaleString()}
                    </span>
                  </div>

                  <hr className="border-neutral-200 dark:border-neutral-700" />
                </>
              )}

              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>

                <span>${Number(total.toFixed(0)).toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={() => {
                transition.start();

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <Button className="mt-8 h-14 w-full">Proceed To Checkout</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
