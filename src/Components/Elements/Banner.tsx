import { useCallback, useEffect, useRef, useState } from "react";

import banner1 from "@Assets/Banner/banner1.png";
import banner2 from "@Assets/Banner/banner2.png";
import banner3 from "@Assets/Banner/banner3.png";
import banner4 from "@Assets/Banner/banner4.png";

const images = [banner1, banner2, banner3, banner4];

const colors = ["#0000FF", "#883399", "#c46d02", "#02aba5"];

const interval = 8000;

export default function Banner() {
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  /* ---------------- Auto Slide ---------------- */

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();

    intervalRef.current = window.setInterval(() => {
      setTransition(true);
      setIndex((prev) => prev + 1);
    }, interval);
  }, []);

  useEffect(() => {
    startAutoSlide();

    return stopAutoSlide;
  }, [startAutoSlide]);

  /* ---------------- Dots ---------------- */

  const handleDotClick = (dotIndex: number) => {
    stopAutoSlide();

    setTransition(true);
    setIndex(dotIndex + 1);

    startAutoSlide();
  };

  /* ---------------- Infinite Loop ---------------- */

  useEffect(() => {
    if (!sliderRef.current) return;

    const handleTransitionEnd = () => {
      if (index === extendedImages.length - 1) {
        setTransition(false);
        setIndex(1);
      }

      if (index === 0) {
        setTransition(false);
        setIndex(extendedImages.length - 2);
      }
    };

    const node = sliderRef.current;

    node.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      node.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [index, extendedImages.length]);

  /* ---------------- Active Dot ---------------- */

  const activeDot =
    index === 0
      ? images.length - 1
      : index === extendedImages.length - 1
        ? 0
        : index - 1;

  return (
    <div
      className="relative flex justify-center overflow-hidden w-[calc(100%-40px)] max-w-[892px] aspect-[892/344] rounded-2xl mt-5 mx-5 sm:mt-10 sm:mr-0 sm:ml-10"
    >
      {/* Slider */}

      <div
        ref={sliderRef}
        style={{
          display: "flex",
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform .6s ease-in-out" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        {extendedImages.map((img, i) => (
          <div
            key={i}
            style={{
              minWidth: "100%",
              height: "100%",
              flexShrink: 0,
            }}
          >
            <img
              src={img}
              alt={`slide-${i}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Dots */}

      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,

          background: "rgba(255,255,255,.2)",
          backdropFilter: "blur(6px)",

          width: "95px",
          height: "25px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",

          borderRadius: "999px",
        }}
      >
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => handleDotClick(i)}
            style={{
              width: i === activeDot ? "15px" : "10px",
              height: i === activeDot ? "15px" : "10px",
              borderRadius: "50%",
              background: i === activeDot ? colors[i] : "rgba(255,255,255,.55)",
              cursor: "pointer",
              transition: ".3s",
              boxShadow: "0 0 4px rgba(0,0,0,.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
