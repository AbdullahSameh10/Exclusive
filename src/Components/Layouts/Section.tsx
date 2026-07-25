import { useEffect, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";
import rightArrowImg from "@Assets/right arrow.svg";
import leftArrowImg from "@Assets/left arrow.svg";
import styles from "@/styles.module.css";

type SectionPropsTypes = {
  category: string;
  heading?: string;
  arrows?: boolean;
  children: ReactNode;
  button?: JSX.Element;
  className?: string;
};

export default function Section(props: SectionPropsTypes) {
  const {
    category,
    heading,
    children,
    className,
    arrows = false,
    button,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    setIsAtStart(el.scrollLeft === 0);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      handleScroll();
    });

    observer.observe(el);

    handleScroll();

    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`${className} flex w-full max-w-[1170px] flex-col px-4 lg:px-0`}
    >
      {/* Category */}
      <div
        className={`flex items-center gap-4 ${
          !heading ? "mb-10 lg:mb-[60px]" : ""
        }`}
      >
        <div className="h-8 w-2 rounded bg-[#DB4444] lg:h-10 lg:w-5" />

        <span className="font-poppins text-sm font-semibold text-[#DB4444] lg:text-base">
          {category}
        </span>
      </div>

      {/* Heading + Actions */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-[31px]">
        {heading && (
          <h3 className="font-inter text-2xl font-semibold text-black dark:text-white/90 leading-tight sm:text-3xl lg:mt-6 lg:text-4xl">
            {heading}
          </h3>
        )}

        <div className="ml-auto flex items-center gap-2">
          {arrows && (
            <>
              <button
                onClick={scrollLeft}
                disabled={isAtStart}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-[#E5E5E5] active:scale-95 disabled:cursor-not-allowed disabled:opacity-20 lg:h-[46px] lg:w-[46px]"
              >
                <img
                  src={leftArrowImg}
                  alt="left arrow"
                  className="w-4 lg:w-auto"
                />
              </button>

              <button
                onClick={scrollRight}
                disabled={isAtEnd}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-[#E5E5E5] active:scale-95 disabled:cursor-not-allowed disabled:opacity-20 lg:h-[46px] lg:w-[46px]"
              >
                <img
                  src={rightArrowImg}
                  alt="right arrow"
                  className="w-4 lg:w-auto"
                />
              </button>
            </>
          )}

          {button}
        </div>
      </div>

      {/* Products */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`${styles.hiddenScrollbar} flex w-full gap-4 overflow-x-auto overflow-y-hidden scroll-smooth lg:gap-[30px]`}
      >
        {children}
      </div>
    </section>
  );
}
