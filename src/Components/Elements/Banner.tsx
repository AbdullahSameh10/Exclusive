import { useCallback, useEffect, useRef, useState } from "react";

const images = [
  "@Assets/Banner/banner1.png",
  "@Assets/Banner/banner2.png",
  "@Assets/Banner/banner3.png",
  "@Assets/Banner/banner4.png",
];

const colors = ["#0000FF", "#883399", "#c46d02", "#02aba5"];

const interval = 8000;


export default function Banner() {
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Auto slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = window.setInterval(() => {
      setIndex((prev) => prev + 1);
      setTransition(true);
    }, interval);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide]);

  const handleDotClick = (dotIndex: number) => {
    stopAutoSlide(); // stop auto sliding
    setTransition(true); // ensure animation
    setIndex(dotIndex + 1); // move to correct slide
    startAutoSlide(); // restart auto sliding
  };

  // Infinite loop fix
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

  // Calculate active dot (0 → images.length - 1)
  const activeDot =
    index === 0
      ? images.length - 1
      : index === extendedImages.length - 1
        ? 0
        : index - 1;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "344px",
        width: "892px",
        borderRadius: "16px",
        maxWidth: "892px",
        margin: "40px 0 0 45px",
      }}
    >
      {/* SLIDER */}
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform 0.6s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((img, i) => (
          <div key={i} style={{ minWidth: "100%", height: "344px" }}>
            <img
              src={img}
              alt={`slide-${i}`}
              style={{
                width: "892px",
                height: "344px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div
        style={{
          position: "absolute",
          bottom: "11px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.2)",
          width: "95px",
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "20px",
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
              backgroundColor:
                i === activeDot ? colors[i] : "rgba(255,255,255,0.5)",
              boxShadow: "0 0 4px rgba(0,0,0,0.6)", // optional but helps
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
