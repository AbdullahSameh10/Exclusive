import { useContext } from "react";
import { Link } from "react-router";
import { ArrowRight, BadgeCheck, CreditCard } from "lucide-react";

import { UserContext } from "@Contexts/index";

import visa from "@Assets/payment/visa.png";
import mastercard from "@Assets/payment/mastercard.png";
import paypal from "@Assets/payment/paypal.png";
import stripe from "@Assets/payment/stripe.png";
import paymob from "@Assets/payment/paymob.png";
import fawry from "@Assets/payment/fawry.png";
import vodafoneCash from "@Assets/payment/cash.png";
import instapay from "@Assets/payment/instapay.png";
import cod from "@Assets/payment/cod.png";
import { useRouteTransition } from "@Hooks/index";

const paymentMethods = [
  {
    name: "Cash On Delivery",
    image: cod,
    description: "Pay when your order arrives.",
  },
  {
    name: "Visa",
    image: visa,
    description: "Credit & Debit Cards",
  },
  {
    name: "MasterCard",
    image: mastercard,
    description: "Credit & Debit Cards",
  },
  {
    name: "PayPal",
    image: paypal,
    description: "Secure Online Payments",
  },
  {
    name: "Stripe",
    image: stripe,
    description: "International Payments",
  },
  {
    name: "Paymob",
    image: paymob,
    description: "Egyptian Payment Gateway",
  },
  {
    name: "Fawry",
    image: fawry,
    description: "Pay at Fawry Branches",
  },
  {
    name: "Vodafone Cash",
    image: vodafoneCash,
    description: "Mobile Wallet",
  },
  {
    name: "InstaPay",
    image: instapay,
    description: "Instant Bank Transfers",
  },
];

export default function PaymentMethod() {
  const { preferredPayment } = useContext(UserContext);
  const transition = useRouteTransition();

  const selectedPayment =
    paymentMethods.find((method) => method.name === preferredPayment) ??
    paymentMethods[0];

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-[0px_0_13px_0px] shadow-emerald-300/30">
      {/* Header */}

      <div className="border-b border-emerald-300/30 px-6 py-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
          <CreditCard className="text-emerald-600" size={22} />
          Payment Method
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          This payment method will be used for your order.
        </p>
      </div>

      {/* Selected Payment */}

      <div className="space-y-5 p-6">
        <div className="flex items-center gap-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <img
              src={selectedPayment.image}
              alt={selectedPayment.name}
              className="max-h-12 object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-neutral-900">
                {selectedPayment.name}
              </h3>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <BadgeCheck size={14} />
                Preferred
              </span>
            </div>

            <p className="mt-2 text-sm text-neutral-500">
              {selectedPayment.description}
            </p>
          </div>
        </div>

        <Link
          to="/account/payments"
          onClick={() => {
            transition.start();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 font-medium text-emerald-700 transition-all duration-300 hover:bg-emerald-50 active:scale-[0.98]"
        >
          Change Payment Method
          <ArrowRight size={18} className="group-hover:translate-x-1 transition duration-300"/>
        </Link>
      </div>
    </section>
  );
}
