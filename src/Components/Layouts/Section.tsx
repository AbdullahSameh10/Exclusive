import { useEffect, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";
import rightArrowImg from "@Assets/right arrow.svg";
import leftArrowImg from "@Assets/left arrow.svg";

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
    <section className={`${className} flex max-w-[1170px] flex-col`}>
      <div className={`flex items-center gap-4 ${!heading && "mb-[60px]"}`}>
        <div className="h-10 w-5 rounded-[4px] bg-[#DB4444]" />
        <span className="font-poppins text-base font-semibold text-[#DB4444]">
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {heading && (
          <h3 className="mb-[31px] mt-6 font-inter text-4xl font-semibold">
            {heading}
          </h3>
        )}

        {arrows && (
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-[#E5E5E5] active:scale-95 disabled:cursor-not-allowed disabled:opacity-20"
              disabled={isAtStart}
            >
              <img
                src={leftArrowImg}
                alt="left arrow"
              />
            </button>

            <button
              onClick={scrollRight}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-[#E5E5E5] active:scale-95 disabled:cursor-not-allowed disabled:opacity-20"
              disabled={isAtEnd}
            >
              <img
                src={rightArrowImg}
                alt="right arrow"
              />
            </button>
          </div>
        )}

        {button}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex w-full gap-[30px] overflow-hidden scroll-smooth"
      >
        {children}
      </div>
    </section>
  );
}
