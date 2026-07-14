import { CreditCard, Banknote, Wallet, BadgeCheck } from "lucide-react";
import { UserContext } from "@Contexts/index";
import { useContext, useState } from "react";
import type { PaymentMethod } from "@Contexts/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@Authentication/firebase";
import { useAuth } from "@Hooks/index";

import visa from "@Components/Assets/payment/visa.png";
import mastercard from "@Components/Assets/payment/mastercard.png";
import paypal from "@Components/Assets/payment/paypal.png";
import stripe from "@Components/Assets/payment/stripe.png";
import paymob from "@Components/Assets/payment/paymob.png";
import fawry from "@Components/Assets/payment/fawry.png";
import vodafoneCash from "@Components/Assets/payment/cash.png";
import instapay from "@Components/Assets/payment/instapay.png";
import cod from "@Components/Assets/payment/cod.png";
import { toast } from "react-toastify";

const paymentMethods = [
  {
    name: "Cash On Delivery",
    image: cod,
    description: "Pay When You Receive",
    icon: Banknote,
  },
  {
    name: "Visa",
    image: visa,
    description: "Credit & Debit Cards",
    icon: CreditCard,
    default: true,
  },
  {
    name: "MasterCard",
    image: mastercard,
    description: "Credit & Debit Cards",
    icon: CreditCard,
  },
  {
    name: "PayPal",
    image: paypal,
    description: "Secure Online Payments",
    icon: Wallet,
  },
  {
    name: "Stripe",
    image: stripe,
    description: "International Payments",
    icon: CreditCard,
  },
  {
    name: "Paymob",
    image: paymob,
    description: "Egyptian Payment Gateway",
    icon: Banknote,
  },
  {
    name: "Fawry",
    image: fawry,
    description: "Pay at Fawry Branches",
    icon: Banknote,
  },
  {
    name: "Vodafone Cash",
    image: vodafoneCash,
    description: "Mobile Wallet",
    icon: Wallet,
  },
  {
    name: "InstaPay",
    image: instapay,
    description: "Instant Bank Transfers",
    icon: Wallet,
  },
];

export default function PaymentOptions() {
  const { preferredPayment, setPreferredPayment } = useContext(UserContext);
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentMethodChange = async (method: PaymentMethod) => {
    try {
      setIsLoading(true);
      setPreferredPayment(method as PaymentMethod);
      await updateDoc(doc(db, "users", user?.uid || ""), {
        preferredPayment: method as PaymentMethod,
      });
      if (setUser && user) {
        setUser({
          ...user,
          preferredPayment: method as PaymentMethod,
        });
      }
      toast.success(`Payment method changed to ${method} Successfully 🎉`);
    } catch (error) {
      toast.error((error as Error).message || "Failed to update payment method");
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative flex h-full flex-col">
      {isLoading ? <div className="absolute inset-0 -bottom-10 -left-20 -right-20 -top-10 z-10 flex items-center justify-center rounded-md bg-black/40">
        <span className="h-20 w-20 animate-spin rounded-full border-4 border-white border-y-red-500"/>
      </div> : null}
      <h2 className="text-xl font-semibold text-red-500">Payment Options</h2>

      <div className="mt-10 grid grid-cols-3 gap-7">
        {paymentMethods.map((method) => {
          const Icon = method.icon;

          return (
            <div
              key={method.name}
              onClick={async () => {
                await handlePaymentMethodChange(method.name as PaymentMethod);
              }}
              className="group cursor-pointer select-none rounded-xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
            >
              <div className="flex h-24 items-center justify-center rounded-lg bg-gray-50">
                <img
                  src={method.image}
                  alt={method.name}
                  className="max-h-14 max-w-24 object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Icon size={18} className="text-red-500" />

                <h3 className="font-semibold">{method.name}</h3>
              </div>

              <p className="mt-2 text-sm text-gray-500">{method.description}</p>

              <div className="mt-4 flex h-4 items-center gap-2 text-green-600">
                {preferredPayment === method.name && (
                  <>
                    <BadgeCheck size={16} />
                    <span className="text-sm font-medium">Selected</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
