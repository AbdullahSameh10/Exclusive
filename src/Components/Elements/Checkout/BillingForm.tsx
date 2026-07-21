import type { Dispatch, SetStateAction } from "react";
import { PhoneField } from "../Phone";
import CheckoutInput from "./CheckoutInput";
import type { BillingDetails, BillingErrors } from "@Routers/Checkout";
import { useAuth } from "@Hooks/index";

interface BillingFormProps {
  billingDetails: BillingDetails;
  setBillingDetails: Dispatch<SetStateAction<BillingDetails>>;
  errors: BillingErrors;
  saveBillingInfo: boolean;
  setSaveBillingInfo: Dispatch<SetStateAction<boolean>>;
}

export default function BillingForm({
  billingDetails,
  setBillingDetails,
  errors,
  saveBillingInfo,
  setSaveBillingInfo,
}: BillingFormProps) {
  const { user } = useAuth();
  return (
    <section className="max-h-fit rounded-3xl bg-white p-6 shadow-[0px_1px_13px_0px] shadow-emerald-300/30 md:p-8 xl:sticky xl:top-28">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-600">
          Checkout
        </p>

        <h2 className="mt-1 text-3xl font-bold text-neutral-900">
          Billing Details
        </h2>

        <p className="mt-2 text-neutral-500">
          Please fill in your billing information to complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* First Name */}

        <CheckoutInput
          label="First Name"
          required
          value={billingDetails.firstName || user?.name.split(" ").at(0)}
          error={errors.firstName}
          onChange={(e) =>
            setBillingDetails((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />

        {/* Last Name */}

        <CheckoutInput
          label="Last Name"
          required
          value={billingDetails.lastName}
          error={errors.lastName}
          onChange={(e) =>
            setBillingDetails((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
        />

        {/* Email */}

        <div className="md:col-span-2">
          <CheckoutInput
            label="Email Address"
            required
            type="email"
            value={billingDetails.email}
            error={errors.email}
            onChange={(e) =>
              setBillingDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>

        {/* Phone */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Phone Number
            <span className="ml-1 text-emerald-500">*</span>
          </label>

          <PhoneField
            value={billingDetails.phone}
            onChange={(value) =>
              setBillingDetails((prev) => ({
                ...prev,
                phone: value,
              }))
            }
            className={`bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 ${
              errors.phone ? "!border-red-500" : "border-neutral-300"
            }`}
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Country */}

        <CheckoutInput
          label="Country"
          required
          value={billingDetails.country}
          error={errors.country}
          onChange={(e) =>
            setBillingDetails((prev) => ({
              ...prev,
              country: e.target.value,
            }))
          }
        />

        {/* City */}

        <CheckoutInput
          label="City"
          required
          value={billingDetails.city}
          error={errors.city}
          onChange={(e) =>
            setBillingDetails((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
        />

        {/* Street */}

        <div className="md:col-span-2">
          <CheckoutInput
            label="Street Address"
            required
            value={billingDetails.streetAddress}
            error={errors.streetAddress}
            onChange={(e) =>
              setBillingDetails((prev) => ({
                ...prev,
                streetAddress: e.target.value,
              }))
            }
          />
        </div>

        {/* Apartment */}

        <div className="md:col-span-2">
          <CheckoutInput
            label={
              <>
                Apartment, suite, etc.
                <span className="ml-1 text-xs font-normal text-neutral-400">
                  (Optional)
                </span>
              </>
            }
            value={billingDetails.apartment}
            onChange={(e) =>
              setBillingDetails((prev) => ({
                ...prev,
                apartment: e.target.value,
              }))
            }
          />
        </div>

        {/* Order Notes */}

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-neutral-700">
            Order Notes
            <span className="ml-1 text-xs font-normal text-neutral-400">
              (Optional)
            </span>
          </label>

          <textarea
            rows={5}
            value={billingDetails.orderNotes}
            onChange={(e) =>
              setBillingDetails((prev) => ({
                ...prev,
                orderNotes: e.target.value,
              }))
            }
            placeholder="Notes about your order..."
            className="resize-none rounded-lg border border-neutral-300 px-4 py-3 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Save Billing Information */}

        <label className="mt-2 flex cursor-pointer items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            checked={saveBillingInfo}
            onChange={(e) => setSaveBillingInfo(e.target.checked)}
            className="peer sr-only"
          />

          <span className="relative flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 transition-all duration-200 after:scale-50 after:text-sm after:font-bold after:text-white after:opacity-0 after:transition-all after:duration-200 after:content-['✓'] peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-checked:after:scale-100 peer-checked:after:opacity-100" />

          <span className="text-sm text-neutral-600">
            Save this information for future orders.
          </span>
        </label>
      </div>
    </section>
  );
}