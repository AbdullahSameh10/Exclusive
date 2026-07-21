import { useContext, useEffect, useMemo, useState } from "react";
import {
  BillingForm,
  Breadcrumb,
  Button,
  OrderSummary,
  OrderTotals,
  PaymentMethod,
  PromoCode,
} from "@Elements/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { ProductsContext, UserContext } from "@Contexts/index";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@Authentication/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export type BillingDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  streetAddress: string;
  apartment: string;
  orderNotes: string;
};

export type BillingErrors = Partial<Record<keyof BillingDetails, string>>;

export default function Checkout() {
  const { userCart, discount, setUserCart } = useContext(UserContext);
  const { getProductById } = useContext(ProductsContext);
  const transition = useRouteTransition();
  const { user } = useAuth();

  const navigate = useNavigate();

  const saveBillingInformation = async () => {
    if (!user) return;
    console.log("saveBillingInformation works !!!");

    try {
      await updateDoc(doc(db, "users", user.uid), {
        billingInfo: billingDetails,
      });

      toast.success("Billing information saved successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save billing information.");
    }
  };

  useEffect(() => {
    const loadBillingInfo = async () => {
      try {
        if (!user) return;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        setBillingDetails(userDoc.data()?.billingInfo);
      } catch (err: any) {
        toast.error(err?.message ?? String(err));
      }
    };

    loadBillingInfo();
  }, [user]);

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

  const [errors, setErrors] = useState<BillingErrors>({});

  const [saveBillingInfo, setSaveBillingInfo] = useState(false);

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

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const validateBillingDetails = () => {
    const newErrors: BillingErrors = {};

    if (!billingDetails.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!billingDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!billingDetails.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingDetails.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!billingDetails.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!billingDetails.country.trim()) {
      newErrors.country = "Country is required.";
    }

    if (!billingDetails.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!billingDetails.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateBillingDetails()) return;

    if (saveBillingInfo) {
      await saveBillingInformation();
    }

    console.log(billingDetails);

    console.log(cartProducts);

    console.log(total);

    setTimeout(() => {
      setUserCart([]);
      navigate("/", { replace: true });
    }, 1000);
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

            <OrderTotals
              subtotal={subtotal}
              shipping={shipping}
              discountAmount={discountAmount}
              total={total}
            />

            <PromoCode />

            <PaymentMethod />

            <Button
              onClick={handlePlaceOrder}
              className="h-14 w-full text-base"
            >
              Place Order
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
