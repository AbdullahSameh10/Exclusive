import { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  ProductCard,
  ProductSpecifications,
  StarRating,
} from "@Elements/index";
import {useRouteTransition} from "@Hooks/index";
import { useParams } from "react-router";
import { shuffleArray } from "@Utilities/index";
import { Section } from "@Layouts/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { WishlistIcon } from "@Components/Assets/Assets Elements";
import deliveryIcon from "@Assets/icon-delivery.svg";
import returnIcon from "@Assets/Icon-return.svg";

type Reviews = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type ProductTypes = {
  id: number;
  description: string;
  title: string;
  price: number;
  category: string;
  discountPercentage: number;
  minimumOrderQuantity: number;
  rating: number;
  images: string[];
  thumbnail: string;
  reviews: Reviews[];
};

const colors = ["#A0BCE0", "#E07575"];
const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductDetails() {
  const { id } = useParams();

  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(2);
  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductTypes[]>([]);
  const category = product?.category;
  const [imageSrc, setImageSrc] = useState<string>("");
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const transition = useRouteTransition();

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setCounter(data.minimumOrderQuantity);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!category) return;

    fetch(`https://dummyjson.com/products/category/${category}`)
      .then(
        (response) => response.json() as Promise<{ products: ProductTypes[] }>,
      )
      .then((data) => {
        const shuffled = shuffleArray<ProductTypes>(data.products);
        setRelatedProducts(shuffled.at(0) ? shuffled.slice(0, 4) : []);
      })
      .catch((err) => console.error(err));
  }, [id, category]);

  return (
    <>
      <Breadcrumb
        pages={["Home", "Products", product?.category || ""]}
        links={["/", "/products", "/products/fragrances"]}
        currentPage={product?.title || ""}
      />
      <div className="mt-20">
        <div className="flex gap-[70px]">
          <div className="flex gap-[30px]">
            <div className="relative flex flex-col items-center">
              <button
                onClick={() => scrollThumbnails("up")}
                className={`absolute -top-14 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur transition-all duration-300 ${
                  canScrollUp
                    ? "pointer-events-auto opacity-100 hover:-translate-y-1 hover:shadow-xl"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>

              <div
                ref={thumbnailsRef}
                onScroll={updateScrollButtons}
                className="scrollbar-hide flex max-h-[600px] flex-col gap-4 overflow-hidden scroll-smooth px-1"
              >
                {product?.images.map((image) => (
                  <div
                    key={image}
                    onClick={() => setImageSrc(image)}
                    className={`group flex max-h-[138px] min-h-[138px] w-[170px] cursor-pointer items-center justify-center rounded-xl border-2 bg-[#F8F8F8] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 ${
                      imageSrc === image
                        ? "border-red-500 shadow-lg"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt="product overview"
                      className="w-[120px] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollThumbnails("down")}
                className={`absolute -bottom-14 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur transition-all duration-300 ${
                  canScrollDown
                    ? "pointer-events-auto opacity-100 hover:translate-y-1 hover:shadow-xl"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>
            <div className="flex h-[600px] w-[500px] items-center justify-center rounded-lg bg-[#F5F5F5]">
              <img
                src={imageSrc || product?.images[0]}
                alt="product thumbnail"
                className="w-[446px]"
              />
            </div>
          </div>
          <div className="w-[400px]">
            <h1 className="font-inter text-2xl font-semibold leading-6">
              {product?.title}
            </h1>

            <div className="my-4 flex w-full items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <StarRating rating={product ? product?.rating : 0} />
                </div>

                <a
                  href="#reviews"
                  className="font-poppins text-sm font-normal text-black/50"
                >
                  ({product?.reviews.length} Reviews)
                </a>
              </div>

              <span className="text-black/50">|</span>
              <span className="font-poppins text-sm font-normal text-[#00FF66]/60">
                In Stock
              </span>
            </div>

            <span className="font-inter text-2xl font-normal leading-6 text-black">
              ${product?.price.toFixed(2)}
            </span>

            <p className="my-6 font-poppins text-sm">{product?.description}</p>

            <hr />

            <div className="mb-10 mt-6 flex flex-col gap-6">
              <div className="flex gap-6">
                <span className="font-inter text-xl font-normal leading-5">
                  Colours:
                </span>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveColor(index)}
                      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${activeColor === index && "border-4 border-black"} `}
                    >
                      <div
                        className={`h-5 !min-h-5 w-5 !min-w-5 rounded-full transition-transform duration-300 ${activeColor === index ? "scale-50" : "scale-100"} `}
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-inter text-xl font-normal leading-5">
                  Size:
                </span>
                <div className="flex gap-4">
                  {sizes.map((size, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveSize(i)}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-2 border-black/50 transition-colors duration-300 ${activeSize === i && "!border-[#DB4444] bg-[#DB4444] text-white"}`}
                    >
                      <span className="font-poppins text-sm font-medium">
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex h-11 items-center gap-4">
                <div className="flex h-full">
                  <button
                    onMouseDown={() => {
                      if (interval.current === null) {
                        interval.current = setInterval(() => {
                          setCounter((prev) =>
                            Math.max(
                              product?.minimumOrderQuantity || 1,
                              prev - 1,
                            ),
                          );
                        }, 100);
                      }
                    }}
                    onMouseUp={() => {
                      if (interval.current !== null) {
                        clearInterval(interval.current);
                        interval.current = null;
                      }
                    }}
                    onMouseLeave={() => {
                      if (interval.current !== null) {
                        clearInterval(interval.current);
                        interval.current = null;
                      }
                    }}
                    onClick={() =>
                      setCounter((prev) =>
                        Math.max(product?.minimumOrderQuantity || 1, prev - 1),
                      )
                    }
                    className="h-full w-10 rounded-[6px_0_0_6px] border border-black/50 text-3xl font-bold transition-colors duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white"
                  >
                    -
                  </button>
                  <span className="flex h-full w-20 items-center justify-center border-y border-black/50 font-poppins text-xl font-bold">
                    {counter}
                  </span>
                  <button
                    onMouseDown={() => {
                      interval.current = setInterval(() => {
                        setCounter((prev) => prev + 1);
                      }, 100);
                    }}
                    onMouseUp={() => {
                      if (interval.current !== null) {
                        clearInterval(interval.current);
                        interval.current = null;
                      }
                    }}
                    onMouseLeave={() => {
                      if (interval.current !== null) {
                        clearInterval(interval.current);
                        interval.current = null;
                      }
                    }}
                    onClick={() => setCounter((prev) => prev + 1)}
                    className="h-full w-10 rounded-[0_6px_6px_0] border border-black/50 text-3xl font-bold transition-colors duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white"
                  >
                    +
                  </button>
                </div>
                <Button className="h-full w-[165px] px-0 py-0">But Now</Button>
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-black/50">
                  <WishlistIcon />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col rounded-md border border-black/50">
              <div className="m-[24px_0_16px_16px] flex gap-4">
                <img
                  src={deliveryIcon}
                  alt="delivery icon"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-poppins text-base font-medium">
                    Free Delivery
                  </span>
                  <span className="cursor-pointer font-poppins text-xs font-medium leading-[18px] underline">
                    Enter your postal code for Delivery Availability
                  </span>
                </div>
              </div>
              <hr className="h-[0.5px] border-0 bg-black/50" />
              <div className="m-[16px_0_24px_16px] flex gap-4">
                <img
                  src={returnIcon}
                  alt="return icon"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-poppins text-base font-medium">
                    Return Delivery
                  </span>
                  <span className="font-poppins text-xs font-medium leading-[18px]">
                    Free 30 Days Delivery Returns.{" "}
                    <u className="cursor-pointer">Details</u>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Section category="Specifications" className="mt-32">
          <ProductSpecifications product={product as any} />
        </Section>

        <Section category="Customer Reviews" className="mt-[140px] w-full">
          <div id="reviews" className="w-full mb-2">
            <div className="space-y-6">
              {product?.reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white"
                        style={{
                          backgroundColor: getAvatarColor(review.reviewerName),
                        }}
                      >
                        {review.reviewerName[0]}
                      </div>

                      <div>
                        <h3 className="font-poppins text-lg font-semibold">
                          {review.reviewerName}
                        </h3>

                        <p className="font-poppins text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Comment */}
                  <p className="mt-6 border-t pt-6 font-poppins leading-7 text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section category="Related Item" className="my-[140px]">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              id={relatedProduct.id}
              title={relatedProduct.title}
              price={relatedProduct.price}
              sale={Math.ceil(relatedProduct.discountPercentage)}
              rating={relatedProduct.rating}
              thumbnail={relatedProduct.thumbnail}
              reviewsNo={relatedProduct.reviews.length}
            />
          ))}
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
