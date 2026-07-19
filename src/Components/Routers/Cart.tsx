import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AmountCounter, Breadcrumb, Button } from "@Elements/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { toast } from "react-toastify";

interface CartProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const initialCart: CartProduct[] = [
  {
    id: 1,
    title: "LCD Monitor",
    image: "https://dummyjson.com/image/300x300/e8e8e8/000?text=Monitor",
    price: 650,
    quantity: 1,
  },
  {
    id: 2,
    title: "H1 Gamepad",
    image: "https://dummyjson.com/image/300x300/e8e8e8/000?text=Gamepad",
    price: 550,
    quantity: 2,
  },
];

export default function Cart() {
  const transition = useRouteTransition();
  const { user } = useAuth();
  const promoInputRef = useRef<HTMLInputElement>(null);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [cart, setCart] = useState<CartProduct[]>(initialCart);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 0;

  const total = (subtotal + shipping) * (1 - discount);

  const removeItem = (id: number) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (
    id: number,
    updater: number | ((prev: number) => number),
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const newQuantity =
          typeof updater === "function" ? updater(item.quantity) : updater;

        return {
          ...item,
          quantity: Math.max(1, newQuantity),
        };
      }),
    );
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

  if (cart.length === 0) {
    return (
      <>
        <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Cart" />

        <div className="my-[140px] mt-24 flex flex-col items-center gap-6">
          <div className="text-7xl">🛒</div>

          <h2 className="text-3xl font-semibold">Your cart is empty</h2>

          <p className="max-w-md text-center text-neutral-500">
            Looks like you haven't added anything to your shopping cart yet.
          </p>

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
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Cart" />
      <section className="mx-auto mb-[140px] mt-5 px-4">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-6">
            <thead>
              <tr className="rounded bg-white shadow">
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
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <td className="rounded-l px-6 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-red-500 text-white transition hover:scale-110"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 object-contain"
                      />

                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">${item.price}</td>

                  <td className="px-6 py-5">
                    <AmountCounter
                      minAmount={1}
                      maxAmount={100}
                      counter={item.quantity}
                      setCounter={(updater) => updateQuantity(item.id, updater)}
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

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => {
              transition.start();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <button className="bg-transparent border-2 border-black/30 px-8 py-4 rounded-md font-semibold hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] active:scale-95 transition duration-300">Return To Shop</button>
          </Link>

          <button className="bg-transparent border-2 border-black/30 px-8 py-4 rounded-md font-semibold hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] active:scale-95 transition duration-300">Clear Cart</button>
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Coupon */}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Coupon Code"
                ref={promoInputRef}
                className="h-14 flex-1 rounded-md border border-neutral-300 px-5 outline-none transition focus:border-black"
              />

              <Button onClick={updateDiscount} className="h-14 min-w-[180px]">
                Apply Coupon
              </Button>
            </div>
            {discount === 0 ? (
              <p>
                You Can Use{" "}
                <button
                  onClick={() => {
                    if (promoInputRef.current) {
                      promoInputRef.current.value =
                        user?.name.toUpperCase().split(" ").at(0) || "";
                    }
                  }}
                  className="cursor-pointer rounded-full bg-green-200 px-6 py-1 text-sm backdrop-blur-md transition duration-300 active:scale-95"
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
                  className="cursor-pointer rounded-full bg-green-200 px-6 py-1 text-sm backdrop-blur-md transition duration-300 active:scale-95"
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
                  className="cursor-pointer rounded-full bg-green-200 px-6 py-1 text-sm backdrop-blur-md transition duration-300 active:scale-95"
                >
                  FIFA26
                </button>{" "}
                For Discount
              </p>
            ) : (
              <p>
                You Are Now Enjoy With {discount * 100}% Sale Off{" "}
                <button 
                  onClick={() => {
                    setDiscount(0);
                  }}
                  className="cursor-pointer font-bold text-red-600 underline-offset-2 transition-all hover:text-red-700 hover:underline active:scale-95"
                >
                  [REMOVE]
                </button>
              </p>
            )}
          </div>

          {/* Cart Total */}

          <div className="w-full max-w-md justify-self-end rounded-lg border-2 border-black p-8">
            <h2 className="text-2xl font-semibold">Cart Total</h2>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>

                <span className="font-medium">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              <hr />

              <div className="flex items-center justify-between">
                <span>Shipping</span>

                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>

              <hr />

              {discount !== 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <span>Discount:</span>

                    <span className="font-medium">{discount * 100}%</span>
                  </div>

                  <hr />
                </>
              ) : null}

              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>

                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <Button className="mt-8 h-14 w-full">Proceed To Checkout</Button>
          </div>
        </div>
      </section>
    </>
  );
}
