import styled from "styled-components";
import { Section } from "../Layouts";
import { Link } from "react-router";
import { useContext, useEffect } from "react";
import useRouteTransition from "../Hooks/useRouteTransition";
import { shuffleArray } from "../Utilities";
import { ProductsContext } from "@Contexts/index";
import type { Product } from "@Types/Data.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Banner,
  Button,
  CounterDown,
  ProductCard,
  ProductCardLoading,
  SideBar,
} from "../Elements";
import {
  faMobileScreenButton,
  faLaptop,
  faClock,
  faSprayCanSparkles,
  faPersonBiking,
  faGlasses,
} from "@fortawesome/free-solid-svg-icons";
import servicesImg from "@Assets/Services.svg";
import servicesImg2 from "@Assets/Services (1).svg";
import servicesImg3 from "@Assets/Services (2).svg";

const homeCategories = [
  {
    name: "Phones",
    slug: "smartphones",
    icon: faMobileScreenButton,
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: faLaptop,
  },
  {
    name: "Watches",
    slug: "mens-watches",
    icon: faClock,
  },
  {
    name: "Fragrances",
    slug: "fragrances",
    icon: faSprayCanSparkles,
  },
  {
    name: "Motorcycles",
    slug: "motorcycle",
    icon: faPersonBiking,
  },
  {
    name: "Sunglasses",
    slug: "sunglasses",
    icon: faGlasses,
  },
];

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const mapProduct = (p: Product) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  rating: p.rating,
  stock: p.stock,
  minAmount: p.minimumOrderQuantity,
  thumbnail: p.thumbnail,
  reviewsNo: p.reviews.length,
});

export default function Home() {
  const { products, loading } = useContext(ProductsContext);

  const shuffledProducts = shuffleArray(products);

  const flashSales = shuffledProducts.slice(0, 8);

  const bestSelling = shuffledProducts.slice(8, 12);

  const exploreProducts = shuffledProducts.slice(12, 28).map((product) => ({
    ...product,
    isNew: Math.random() > 0.7,
  }));

  const transition = useRouteTransition();

  useEffect(() => {
    transition.end();
  }, [transition]);

  return (
    <>
      <div className="mb-16 flex flex-col lg:mb-36 lg:flex-row">
        <SideBar />
        <Banner />
      </div>

      <div className="relative">
        <CounterDown
          className="hidden lg:absolute lg:left-[298px] lg:top-[53px]"
          variant="primary"
        />

        <Section category="Today's" heading="Flash Sales" arrows>
          {!loading
            ? flashSales.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  stock={product.stock}
                  minAmount={product.minimumOrderQuantity}
                  sale={Math.ceil(product.discountPercentage)}
                  rating={product.rating}
                  thumbnail={product.thumbnail}
                  reviewsNo={product.reviews.length}
                />
              ))
            : [...Array(8).keys()].map((i) => <ProductCardLoading key={i} />)}
        </Section>

        <Link
          to="/products"
          onClick={() => {
            transition.start();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <Button className="mx-auto my-10 ml-4 lg:my-16">View All Products</Button>
        </Link>
      </div>

      <hr className="dark:border-white/10" />

      <Section
        category="Categories"
        heading="Browse By Category"
        className="mb-16 mt-16 lg:mb-20 lg:mt-20"
      >
        {homeCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/products?category=${category.slug}`}
            onClick={() => {
              transition.start();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="group flex h-28 min-w-28 flex-col items-center justify-center gap-4 rounded-md border border-black/20 transition-all duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] active:scale-95 dark:border-white/15 lg:h-[145px] lg:w-[170px]"
          >
            <FontAwesomeIcon
              icon={category.icon}
              className="text-4xl text-black transition-colors duration-300 group-hover:text-white dark:text-white lg:text-5xl"
            />

            <span className="font-poppins text-sm text-black transition-colors duration-300 group-hover:text-white dark:text-white lg:text-base">
              {category.name}
            </span>
          </Link>
        ))}
      </Section>

      <hr className="border-black/10 transition-colors duration-300 dark:border-white/10" />

      <Section
        category="This Month"
        heading="Best Selling Products"
        button={<SectionButton />}
        className="mt-10 sm:mt-[70px]"
      >
        {!loading
          ? bestSelling.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                stock={product.stock}
                price={product.price}
                minAmount={product.minimumOrderQuantity}
                sale={Math.ceil(product.discountPercentage)}
                rating={product.rating}
                thumbnail={product.thumbnail}
                reviewsNo={product.reviews.length}
              />
            ))
          : [...Array(4).keys()].map((i) => <ProductCardLoading key={i + 8} />)}
      </Section>
      <div className="my-16 w-[calc(100%-32px)] mx-4 flex flex-col-reverse items-center justify-between gap-12 overflow-hidden rounded-2xl bg-black px-6 py-10 sm:mb-[71px] sm:mt-[140px] sm:px-10 sm:py-14 lg:flex-row">
        <div className="w-full max-w-[443px]">
          <span className="font-poppins font-semibold text-[#00FF66]">
            Categories
          </span>

          <p className="mb-8 mt-4 font-inter text-3xl font-semibold leading-tight text-[#FAFAFA] sm:text-4xl lg:text-[48px]">
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
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <Button className="mt-8 bg-[#00FF66] hover:bg-[#00dc58]">
              Buy Now!
            </Button>
          </Link>
        </div>

        <div className="group relative flex h-[260px] w-full max-w-[600px] cursor-pointer items-center justify-center drop-shadow-[0_0_50px_rgba(217,217,217,0.75)] sm:h-[340px] lg:h-[420px]">
          <img
            src="https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp"
            alt="tennis racket image"
            className="absolute w-[80%] -translate-x-4 -rotate-45 transition-all duration-300 group-hover:scale-105"
          />

          <img
            src="https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp"
            alt="tennis racket image"
            className="absolute w-[80%] translate-x-4 rotate-45 transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <Section category="Our Products" heading="Explore Our Products" arrows>
        {!loading
          ? exploreProducts.map((_, i) => {
              if (i % 2 !== 0) return null;

              const first = exploreProducts[i];
              const second = exploreProducts[i + 1];

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
      <Link
        to="/products"
        onClick={() => {
          transition.start();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <Button className="mx-auto ml-4 my-10 sm:my-[60px]">
          View All Products
        </Button>
      </Link>

      <Section
        category="Featured"
        heading="New Arrival"
        className="my-16 sm:my-[140px]"
      >
        <div className="grid w-full gap-6 sm:gap-[30px] lg:h-[600px] lg:grid-cols-4 lg:grid-rows-2">
          <div className="group relative flex min-h-[500px] cursor-pointer items-end overflow-hidden rounded-xl bg-black p-6 text-[#FAFAFA] sm:p-8 lg:col-span-2 lg:row-span-2">
            <img
              src="https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp"
              alt="Asus Zenbook Pro Dual Screen Laptop image preview"
              className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110"
            />

            <div className="z-10 flex max-w-md flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Asus Zenbook Pro Dual Screen Laptop
              </span>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm tracking-wider">
                  The Asus Zenbook Pro Dual Screen Laptop is a high-performance
                  device with dual screens, providing productivity and
                  versatility for creative professionals.
                </p>
              </div>

              <Link
                to="/products"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="group relative flex min-h-[250px] cursor-pointer items-end overflow-hidden rounded-xl bg-black p-6 text-[#FAFAFA] lg:col-span-2 lg:row-span-1">
            <img
              src="https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/thumbnail.webp"
              alt="Green and Black Glasses Image Preview"
              className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:scale-110"
            />

            <div className="z-10 flex max-w-md flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Green and Black Glasses
              </span>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm tracking-wider">
                  The Green and Black Glasses feature a bold combination of
                  green and black colors, adding a touch of vibrancy to your
                  eyewear collection.
                </p>
              </div>

              <Link
                to="/products"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="group relative flex min-h-[250px] cursor-pointer items-end overflow-hidden rounded-xl bg-black p-6 text-[#FAFAFA]">
            <img
              src="https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp"
              alt="Rolex Cellini Date Black Dial Image Preview"
              className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110"
            />

            <div className="z-10 flex max-w-md flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Rolex Cellini Date Black Dial
              </span>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm tracking-wider">
                  The Rolex Cellini Date with Black Dial is a classic and
                  prestigious watch. With a black dial and date complication, it
                  exudes sophistication and is a symbol of Rolex's heritage.
                </p>
              </div>

              <Link
                to="/products"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="group relative flex min-h-[250px] cursor-pointer items-end overflow-hidden rounded-xl bg-black p-6 text-[#FAFAFA]">
            <img
              src="https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
              alt="Chanel Coco Noir Eau De Image Preview"
              className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110"
            />

            <div className="z-10 flex max-w-md flex-col gap-4">
              <span className="font-inter text-2xl font-semibold leading-6">
                Chanel Coco Noir Eau De
              </span>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden font-poppins text-sm tracking-wider">
                  Coco Noir by Chanel is an elegant and mysterious fragrance,
                  featuring notes of grapefruit, rose, and sandalwood. Perfect
                  for evening occasions.
                </p>
              </div>

              <Link
                to="/products"
                className="relative inline-flex w-fit items-center gap-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:inline-block after:text-2xl after:text-white after:transition-transform after:duration-300 after:content-['→'] group-hover:before:scale-x-100 group-hover:after:translate-x-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <div className="mx-auto my-16 grid w-full max-w-6xl grid-cols-1 gap-10 sm:my-[140px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[88px]">
        <div className="group flex flex-col items-center gap-6 text-center">
          <img
            src={servicesImg}
            alt="Free Delivery"
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <div className="flex flex-col items-center gap-2 font-poppins">
            <span className="text-lg font-semibold text-black transition-colors duration-300 dark:text-white sm:text-xl">
              FREE AND FAST DELIVERY
            </span>

            <span className="text-sm text-black/70 transition-colors duration-300 dark:text-white/70">
              Free delivery for all orders over $140
            </span>
          </div>
        </div>

        <div className="group flex flex-col items-center gap-6 text-center">
          <img
            src={servicesImg2}
            alt="Customer Service"
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <div className="flex flex-col items-center gap-2 font-poppins">
            <span className="text-lg font-semibold text-black transition-colors duration-300 dark:text-white sm:text-xl">
              24/7 CUSTOMER SERVICE
            </span>

            <span className="text-sm text-black/70 transition-colors duration-300 dark:text-white/70">
              Friendly 24/7 customer support
            </span>
          </div>
        </div>

        <div className="group flex flex-col items-center gap-6 text-center">
          <img
            src={servicesImg3}
            alt="Money Back Guarantee"
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <div className="flex flex-col items-center gap-2 font-poppins">
            <span className="text-lg font-semibold text-black transition-colors duration-300 dark:text-white sm:text-xl">
              MONEY BACK GUARANTEE
            </span>

            <span className="text-sm text-black/70 transition-colors duration-300 dark:text-white/70">
              We return money within 30 days
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

const SectionButton = () => {
  const transition = useRouteTransition();

  return (
    <Link
      to="/products"
      onClick={() => {
        transition.start();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="inline-block"
    >
      <Button className="px-6 sm:px-8">View All</Button>
    </Link>
  );
};
