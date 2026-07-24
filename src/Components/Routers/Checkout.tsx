import { useContext, useEffect, useMemo, useState } from "react";
import { BillingForm, Breadcrumb, Button, OrderSummary, OrderTotals, PaymentMethod, PromoCode } from "@Elements/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { ProductsContext, UserContext } from "@Contexts/index";
import { useNavigate } from "react-router";
import type { BillingDetails, BillingErrors } from "@Types/Checkout.types";
import { loadBillingInfo, saveBillingInformation } from "@Utilities/Checkout/billing";
import { buildOrder, validateBillingDetails } from "@Utilities/index";
import { toast } from "react-toastify";
import {createOrder} from "@Utilities/index";

export default function Checkout() {
  const { userCart, discount, setUserCart, preferredPayment } = useContext(UserContext);
  const { getProductById } = useContext(ProductsContext);
  const transition = useRouteTransition();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<BillingErrors>({});
  const [saveBillingInfo, setSaveBillingInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: user?.name?.split(" ")[0] ?? "",
    lastName: user?.name?.split(" ").slice(1).join(" ") ?? "",
    email: user?.email ?? "",
    phone: user?.phoneNumber ?? "",
    country: "Egypt",
    city: "",
    streetAddress: "",
    apartment: "",
    orderNotes: "",
  });
  
  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    loadBillingInfo(user, setBillingDetails);
  }, [user]);

  useEffect(() => {
    setBillingDetails({
      firstName: user?.name?.split(" ")[0] ?? "",
      lastName: user?.name?.split(" ").slice(1).join(" ") ?? "",
      email: user?.email ?? "",
      phone: user?.phoneNumber ?? "",
      country: "Egypt",
      city: "",
      streetAddress: "",
      apartment: "",
      orderNotes: "",
    });
  }, [user]);

  const cartProducts = useMemo(() => {
    const quantities = new Map<number, number>();

    userCart.forEach((id) => {
      quantities.set(Number(id), (quantities.get(Number(id)) ?? 0) + 1);
    });

    return [...quantities.entries()]
      .map(([id, quantity]) => {
        const product = getProductById(id);

        if (!product) return null;

        return {
          ...product,
          quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [userCart, getProductById]);
  
  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }, [cartProducts]);

  const discountAmount = subtotal * discount;

  const shipping = 0;

  const total = subtotal - discountAmount + shipping;

  const handlePlaceOrder = async () => {
    if (!validateBillingDetails(billingDetails, setErrors)) return;

    if (!user) {
      toast.error("Please sign in first.");
      return;
    }

    try {
      setLoading(true);

      if (saveBillingInfo) {
        await saveBillingInformation(user, billingDetails);
      }

      const order = buildOrder({
        userId: user.uid,
        billing: billingDetails,
        items: cartProducts,
        paymentMethod: preferredPayment,
        subtotal,
        discount,
        shipping,
        total,
      });

      await createOrder(order);

      setTimeout(() => {
        transition.start();
        setUserCart([]);
        toast.success("Your Order Has Been Submitted Successfully!!");
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place your order.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Checkout" />

      <section className="py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1.45fr_0.95fr]">
          {/* LEFT COLUMN */}

          <BillingForm
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
            errors={errors}
            saveBillingInfo={saveBillingInfo}
            setSaveBillingInfo={setSaveBillingInfo}
          />

          {/* RIGHT COLUMN */}

          <aside className="space-y-6 xl:self-start">
            <OrderSummary products={cartProducts} />

            <PromoCode />

            <OrderTotals
              subtotal={subtotal}
              shipping={shipping}
              discountAmount={discountAmount}
              total={total}
            />

            <PaymentMethod />

            <Button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="h-14 w-full text-base disabled:pointer-events-none disabled:opacity-50"
            >
              {!loading? "Place Order": "Placing Order..."}
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
