import { useEffect, useState } from "react";

type CounterDownPropsTypes = {
  className?: string;
  initialSeconds?: number;
  variant: "primary" | "secondary";
};

export default function CounterDown({
  className = "",
  initialSeconds = 3 * 24 * 60 * 60 + 23 * 60 * 60 + 19 * 60 + 20,
  variant,
}: CounterDownPropsTypes) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const days = Math.floor(secondsLeft / (24 * 60 * 60));
  const hours = Math.floor((secondsLeft / (60 * 60)) % 24);
  const minutes = Math.floor((secondsLeft / 60) % 60);
  const seconds = secondsLeft % 60;

  const format = (value: number) => value.toString().padStart(2, "0");

  if (variant === "primary") {
    return (
      <div
        className={`${className} flex flex-wrap items-end gap-2 sm:gap-3 lg:flex-nowrap lg:gap-4`}
      >
        <TimeBlock label="Days" value={format(days)} variant="primary" />

        <Separator />

        <TimeBlock label="Hours" value={format(hours)} variant="primary" />

        <Separator />

        <TimeBlock label="Minutes" value={format(minutes)} variant="primary" />

        <Separator />

        <TimeBlock label="Seconds" value={format(seconds)} variant="primary" />
      </div>
    );
  }

  return (
    <div
      className={`${className} mb-8 flex flex-wrap gap-3 sm:gap-4 lg:mb-10 lg:gap-6`}
    >
      <TimeBlock label="Days" value={format(days)} variant="secondary" />

      <TimeBlock label="Hours" value={format(hours)} variant="secondary" />

      <TimeBlock label="Minutes" value={format(minutes)} variant="secondary" />

      <TimeBlock label="Seconds" value={format(seconds)} variant="secondary" />
    </div>
  );
}

function Separator() {
  return (
    <span className="pb-1 text-xl font-bold text-[#DB4444] sm:text-2xl lg:text-3xl">
      :
    </span>
  );
}

type TimeBlockProps = {
  label: string;
  value: string;
  variant: "primary" | "secondary";
};

function TimeBlock({ label, value, variant }: TimeBlockProps) {
  if (variant === "primary") {
    return (
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <span className="font-poppins text-[10px] font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400 sm:text-xs">
          {label}
        </span>

        <span className="font-inter text-2xl font-bold leading-none tracking-wider text-neutral-900 dark:text-white sm:text-[28px] lg:text-[32px]">
          {value}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-300 dark:bg-neutral-800 sm:h-14 sm:w-14 lg:h-[62px] lg:w-[62px]">
      <span className="font-poppins text-sm font-semibold text-black dark:text-white sm:text-[15px] lg:text-base">
        {value}
      </span>

      <span className="font-poppins text-[9px] text-neutral-600 dark:text-neutral-400 sm:text-[10px] lg:text-[11px]">
        {label}
      </span>
    </div>
  );
}
