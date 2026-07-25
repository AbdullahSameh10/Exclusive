import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { Store, BadgePercent, ShoppingBag, Wallet } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { Breadcrumb } from "@Elements/index";
import useRouteTransition from "@Hooks/useRouteTransition";

import aboutUsIllustration from "@Assets/About/About us.svg";

import businessman1 from "@Assets/About/businessman 1.png";
import businessman2 from "@Assets/About/businessman 2.png";
import businessman3 from "@Assets/About/businessman 3.png";

import servicesImg from "@Assets/Services.svg";
import servicesImg2 from "@Assets/Services (1).svg";
import servicesImg3 from "@Assets/Services (2).svg";

type MiddleCardPropsTypes = {
  Icon: LucideIcon;
  heading: string;
  subHeading: string;
};

type PersonCardPropsType = {
  img: string;
  name: string;
  description: string;
};

export default function About() {
  const transition = useRouteTransition();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    transition.end();
  }, [transition]);

  return (
    <div className="relative mb-32 text-black dark:text-white">
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="About" />

      <div className="mx-4 mt-10 flex flex-col gap-12 sm:gap-24">
        
        <section className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-10">
            <h1 className="font-inter text-4xl font-semibold leading-tight sm:text-5xl lg:text-[54px]">
              <span className="text-violet-500">Our</span> Story
            </h1>

            <div className="flex max-w-xl flex-col gap-6 font-poppins text-sm leading-7 tracking-wide sm:text-base">
              <p>
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>

              <p>
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:translate-x-[20%]">
            <img
              src={aboutUsIllustration}
              alt="about us illustration"

              className="w-[300px] animate-float sm:w-[450px] lg:w-[709px]"
            />
          </div>
        </section>

        <hr className="dark:border-white/10" />
        
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <MiddleCard
            Icon={Store}
            heading="10.5k"
            subHeading="Sellers active in our site"
          />

          <MiddleCard
            Icon={BadgePercent}
            heading="33k"
            subHeading="Monthly Product Sale"
          />

          <MiddleCard
            Icon={ShoppingBag}
            heading="45.5k"
            subHeading="Customer active in our site"
          />

          <MiddleCard
            Icon={Wallet}
            heading="25k"
            subHeading="Annual gross sale in our site"
          />
        </section>

        <hr className="dark:border-white/10" />

        <section className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <PersonCard
            img={businessman1}
            name="Tom Cruise"
            description="Founder & Chairman"
          />

          <PersonCard
            img={businessman2}
            name="Emma Watson"
            description="Managing Director"
          />

          <PersonCard
            img={businessman3}
            name="Will Smith"
            description="Product Designer"
          />
        </section>

        <hr className="dark:border-white/10" />
        <ServicesSection />
      </div>
    </div>
  );
}

function MiddleCard({ Icon, heading, subHeading }: MiddleCardPropsTypes) {
  return (
    <div className="group flex h-[230px] w-full flex-col items-center justify-center gap-6 rounded-md border border-black/20 bg-white transition-all duration-300 hover:border-violet-500 hover:bg-violet-500 hover:shadow-[0_0_20px_1px_#8a5cf6AA] dark:border-white/20 dark:bg-zinc-900">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-700/30 transition-colors duration-300 group-hover:bg-white/30">
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-white dark:bg-white dark:group-hover:bg-black">
          <Icon
            size={40}

            strokeWidth={1.8}

            className="text-white transition-colors duration-300 group-hover:text-black dark:text-black dark:group-hover:text-white"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="font-inter text-3xl font-bold text-black transition-colors duration-300 group-hover:text-white dark:text-white">
          {heading}
        </span>

        <span className="text-center font-poppins text-sm text-black transition-colors duration-300 group-hover:text-white dark:text-white">
          {subHeading}
        </span>
      </div>
    </div>
  );
}

function PersonCard({ img, name, description }: PersonCardPropsType) {
  return (
    <div className="group flex flex-col gap-8">
      {/* IMAGE */}

      <div className="flex h-[430px] w-full items-end justify-center overflow-hidden rounded-md bg-zinc-100 transition-colors duration-300 dark:bg-zinc-800 sm:w-[370px]">
        <img
          src={img}

          alt={name}

          className="h-[391px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* INFO */}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-inter text-2xl font-medium text-black transition-colors duration-300 group-hover:text-violet-500 dark:text-white sm:text-[32px]">
            {name}
          </h3>

          <p className="font-poppins text-base text-black transition-colors duration-300 group-hover:text-violet-500 dark:text-gray-300">
            {description}
          </p>
        </div>

        {/* SOCIAL ICONS */}

        <div className="flex gap-4">
          <SocialIcon>
            <FaXTwitter />
          </SocialIcon>

          <SocialIcon>
            <FaInstagram />
          </SocialIcon>

          <SocialIcon>
            <FaLinkedinIn />
          </SocialIcon>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-full text-black transition-all duration-300 hover:text-violet-500 dark:text-white dark:hover:text-violet-400">
      {children}
    </button>
  );
}

export function ServicesSection() {
  return (
    <section className="mx-auto grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <ServiceItem
        img={servicesImg}

        title="FREE AND FAST DELIVERY"

        description="Free delivery for all orders over $140"
      />

      <ServiceItem
        img={servicesImg2}

        title="24/7 CUSTOMER SERVICE"

        description="Friendly 24/7 customer support"
      />

      <ServiceItem
        img={servicesImg3}

        title="MONEY BACK GUARANTEE"

        description="We return money within 30 days"
      />
    </section>
  );
}

function ServiceItem({
  img,

  title,

  description,
}: {
  img: string;

  title: string;

  description: string;
}) {
  return (
    <div className="group flex flex-col items-center gap-6 text-center">
      <img
        src={img}

        alt={title}

        className="transition-transform duration-300 group-hover:scale-110"
      />

      <div className="flex flex-col gap-2 font-poppins">
        <h3 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
          {title}
        </h3>

        <p className="text-sm text-black dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}