import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Package,
  PackageOpen,
  CreditCard,
  ShoppingBag,
  CircleCheckBig,
  Truck,
  Clock3,
  CircleX,
  DollarSign,
} from "lucide-react";
import { Button, ReceiptModal } from "@Elements/index";
import { useAuth } from "@Hooks/index";
import { getOrders } from "@Utilities/index";
import type { Order } from "@Types/Order.types";
import { toast } from "react-toastify";

export default function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;

      try {
        const data = await getOrders(user.uid);

        data.sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime(),
        );

        setOrders(data);
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
          <div className="absolute inset-0 -bottom-10 -left-20 -right-20 -top-10 z-10 flex items-center justify-center rounded-md bg-black/40">
            <span className="h-20 w-20 animate-spin rounded-full border-4 border-white border-y-red-500" />
          </div>
        ) : null}

        {/* Header */}

        <div>
          <h2 className="text-xl font-semibold text-red-500">My Orders</h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your previous orders.
          </p>
        </div>

        {/* Empty */}

        {!loading && orders.length === 0 && (
          <section className="rounded-md p-10 text-center shadow-md">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <PackageOpen className="text-red-500" size={36} />
            </div>

            <h3 className="mt-6 text-xl font-semibold">No Orders Yet</h3>

            <p className="mt-2 text-gray-500">
              Looks like you haven't placed any orders yet.
            </p>

            <Link to="/products">
              <Button className="mt-8">Start Shopping</Button>
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
                className="rounded-md p-6 shadow-md transition-all duration-300 hover:scale-[102%]"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left */}

                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <div className="rounded-full bg-red-100 p-3">
                        <Package className="text-red-500" size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold">{order.orderNumber}</h3>

                        <p className="text-sm text-gray-500">
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

                        <span>{order.items.length} Products</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-red-500" />

                        <span>{order.paymentMethod}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSign size={18} className="text-red-500" />

                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="flex flex-col items-start gap-5 lg:items-end">
                    <span
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${status?.className}`}
                    >
                      {status?.icon}

                      {order.status}
                    </span>

                    <div className="flex flex-wrap flex-shrink flex-grow max-h-[56px] w-[393px] gap-3">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setReceiptOpen(true);
                        }}
                        className="bg-white px-11 border-2 border-black rounded-md text-black/60 font-bold hover:border-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300"
                      >
                        View Receipt
                      </button>

                      {order.status === "Pending" && (
                        <Button className="bg-red-500 hover:bg-red-600">
                          Cancel Order
                        </Button>
                      )}
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
