import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import styles from "@/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  products: Product[];
}

export default function OrderSummary({ products }: OrderSummaryProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-[0px_1px_13px_0px] shadow-emerald-300/30 transition-colors duration-300 dark:bg-neutral-900">
      {/* Header */}

      <div className="border-b border-emerald-300/30 px-4 py-5 dark:border-emerald-400/20 sm:px-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-white">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-emerald-600 dark:text-emerald-400"
          />
          Order Summary
        </h2>

        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {products.length} {products.length === 1 ? "Product" : "Products"}
        </p>
      </div>

      {/* Products */}

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-4 py-12 text-center sm:px-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-neutral-100 text-3xl dark:bg-neutral-800">
            🛒
          </div>

          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Your cart is empty
          </h3>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/"
            className="mt-2 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 dark:hover:bg-emerald-400"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div
          className={` ${styles.transparentScrollbar} ${styles.greenScrollbar} max-h-[225px] divide-y divide-emerald-300/30 overflow-y-auto dark:divide-emerald-400/20`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 px-4 py-4 sm:px-6"
            >
              {/* Image */}

              <div className="relative h-20 w-20 shrink-0 rounded-md border border-neutral-200 dark:border-neutral-700">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="absolute right-1/2 top-1/2 size-16 -translate-y-1/2 translate-x-1/2 overflow-hidden drop-shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_10px_15px_rgba(255,255,255,0.5)]"
                />

                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white shadow">
                  {product.quantity}
                </span>
              </div>

              {/* Product */}

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  {product.title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  ${product.price.toFixed(2)} x {product.quantity}
                </p>
              </div>

              {/* Total */}

              <div className="text-right">
                <p className="text-base font-bold text-neutral-900 dark:text-white">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
