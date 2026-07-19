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

  return (
    <div className="flex h-full">
      <button
        onMouseDown={() => {
          if (interval.current === null) {
            interval.current = setInterval(() => {
              setCounter((prev) => Math.max(minAmount, prev - 1));
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
        onClick={() => setCounter((prev) => Math.max(minAmount, prev - 1))}
        className="h-10 w-10 rounded-[6px_0_0_6px] border border-black/50 text-3xl font-bold transition-colors duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white"
      >
        -
      </button>
      <span className="flex h-10 w-20 tracking-widest items-center justify-center border-y border-black/50 font-poppins text-xl font-bold">
        {counter.toString().padStart(2, "0")}
      </span>
      <button
        onMouseDown={() => {
          interval.current = setInterval(() => {
            setCounter((prev) => Math.min(maxAmount, prev + 1));
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
        onClick={() => setCounter((prev) => Math.min(maxAmount, prev + 1))}
        className="h-10 w-10 rounded-[0_6px_6px_0] border border-black/50 text-3xl font-bold transition-colors duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white"
      >
        +
      </button>
    </div>
  );
}
