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
    <section className="rounded-3xl w-full border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-white hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
              <FontAwesomeIcon icon={spec.icon} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-sm text-gray-500">{spec.label}</p>

              <p className="break-words text-base font-semibold text-gray-900">
                {spec.value || `No ${spec.label} Available!`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
