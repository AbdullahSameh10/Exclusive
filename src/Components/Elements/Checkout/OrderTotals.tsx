import { UserContext } from "@/Components/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

interface OrderTotalsProps {
  subtotal: number;
  shipping: number;
  discountAmount: number;
  total: number;
}

export default function OrderTotals(props: OrderTotalsProps) {
  const { subtotal, shipping, discountAmount, total } = props;
  const { discount } = useContext(UserContext);

  const formatPrice = (price: number) =>
    `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-[0px_1px_13px_0px] shadow-emerald-300/30 transition-colors duration-300 dark:bg-neutral-900">
      {/* Header */}

      <div className="border-b border-emerald-300/30 px-6 py-5 dark:border-emerald-500/20">
        <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-white">
          <FontAwesomeIcon
            icon={faReceipt}
            className="text-emerald-600 dark:text-emerald-400"
          />
          Order Total
        </h2>

        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Review your payment before placing the order.
        </p>
      </div>

      {/* Totals */}

      <div className="space-y-5 px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500 dark:text-neutral-400">
            Subtotal
          </span>

          <span className="font-semibold text-neutral-900 dark:text-white">
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-emerald-600 dark:text-emerald-400">
              Discount ({discount * 100}%)
            </span>

            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              −{formatPrice(discountAmount)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-neutral-500 dark:text-neutral-400">
            Shipping
          </span>

          {shipping === 0 ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
              Free
            </span>
          ) : (
            <span className="font-semibold text-neutral-900 dark:text-white">
              {formatPrice(shipping)}
            </span>
          )}
        </div>

        <div className="border-t border-dashed border-emerald-300 pt-5 dark:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              Total
            </span>

            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
