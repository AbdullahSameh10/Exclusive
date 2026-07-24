import { ShoppingBag, Calendar, CreditCard, User, X } from "lucide-react";
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
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  return createPortal(
    <div
      onClick={onClose}
      className={`${styles["receipt-overlay"]} fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md print:bg-white`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.transparentScrollbar} ${styles.redScrollbar} ${styles.receipt} max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-gradient-to-b from-white to-neutral-50 shadow-[0_25px_80px_rgba(0,0,0,.35)] print:max-h-none print:overflow-visible print:rounded-none print:shadow-none`}
      >
        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between border-b border-neutral-200 bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
              <ShoppingBag size={34} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-wide">Exclusive</h1>

              <p className="text-sm text-red-100">Order Receipt</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-3 transition hover:bg-white/20"
          >
            <X size={24} />
          </button>
        </div>

        {/* ================= BODY ================= */}

        <div className="space-y-8 p-8">
          {/* Top Information */}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Receipt Info */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold">Receipt Information</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Receipt Number</span>

                  <span className="font-semibold">{order.orderNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Date</span>

                  <span className="flex items-center gap-2 font-semibold">
                    <Calendar size={16} className="text-red-500" />

                    {order.createdAt.toDate().toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Status</span>

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyle()}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-3">
                  <User className="text-red-500" size={22} />
                </div>

                <h2 className="text-xl font-bold">Customer</h2>
              </div>

              <div className="space-y-3">
                <p className="text-lg font-semibold">
                  {order.billingInfo.firstName} {order.billingInfo.lastName}
                </p>

                <p className="text-neutral-600">{order.billingInfo.email}</p>

                <p className="text-neutral-600">{order.billingInfo.phone}</p>
              </div>
            </div>
          </div>
          {/* ================= Products ================= */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3">
                <ShoppingBag className="text-red-500" size={22} />
              </div>

              <h2 className="text-xl font-bold">Ordered Products</h2>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4 transition hover:border-red-200 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-24 w-24 rounded-xl border object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>

                    <div className="mt-2 flex flex-wrap gap-5 text-sm text-neutral-500">
                      <span>
                        Quantity:
                        <span className="ml-2 font-semibold text-neutral-800">
                          {item.quantity}
                        </span>
                      </span>

                      <span>
                        Unit Price:
                        <span className="ml-2 font-semibold text-neutral-800">
                          ${item.price.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-red-50 px-5 py-3 text-center">
                    <p className="text-xs uppercase tracking-wider text-neutral-500">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= Shipping & Payment ================= */}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Shipping */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold">Shipping Address</h2>

              <div className="space-y-3 text-neutral-700">
                <p className="text-lg">
                  client:{" "}
                  <span className="font-semibold">
                    {order.billingInfo.firstName} {order.billingInfo.lastName}
                  </span>
                </p>

                <p>address: {order.billingInfo.streetAddress}</p>

                {order.billingInfo.apartment && (
                  <p>apartment: {order.billingInfo.apartment}</p>
                )}

                <p>
                  location: {order.billingInfo.city},{" "}
                  {order.billingInfo.country}
                </p>

                <p>phone no: {order.billingInfo.phone}</p>

                <p>email: {order.billingInfo.email}</p>
              </div>
            </section>

            {/* Payment */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-3">
                  <CreditCard className="text-red-500" size={22} />
                </div>

                <h2 className="text-xl font-bold">Payment Details</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment Method</span>

                  <span className="font-semibold">{order.paymentMethod}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment Status</span>

                  <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                    Pending
                  </span>
                </div>
              </div>
            </section>
          </div>
          {/* ================= Order Summary ================= */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Subtotal</span>

                <span className="font-semibold">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Discount</span>

                <span className="font-semibold text-green-600">
                  -{(order.discount * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Shipping</span>

                <span className="font-semibold">
                  {order.shipping === 0
                    ? "FREE"
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="my-3 border-t border-dashed border-neutral-300" />

              <div className="flex items-center justify-between rounded-xl bg-red-500 px-6 py-5 text-white">
                <div>
                  <p className="text-sm opacity-80">Grand Total</p>

                  <h3 className="text-3xl font-black">
                    ${order.total.toFixed(2)}
                  </h3>
                </div>

                <ShoppingBag size={34} />
              </div>
            </div>
          </section>

          {/* ================= Footer ================= */}

          <section className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 p-8 text-center text-white">
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
          </section>
        </div>

        {/* ================= Bottom Buttons ================= */}

        <div className="flex flex-col-reverse gap-4 border-t bg-neutral-50 p-6 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-300 px-8 py-3 font-semibold transition hover:bg-neutral-100"
          >
            Close
          </button>

          <button
            className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white transition hover:bg-red-600"
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>
      </div>
      ;
    </div>,
    document.body,
  );
}


