import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  AmountCounter,
  Breadcrumb,
  Button,
  ProductCard,
  ProductSpecifications,
  StarRating,
} from "@Elements/index";
import { useCapitalizeSentence, useRouteTransition } from "@Hooks/index";
import { useParams } from "react-router";
import { Section } from "@Layouts/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { WishlistIcon } from "@Components/Assets/Assets Elements";
import deliveryIcon from "@Assets/icon-delivery.svg";
import returnIcon from "@Assets/Icon-return.svg";
import { ProductsContext, UserContext } from "@Contexts/index";
import { shuffleArray } from "../Utilities";

const colors = ["#A0BCE0", "#E07575"];
const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductDetails() {
  const { id } = useParams();

  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(2);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [counter, setCounter] = useState(1);
  const { products, getProductById } = useContext(ProductsContext);
  const { setUserCart, userCart } = useContext(UserContext);
  const product = getProductById(Number(id));

  const transition = useRouteTransition();

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (!thumbnailsRef.current) return;

    const scrollTop = thumbnailsRef.current.scrollTop;
    const scrollHeight = thumbnailsRef.current.scrollHeight;
    const clientHeight = thumbnailsRef.current.clientHeight;

    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 2);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [product]);

  const scrollThumbnails = (direction: "up" | "down") => {
    if (!thumbnailsRef.current) return;

    thumbnailsRef.current.scrollBy({
      top: direction === "up" ? -160 : 160,
      behavior: "smooth",
    });

    // Wait for the smooth scroll to finish
    setTimeout(updateScrollButtons, 300);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return shuffleArray(
      products.filter(
        (p) => p.category === product.category && p.id !== product.id,
      ),
    ).slice(0, 4);
  }, [products, product]);

  const handleBuyNow = (): void => {
    if (!id) return;

    // setUserCart expects a string[] value (not an updater), provide the new cart array
    setUserCart([...userCart, ...Array(counter).fill(String(id))]);
  };

  return (
    <>
      <Breadcrumb
        pages={[
          "Home",
          "Products",
          useCapitalizeSentence(product?.category || "") || "",
        ]}
        links={["/", "/products", `/products?category=${product?.category}`]}
        currentPage={product?.title || ""}
      />
      <div className="mx-auto mt-10 w-full max-w-[1400px] px-4 sm:px-6 lg:mt-20 lg:px-8">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:gap-16">
          <div className="flex w-full flex-col gap-8 lg:flex-row xl:flex-1 xl:gap-8">
            {/* ================= Thumbnails ================= */}
            <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:w-auto">
              {/* Up Button */}
              <button
                onClick={() => scrollThumbnails("up")}
                className={`mb-4 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white lg:flex ${
                  canScrollUp
                    ? "pointer-events-auto opacity-100 hover:-translate-y-1 hover:border-red-500 hover:text-red-500 hover:shadow-xl"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>

              {/* Thumbnails */}
              <div
                ref={thumbnailsRef}
                onScroll={updateScrollButtons}
                className="scrollbar-hide flex w-full gap-3 overflow-x-auto overflow-y-hidden scroll-smooth py-1 lg:max-h-[600px] lg:w-[170px] lg:flex-col lg:gap-4 lg:overflow-y-auto lg:overflow-x-hidden"
              >
                {product?.images.map((image) => (
                  <div
                    key={image}
                    onClick={() => setImageSrc(image)}
                    className={`group flex h-24 min-h-24 min-w-24 cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:h-28 sm:min-h-28 sm:min-w-28 lg:h-[138px] lg:min-h-[138px] lg:w-[170px] lg:min-w-[170px] ${
                      imageSrc === image
                        ? "border-red-500 shadow-xl"
                        : "border-transparent"
                    } `}
                  >
                    <img
                      src={image}
                      alt="Product"
                      className="max-h-[75%] max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Down Button */}
              <button
                onClick={() => scrollThumbnails("down")}
                className={`mt-4 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white lg:flex ${
                  canScrollDown
                    ? "pointer-events-auto opacity-100 hover:translate-y-1 hover:border-red-500 hover:text-red-500 hover:shadow-xl"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>

            {/* ================= Main Image ================= */}
            <div className="order-1 flex h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 p-6 dark:border-zinc-700 dark:bg-zinc-900 sm:h-[420px] lg:order-2 lg:h-[600px] lg:w-[500px]">
              <img
                src={imageSrc || product?.images[0]}
                alt="Product"
                className="max-h-full max-w-full object-contain transition-all duration-500 hover:scale-105 lg:w-[446px]"
              />
            </div>
          </div>

          <div className="w-full xl:max-w-[420px] xl:flex-shrink-0">
            {/* Product Title */}
            <h1 className="font-inter text-3xl font-bold leading-tight text-zinc-900 dark:text-white">
              {product?.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <StarRating rating={product ? product.rating : 0} />

                <a
                  href="#reviews"
                  className="font-poppins text-sm text-zinc-500 transition hover:text-red-500 dark:text-zinc-400"
                >
                  ({product?.reviews.length} Reviews)
                </a>
              </div>

              <span className="hidden text-zinc-400 sm:block">|</span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  (product?.minimumOrderQuantity || 0) < (product?.stock || 0)
                    ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {(product?.minimumOrderQuantity || 0) < (product?.stock || 0)
                  ? "In Stock"
                  : "Out Of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="font-inter text-4xl font-bold text-red-600 dark:text-red-400">
                ${product?.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 border-b border-zinc-200 pb-8 font-poppins leading-7 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              {product?.description}
            </p>

            {/* Options */}
            <div className="mt-8 flex flex-col gap-8">
              {/* Colors */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="font-inter text-lg font-semibold text-zinc-900 dark:text-white">
                  Colours
                </span>

                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveColor(index)}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
                        activeColor === index
                          ? "border-2 border-red-500"
                          : "border-2 border-transparent"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full transition ${
                          activeColor === index ? "scale-90" : "scale-100"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="font-inter text-lg font-semibold text-zinc-900 dark:text-white">
                  Size
                </span>

                <div className="flex flex-wrap gap-3">
                  {sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSize(i)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border font-medium transition-all duration-300 ${
                        activeSize === i
                          ? "border-red-500 bg-red-500 text-white shadow-lg"
                          : "border-zinc-300 bg-white text-zinc-700 hover:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buy Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <AmountCounter
                  minAmount={product?.minimumOrderQuantity || 0}
                  maxAmount={product?.stock || 0}
                  counter={counter}
                  setCounter={setCounter}
                />

                <Button
                  className="h-12 flex-1 rounded-xl px-6 disabled:pointer-events-none disabled:opacity-50"
                  disabled={
                    (product?.minimumOrderQuantity || 0) > (product?.stock || 0)
                  }
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 transition hover:border-red-500 dark:border-zinc-700">
                  <WishlistIcon productId={String(product?.id) || ""} />
                </div>
              </div>
            </div>

            {/* Delivery Card */}
            <div className="mt-10 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
              <div className="flex gap-4 p-6">
                <img
                  src={deliveryIcon}
                  alt="delivery icon"
                  className="h-10 w-10 shrink-0"
                />

                <div>
                  <h3 className="font-poppins text-base font-semibold text-zinc-900 dark:text-white">
                    Free Delivery
                  </h3>

                  <p className="mt-1 cursor-pointer text-sm text-red-600 underline dark:text-red-400">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-700" />

              <div className="flex gap-4 p-6">
                <img
                  src={returnIcon}
                  alt="return icon"
                  className="h-10 w-10 shrink-0"
                />

                <div>
                  <h3 className="font-poppins text-base font-semibold text-zinc-900 dark:text-white">
                    Return Delivery
                  </h3>

                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Free 30 Days Delivery Returns.{" "}
                    <span className="cursor-pointer font-semibold text-red-600 underline dark:text-red-400">
                      Details
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Section
          category="Specifications"
          className="mx-auto mt-20 w-full lg:mt-32"
        >
          <ProductSpecifications product={product as any} />
        </Section>

        <Section
          category="Customer Reviews"
          className="mx-auto mt-20 w-full lg:mt-32"
        >
          <div id="reviews" className="w-full">
            <div className="mx-auto max-w-5xl space-y-6">
              {product?.reviews.map((review, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md"
                        style={{
                          backgroundColor: getAvatarColor(review.reviewerName),
                        }}
                      >
                        {review.reviewerName[0]}
                      </div>

                      <div>
                        <h3 className="font-poppins text-lg font-semibold text-zinc-900 dark:text-white">
                          {review.reviewerName}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="self-start sm:self-center">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 dark:border-zinc-700" />

                  <p className="p-6 font-poppins leading-8 text-zinc-600 dark:text-zinc-300">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          category="Related Products"
          className="mx-auto my-20 w-full lg:my-32 px-0"
        >
          <div className="grid grid-cols-1 w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                title={relatedProduct.title}
                price={relatedProduct.price}
                sale={Math.ceil(relatedProduct.discountPercentage)}
                stock={relatedProduct.stock}
                minAmount={relatedProduct.minimumOrderQuantity}
                rating={relatedProduct.rating}
                thumbnail={relatedProduct.thumbnail}
                reviewsNo={relatedProduct.reviews.length}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function getAvatarColor(name: string) {
  const colors = [
    "#EF4444",
    "#F59E0B",
    "#8B5CF6",
    "#22C55E",
    "#3B82F6",
    "#14B8A6",
    "#F97316",
    "#6366F1",
    "#84CC16",
    "#A855F7",
    "#06B6D4",
    "#EC4899",
  ];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return colors[hash % colors.length];
}
