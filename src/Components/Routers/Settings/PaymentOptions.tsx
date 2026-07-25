import { CreditCard, Banknote, Wallet, BadgeCheck } from "lucide-react";
import { UserContext } from "@Contexts/index";
import { useContext, useState } from "react";
import type { PaymentMethod } from "@Contexts/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@Authentication/firebase";
import { useAuth } from "@Hooks/index";

import visa from "@Assets/payment/visa.png";
import mastercard from "@Assets/payment/mastercard.png";
import paypal from "@Assets/payment/paypal.png";
import stripe from "@Assets/payment/stripe.png";
import paymob from "@Assets/payment/paymob.png";
import fawry from "@Assets/payment/fawry.png";
import vodafoneCash from "@Assets/payment/cash.png";
import instapay from "@Assets/payment/instapay.png";
import cod from "@Assets/payment/cod.png";
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
     {/* Loading */}
     {isLoading && (
       <div className="absolute inset-0 -bottom-10 -left-5 -right-5 -top-5 z-10 flex items-center justify-center rounded-3xl bg-black/40 sm:-left-8 sm:-right-8 sm:-top-8 lg:-left-10 lg:-right-10 lg:-top-10 xl:-left-12 xl:-right-12 xl:-top-12">
         <span className="h-20 w-20 animate-spin rounded-full border-4 border-white border-y-red-500" />
       </div>
     )}

     {/* Header */}
     <div>
       <h2 className="text-2xl font-bold text-red-500">Payment Options</h2>

       <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
         Choose your preferred payment method for future orders.
       </p>
     </div>

     {/* Payment Cards */}
     <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
       {paymentMethods.map((method) => {
         const Icon = method.icon;

         const selected = preferredPayment === method.name;

         return (
           <div
             key={method.name}
             onClick={async () => {
               await handlePaymentMethodChange(method.name as PaymentMethod);
             }}
             className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900 ${
               selected
                 ? "border-red-500 ring-2 ring-red-500/10 dark:border-red-500"
                 : "border-zinc-200 hover:border-red-300 dark:border-zinc-700"
             }`}
           >
             {/* Selected Badge */}
             {selected && (
               <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                 <BadgeCheck size={14} />
                 Selected
               </div>
             )}

             {/* Logo */}
             <div className="flex h-28 items-center justify-center rounded-xl bg-zinc-50 transition-colors duration-300 dark:bg-zinc-800">
               <img
                 src={method.image}
                 alt={method.name}
                 className="max-h-16 max-w-28 object-contain transition duration-300 group-hover:scale-105"
               />
             </div>

             {/* Title */}
             <div className="mt-6 flex items-center gap-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/20">
                 <Icon size={18} />
               </div>

               <div>
                 <h3 className="font-semibold text-zinc-900 dark:text-white">
                   {method.name}
                 </h3>

                 <p className="text-xs text-zinc-500 dark:text-zinc-400">
                   Payment Method
                 </p>
               </div>
             </div>

             {/* Description */}
             <p className="mt-5 leading-6 text-zinc-600 dark:text-zinc-300">
               {method.description}
             </p>
           </div>
         );
       })}
     </div>
   </div>
 );
}
