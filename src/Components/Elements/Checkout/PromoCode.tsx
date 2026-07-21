import { useContext, useRef } from "react";
import { faTag, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@Elements/index";
import { useAuth } from "@Hooks/index";
import { UserContext } from "@/Components/Contexts";
import { toast } from "react-toastify";

export default function PromoCode() {
  const { user } = useAuth();
  const { setDiscount, discount } = useContext(UserContext);

  const promoInputRef = useRef<HTMLInputElement>(null);

  const coupons = [
    user?.name?.toUpperCase().split(" ").at(0),
    "SAVE10",
    "FIFA26",
  ].filter(Boolean);

  const updateDiscount = () => {
      if (!promoInputRef.current?.value) {
        toast.error("Please Write The Promocode First!");
        return;
      }
  
      if (
        promoInputRef.current.value.toUpperCase() !==
          user?.name.toUpperCase().split(" ").at(0) &&
        promoInputRef.current.value.toUpperCase() !== "SAVE10" &&
        promoInputRef.current.value.toUpperCase() !== "FIFA26"
      ) {
        toast.error("Promocode Is Invalid Or Expired, Please Try Another One!");
        return;
      }
  
      switch (promoInputRef.current.value.toUpperCase()) {
        case user?.name.toUpperCase().split(" ").at(0):
          setDiscount(0.5);
          break;
  
        case "SAVE10":
          setDiscount(0.1);
          break;
  
        case "FIFA26":
          setDiscount(0.25);
          break;
  
        default:
          toast.success("Promocode Applied Successfully!!");
      }
  
      promoInputRef.current.value = "";
    };

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-[0px_1px_13px_0px] shadow-emerald-300/30">
      {/* Header */}

      <div className="border-b border-emerald-300/30 px-6 py-5">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <FontAwesomeIcon icon={faTag} className="text-emerald-600" />
          Promo Code
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Have a coupon? Apply it below.
        </p>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        <div className="flex flex-col gap-3">
          <input
            ref={promoInputRef}
            type="text"
            placeholder="Enter coupon code"
            className="h-12 rounded-lg border border-neutral-300 px-4 outline-none transition-all placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <Button className="h-12" onClick={() => updateDiscount()}>
            Apply Coupon
          </Button>
        </div>

        {discount === 0 ? (
          <>
            <div>
              <p className="mb-3 text-sm font-medium text-neutral-700">
                Available Coupons
              </p>

              <div className="flex flex-wrap gap-2">
                {coupons.map((coupon) => (
                  <button
                    key={coupon}
                    onClick={() => {
                      if (promoInputRef.current)
                        promoInputRef.current.value = coupon!;
                    }}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-100 active:scale-95"
                  >
                    {coupon}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-neutral-500">
              Tip: Click a coupon to fill it automatically.
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-xl text-emerald-600"
              />

              <div className="flex-1">
                <p className="font-semibold text-emerald-700">Coupon Applied</p>

                <p className="text-sm text-emerald-600">
                  You're enjoying {(discount * 100).toFixed(0)}% OFF.
                </p>
              </div>
            </div>

            <button
              onClick={() => setDiscount(0)}
              className="mt-4 text-sm font-semibold text-red-500 transition hover:text-red-600"
            >
              Remove Coupon
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
