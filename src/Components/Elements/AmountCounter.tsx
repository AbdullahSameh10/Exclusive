import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

type AmountCounterPropsTypes = {
  minAmount: number;
  maxAmount: number;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
};

export default function AmountCounter(props: AmountCounterPropsTypes) {
  const { minAmount, maxAmount, counter, setCounter } = props;

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCounter(minAmount);
  }, [minAmount]);

  const clearCounterInterval = () => {
    if (interval.current !== null) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  return (
    <div className="flex h-10 sm:h-11">
      {/* Decrease */}
      <button
        onMouseDown={() => {
          if (interval.current === null) {
            if (counter <= minAmount) {
              setCounter(minAmount);
              return;
            }

            interval.current = setInterval(() => {
              setCounter((prev) => Math.max(minAmount, prev - 1));
            }, 100);
          }
        }}
        onMouseUp={clearCounterInterval}
        onMouseLeave={clearCounterInterval}
        onClick={() => setCounter((prev) => Math.max(minAmount, prev - 1))}
        className="flex h-full w-10 items-center justify-center rounded-l-md border border-black/30 bg-white text-xl font-bold text-black transition-all duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white sm:w-11 sm:text-2xl"
      >
        −
      </button>

      {/* Counter */}
      <span className="flex h-full w-16 items-center justify-center border-y border-black/30 bg-white px-2 font-poppins text-base font-semibold tracking-[0.2em] text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white sm:w-20 sm:text-lg">
        {counter.toString().padStart(2, "0")}
      </span>

      {/* Increase */}
      <button
        onMouseDown={() => {
          if (counter >= maxAmount) {
            setCounter(maxAmount);
            return;
          }

          interval.current = setInterval(() => {
            setCounter((prev) => Math.min(maxAmount, prev + 1));
          }, 100);
        }}
        onMouseUp={clearCounterInterval}
        onMouseLeave={clearCounterInterval}
        onClick={() => setCounter((prev) => Math.min(maxAmount, prev + 1))}
        className="flex h-full w-10 items-center justify-center rounded-r-md border border-black/30 bg-white text-xl font-bold text-black transition-all duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white sm:w-11 sm:text-2xl"
      >
        +
      </button>
    </div>
  );
}
