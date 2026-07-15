import styled from "styled-components";
import {
  Banner,
  Button,
  CounterDown,
  ProductCard,
  ProductCardLoading,
  SideBar,
} from "../Elements";
import { Section } from "../Layouts";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useRouteTransition from "../Hooks/useRouteTransition";
import { shuffleArray } from "../Utilities";
import servicesImg from "@Assets/Services.svg";
import servicesImg2 from "@Assets/Services (1).svg";
import servicesImg3 from "@Assets/Services (2).svg";

const dummyCategories = [
  "Phones",
  "Computers",
  "SmartWatches",
  "Camera",
  "HeadPhones",
  "Gamming",
];
const dummyIcons = [
  "@Assets/Dummy/Category-CellPhone.svg",
  "@Assets/Dummy/Category-Computer.svg",
  "@Assets/Dummy/Category-SmartWatch.svg",
  "@Assets/Dummy/Category-Camera.svg",
  "@Assets/Dummy/Category-HeadPhone.svg",
  "@Assets/Dummy/Category-GamePad.svg",
];

const SectionButton = <Button>View All</Button>;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

type ProductsTypes = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  thumbnail: string;
  reviews: [
    {
      rating: number;
      comment: string;
      date: Date;
      reviewerName: string;
      reviewerEmail: string;
    },
  ];
};

type UIProduct = ProductsTypes & {
  isNew: boolean;
};

const mapProduct = (p: ProductsTypes) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  rating: p.rating,
  thumbnail: p.thumbnail,
  reviewsNo: p.reviews.length,
});

export default function Home() {
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const slicedProducts = products.slice(12, 28);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
    const loadingProducts = setTimeout(() => {
      setIsLoading(true);
    }, 0);

    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => res.json() as Promise<{ products: ProductsTypes[] }>)
      .then((data) => {
        const shuffled = shuffleArray(data.products);

        const withRandomFlags: UIProduct[] = shuffled.map((p) => ({
          ...p,
          isNew: Math.random() > 0.7,
        }));

        setProducts(withRandomFlags);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));

    return () => clearTimeout(loadingProducts);
  }, []);

  const transition = useRouteTransition();

  useEffect(() => {
    transition.end();
  }, [transition]);

  return (
    <>
      <div className="mb-[140px] flex">
        <SideBar />
        <Banner />
      </div>
      <div className="relative">
        <CounterDown
          className="absolute left-[298px] top-[53px]"
          variant="primary"
        />
        <Section category="Today's" heading="Flash Sales" arrows>
          {!isLoading
            ? products
                .slice(0, 8)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    sale={Math.ceil(product.discountPercentage)}
                    rating={product.rating}
                    thumbnail={product.thumbnail}
                    reviewsNo={product.reviews.length}
                  />
                ))
            : [...Array(8).keys()].map((i) => <ProductCardLoading key={i} />)}
        </Section>
        <Button className="mx-auto my-[60px]">View All Products</Button>
      </div>
      <hr />
      <Section
        category="Categories"
        heading="Browse By Category"
        className="mb-[70px] mt-20"
      >
        {dummyCategories.map((category, i) => (
          <div
            key={i}
            className="flex h-[145px] w-[170px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border border-[#0000004D] transition-all duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-[#FAFAFA] active:scale-95"
          >
            <img src={dummyIcons[i]} alt={`${category} icon`} />
            <span className="font-poppins text-base font-normal">
              {category}
            </span>
          </div>
        ))}
      </Section>
      <hr />
      <Section
        category="This Month"
        heading="Best Selling Products"
        button={SectionButton}
        className="mt-[70px]"
      >
        {!isLoading
          ? products
              .slice(8, 12)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  sale={Math.ceil(product.discountPercentage)}
                  rating={product.rating}
                  thumbnail={product.thumbnail}
                  reviewsNo={product.reviews.length}
                />
              ))
          : [...Array(4).keys()].map((i) => <ProductCardLoading key={i + 8} />)}
      </Section>
      <div className="mb-[71px] mt-[140px] flex h-[500px] w-full items-center justify-between overflow-hidden rounded-2xl bg-black px-6 py-12">
        <div className="w-[443px] pl-8">
          <span className="font-poppins font-semibold text-[#00FF66]">
            Categories
          </span>
          <p className="my-8 font-inter text-[48px] font-semibold leading-[60px] tracking-[2%] text-[#FAFAFA]">
            Enhance Your Sport Experience
          </p>
          <CounterDown
            variant="secondary"
            initialSeconds={5 * 24 * 60 * 60 + 23 * 60 * 60 + 59 * 60 + 59}
          />
          <Link
            to="/product/152/Tennis Racket"
            onClick={() => {
              transition.start();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Button className="bg-[#00FF66] hover:bg-[#00dc58]">
              Buy Now!
            </Button>
          </Link>
        </div>
        <div className="group h-[420px] w-[600px] cursor-pointer drop-shadow-[0_0_50px_rgba(217,217,217,0.75)]">
          <img
            src="https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp"
            alt="tennis racket image"
            width="85%"
            className="absolute -top-8 right-0 -translate-x-3 -rotate-45 transition-all duration-300 group-hover:scale-105"
          />
          <img
            src="https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp"
            alt="tennis racket image"
            width="85%"
            className="absolute -top-8 right-0 translate-x-3 rotate-45 transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <Section category="Our Products" heading="Explore Our Products" arrows>
        {!isLoading
          ? slicedProducts.map((_, i) => {
              if (i % 2 !== 0) return null;

              const first = slicedProducts[i];
              const second = slicedProducts[i + 1];

              return (
                <Column key={first.id}>
                  <ProductCard
                    {...mapProduct(first)}
                    newProduct={first.isNew}
                  />
                  {second && (
                    <ProductCard
                      {...mapProduct(second)}
                      newProduct={second.isNew}
                    />
                  )}
                </Column>
              );
            })
          : [...Array(8).keys()].map((i) => (
              <Column key={i + 12}>
                <ProductCardLoading />
                <ProductCardLoading />
              </Column>
            ))}
      </Section>
      <Button className="mx-auto my-[60px]">View All Products</Button>
      <Section category="Featured" heading="New Arrival" className="my-[140px]">
        <div className="grid h-[600px] w-full grid-cols-4 grid-rows-2 gap-[30px]">
          <div className="group relative col-span-2 row-span-2 flex cursor-pointer items-end rounded-lg bg-black p-8 text-[#FAFAFA]">
            <img
              src="https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp"
              alt="Asus Zenbook Pro Dual Screen Laptop image preview"
              className="absolute left-0 top-0 h-full w-full drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110"
            />
            <div className="z-10 flex w-96 flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Asus Zenbook Pro Dual Screen Laptop
              </span>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm font-normal tracking-wider">
                  The Asus Zenbook Pro Dual Screen Laptop is a high-performance
                  device with dual screens, providing productivity and
                  versatility for creative professionals.
                </p>
              </div>
              <Link
                to="/"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="group relative col-span-2 row-span-1 flex cursor-pointer items-end rounded-lg bg-black p-6 text-[#FAFAFA]">
            <img
              src="https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/thumbnail.webp"
              alt="Green and Black Glasses Image Preview"
              className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:scale-110"
            />
            <div className="z-10 flex w-96 flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Green and Black Glasses
              </span>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm font-normal tracking-wider">
                  The Green and Black Glasses feature a bold combination of
                  green and black colors, adding a touch of vibrancy to your
                  eyewear collection. They are both stylish and eye-catching.
                </p>
              </div>
              <Link
                to="/"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="group relative flex cursor-pointer items-end rounded-lg bg-black p-6 text-[#FAFAFA]">
            <img
              src="https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp"
              alt="Rolex Cellini Date Black Dial Image Preview"
              className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110"
            />
            <div className="z-10 flex w-96 flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Rolex Cellini Date Black Dial
              </span>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm font-normal tracking-wider">
                  The Rolex Cellini Date with Black Dial is a classic and
                  prestigious watch. With a black dial and date complication, it
                  exudes sophistication and is a symbol of Rolex's heritage.
                </p>
              </div>
              <Link
                to="/"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="group relative flex cursor-pointer items-end rounded-lg bg-black p-6 text-[#FAFAFA]">
            <img
              src="https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
              alt="Chanel Coco Noir Eau De Image Preview"
              className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110"
            />
            <div className="z-10 flex w-96 flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Chanel Coco Noir Eau De
              </span>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm font-normal tracking-wider">
                  Coco Noir by Chanel is an elegant and mysterious fragrance,
                  featuring notes of grapefruit, rose, and sandalwood. Perfect
                  for evening occasions.
                </p>
              </div>
              <Link
                to="/"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <div className="mx-auto my-[140px] flex w-fit gap-[88px]">
        <div className="group flex flex-col items-center gap-6">
          <img
            src={servicesImg}
            alt="icon"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col items-center gap-2 font-poppins">
            <span className="text-xl font-semibold">
              FREE AND FAST DELIVERY
            </span>
            <span className="text-sm font-normal">
              Free delivery for all orders over $140
            </span>
          </div>
        </div>
        <div className="group flex flex-col items-center gap-6">
          <img
            src={servicesImg2}
            alt="icon"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col items-center gap-2 font-poppins">
            <span className="text-xl font-semibold">24/7 CUSTOMER SERVICE</span>
            <span className="text-sm font-normal">
              Friendly 24/7 customer support
            </span>
          </div>
        </div>
        <div className="group flex flex-col items-center gap-6">
          <img
            src={servicesImg3}
            alt="icon"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col items-center gap-2 font-poppins">
            <span className="text-xl font-semibold">MONEY BACK GUARANTEE</span>
            <span className="text-sm font-normal">
              We reurn money within 30 days
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
