import { getOrders } from "@Utilities/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import type { Order } from "@Types/Order.types";
import {
  CircleCheckBig,
  CircleX,
  Clock3,
  CreditCard,
  DollarSign,
  Package,
  PackageOpen,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Button, ReceiptModal } from "@Elements/index";

export default function Cancellations() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const transition = useRouteTransition();

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;

      try {
        const data = await getOrders(user.uid);

        data.sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime(),
        );

        setOrders(data.filter((order) => order.status === "Cancelled"));
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const getStatus = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return {
          icon: <Clock3 size={18} />,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "Processing":
        return {
          icon: <Package size={18} />,
          className: "bg-blue-100 text-blue-700",
        };

      case "Shipped":
        return {
          icon: <Truck size={18} />,
          className: "bg-purple-100 text-purple-700",
        };

      case "Delivered":
        return {
          icon: <CircleCheckBig size={18} />,
          className: "bg-green-100 text-green-700",
        };

      case "Cancelled":
        return {
          icon: <CircleX size={18} />,
          className: "bg-red-100 text-red-700",
        };
    }
  };

  return (
    <>
      <div className="relative flex h-full flex-col gap-10">
        {/* Loading */}
        {loading ? (
            <div className="absolute inset-0 -bottom-10 -left-5 -right-5 -top-5 z-10 flex items-center justify-center rounded-3xl bg-black/40 sm:-left-8 sm:-right-8 sm:-top-8 lg:-left-10 lg:-right-10 lg:-top-10 xl:-left-12 xl:-right-12 xl:-top-12">
              <span className="h-20 w-20 animate-spin rounded-full border-4 border-white border-y-red-500" />
            </div>
        ) : null}

        {/* Header */}

        <h2 className="text-xl font-semibold text-red-500">My Cancellations</h2>

        {/* Empty */}

        {!loading && orders.length === 0 && (
          <section className="rounded-md p-10 text-center shadow-md">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <PackageOpen className="text-red-500" size={36} />
            </div>

            <h3 className="mt-6 text-xl font-semibold">No Cancellations Yet</h3>

            <p className="mt-2 text-gray-500">
              Looks like you haven't cancelled any orders yet.
            </p>

            <Link
              to="/products"
              onClick={() => {
                transition.start();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Button className="mx-auto mt-8">Return To Shop</Button>
            </Link>
          </section>
        )}
        {/* Orders */}

        {!loading &&
          orders.map((order) => {
            const status = getStatus(order.status);

            return (
              <section
                key={order.id}
                className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-6"
              >
                <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                  {/* Left */}

                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <div className="rounded-2xl bg-red-100 p-3 dark:bg-red-500/20">
                        <Package className="text-red-500" size={22} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                          {order.orderNumber}
                        </h3>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {order.createdAt?.toDate
                            ? order.createdAt
                                .toDate()
                                .toISOString()
                                .split("T")[0]
                                .split("-")
                                .join("/")
                            : "Unknown Date"}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <ShoppingBag size={18} className="text-red-500" />

                        <span className="text-zinc-700 dark:text-zinc-300">
                          {order.items.length} Products
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-red-500" />

                        <span className="text-zinc-700 dark:text-zinc-300">
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSign size={18} className="text-red-500" />

                        <span className="text-zinc-700 dark:text-zinc-300">
                          ${Number(order.total.toFixed(0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="flex flex-col gap-5 xl:items-end">
                    <span
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${status?.className}`}
                    >
                      {status?.icon}

                      {order.status}
                    </span>

                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end xl:w-auto">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setReceiptOpen(true);
                        }}
                        className="w-full rounded-xl border-2 border-zinc-300 bg-white px-8 py-3 font-semibold text-zinc-700 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 sm:w-auto"
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
      </div>
      <ReceiptModal
        order={selectedOrder}
        open={receiptOpen}
        onClose={() => {
          setReceiptOpen(false);
          setSelectedOrder(null);
        }}
      />
    </>
  );
}
