import {
  faBox,
  faBoxOpen,
  faRulerCombined,
  faShieldHalved,
  faTruckFast,
  faRotateLeft,
  faTag,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ProductSpecificationsProps = {
  product: {
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    minimumOrderQuantity: number;
  };
};

export default function ProductSpecifications(props: ProductSpecificationsProps) {
  const { product } = props;
  const specs = [
    {
      icon: faTag,
      label: "Brand",
      value: product?.brand,
    },
    {
      icon: faBox,
      label: "SKU",
      value: product?.sku,
    },
    {
      icon: faWeightScale,
      label: "Weight",
      value: `${product?.weight} g`,
    },
    {
      icon: faRulerCombined,
      label: "Dimensions",
      value: `${product?.dimensions.width}W × ${product?.dimensions.height}H × ${product?.dimensions.depth}D cm`,
    },
    {
      icon: faShieldHalved,
      label: "Warranty",
      value: product?.warrantyInformation,
    },
    {
      icon: faTruckFast,
      label: "Shipping",
      value: product?.shippingInformation,
    },
    {
      icon: faRotateLeft,
      label: "Return Policy",
      value: product?.returnPolicy,
    },
    {
      icon: faBoxOpen,
      label: "Minimum Order",
      value: product?.minimumOrderQuantity,
    },
  ];

  return (
    <section className="w-full rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-900 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-white hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-red-500 dark:hover:bg-zinc-800"
          >
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white dark:bg-violet-500/20 dark:text-red-500 dark:group-hover:bg-red-500 dark:group-hover:text-white">
              <FontAwesomeIcon icon={spec.icon} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {spec.label}
              </p>

              <p className="break-words text-base font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
                {spec.value || `No ${spec.label} Available!`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
