import {
  ShoppingBag,
  Calendar,
  CreditCard,
  User,
  X,
  MapPin,
  PackageCheck,
  Printer,
} from "lucide-react";
import { createPortal } from "react-dom";
import type { Order } from "@Types/Order.types";
import styles from "@/styles.module.css";

interface ReceiptModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export default function ReceiptModal({
  order,
  open,
  onClose,
}: ReceiptModalProps) {
  if (!open || !order) return null;

  const getStatusStyle = () => {
    switch (order.status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";

      case "Processing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

      case "Shipped":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";

      case "Delivered":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      default:
        return "";
    }
  };

  const cardStyle =
    "rounded-3xl border border-zinc-200/70 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950";

  return createPortal(
    <div
      onClick={onClose}
      className={`${styles["receipt-overlay"]} fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-xl print:bg-white`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.receipt} ${styles.transparentScrollbar} ${styles.redScrollbar} relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.35)] dark:bg-zinc-950 print:max-h-none print:overflow-visible print:rounded-none print:shadow-none`}
      >
        {/* Watermark */}

        <div className="pointer-events-none absolute right-10 top-32 rotate-12 select-none text-7xl font-black text-zinc-200/30 dark:text-white/5">
          RECEIPT
        </div>

        {/* ================= HEADER ================= */}

        <div className="relative flex flex-col gap-6 overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-red-700 px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-md">
              <ShoppingBag size={34} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-wide">Exclusive</h1>

              <p className="text-sm text-red-100">Official Order Receipt</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="self-end rounded-xl p-3 transition hover:bg-white/20 sm:self-auto"
          >
            <X size={26} />
          </button>
        </div>

        {/* ================= BODY ================= */}

        <div className="space-y-8 p-6 sm:p-10">
          {/* ================= TOP INFORMATION ================= */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Receipt Information */}

            <section className={cardStyle}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                  <PackageCheck size={22} className="text-red-500" />
                </div>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Receipt Information
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Receipt Number
                  </span>

                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {order.orderNumber}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <span className="text-zinc-500 dark:text-zinc-400">Date</span>

                  <span className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                    <Calendar size={16} className="text-red-500" />

                    {order.createdAt.toDate().toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Status
                  </span>

                  <span
                    className={`w-fit rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyle()} `}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </section>

            {/* Customer Information */}

            <section className={cardStyle}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                  <User className="text-red-500" size={22} />
                </div>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Customer
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {order.billingInfo.firstName} {order.billingInfo.lastName}
                </p>

                <p className="text-zinc-600 dark:text-zinc-400">
                  {order.billingInfo.email}
                </p>

                <p className="text-zinc-600 dark:text-zinc-400">
                  {order.billingInfo.phone}
                </p>
              </div>
            </section>
          </div>
          {/* ================= PRODUCTS ================= */}
          <section className={cardStyle}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                <ShoppingBag size={22} className="text-red-500" />
              </div>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Ordered Products
              </h2>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-950 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-28 w-28 rounded-2xl border border-zinc-200 object-cover shadow-md transition-transform duration-300 hover:scale-105 dark:border-zinc-700"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-5 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>
                        Quantity:
                        <strong className="ml-2 text-zinc-900 dark:text-white">
                          {item.quantity}
                        </strong>
                      </span>

                      <span>
                        Unit Price:
                        <strong className="ml-2 text-zinc-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-red-50 px-5 py-3 text-center dark:bg-red-500/10">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-black text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* ================= SHIPPING & PAYMENT ================= */}
          <div className="grid max-w-[336px] gap-6 sm:min-w-full lg:grid-cols-2">
            {/* Shipping */}

            <section
              className={`${cardStyle} max-w-[336px] overflow-hidden sm:min-w-full`}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                  <MapPin size={22} className="text-red-500" />
                </div>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Shipping Address
                </h2>
              </div>

              <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <p className="text-lg">
                  Client:
                  <span className="ml-2 font-semibold text-zinc-900 dark:text-white">
                    {order.billingInfo.firstName} {order.billingInfo.lastName}
                  </span>
                </p>

                <p>
                  Address:
                  <span className="ml-2 font-medium text-zinc-900 dark:text-white">
                    {order.billingInfo.streetAddress}
                  </span>
                </p>

                {order.billingInfo.apartment && (
                  <p>
                    Apartment:
                    <span className="ml-2 font-medium text-zinc-900 dark:text-white">
                      {order.billingInfo.apartment}
                    </span>
                  </p>
                )}

                <p>
                  Location:
                  <span className="ml-2 font-medium text-zinc-900 dark:text-white">
                    {order.billingInfo.city}, {order.billingInfo.country}
                  </span>
                </p>

                <p>
                  Phone:
                  <span className="ml-2 font-medium text-zinc-900 dark:text-white">
                    {order.billingInfo.phone}
                  </span>
                </p>

                <p>
                  Email:
                  <span className="ml-2 font-medium text-zinc-900 dark:text-white">
                    {order.billingInfo.email}
                  </span>
                </p>
              </div>
            </section>

            {/* Payment */}

            <section className={cardStyle}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                  <CreditCard className="text-red-500" size={22} />
                </div>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Payment Details
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Payment Method
                  </span>

                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Payment Status
                  </span>

                  <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                    Pending
                  </span>
                </div>
              </div>
            </section>
          </div>
          // ================= ORDER SUMMARY =================
          <section className={cardStyle}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                <ShoppingBag size={22} className="text-red-500" />
              </div>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Order Summary
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Subtotal
                </span>

                <span className="font-semibold text-zinc-900 dark:text-white">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Discount
                </span>

                <span className="font-semibold text-green-600 dark:text-green-400">
                  -{(order.discount * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Shipping
                </span>

                <span className="font-semibold text-zinc-900 dark:text-white">
                  {order.shipping === 0
                    ? "FREE"
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-dashed border-zinc-300 dark:border-zinc-700" />

              {/* Grand Total */}

              <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-6 py-6 text-white shadow-lg">
                <div>
                  <p className="text-sm text-red-100">Grand Total</p>

                  <h3 className="text-3xl font-black">
                    ${order.total.toFixed(2)}
                  </h3>
                </div>

                <ShoppingBag size={36} />
              </div>
            </div>
          </section>
          {/* ================= FOOTER ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-8 text-center text-white">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold">Thank You For Shopping ❤️</h2>

              <p className="mt-3 text-red-100">
                We appreciate your purchase and hope you enjoy your order.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-red-100">Receipt</p>

                  <p className="mt-1 font-semibold">{order.orderNumber}</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-red-100">Products</p>

                  <p className="mt-1 font-semibold">{order.items.length}</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-red-100">Status</p>

                  <p className="mt-1 font-semibold">{order.status}</p>
                </div>
              </div>

              <p className="mt-8 text-sm text-red-100">
                Need help with your order?
                <br />
                Contact us anytime at
                <span className="ml-1 font-semibold text-white">
                  support@exclusive.com
                </span>
              </p>
            </div>
          </section>
        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col-reverse gap-4 border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-300 px-8 py-3 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Close
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <Printer size={18} />
            Print Receipt
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}