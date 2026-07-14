import { useEffect, useState } from "react";

type CounterDownPropsTypes = {
  className?: string;
  initialSeconds?: number;
  variant: "primary" | "secondary";
};

export default function CounterDown({
  className = "",
  initialSeconds = 3 * 24 * 60 * 60 + 23 * 60 * 60 + 19 * 60 + 20,
  variant = "primary",
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

  const format = (n: number) => String(n).padStart(2, "0");

  return variant === "primary" ? (
    <div className={`${className} flex items-end gap-4`}>
      <TimeBlock label="Days" value={format(days)} variant="primary"/>
      <span className="text-3xl font-bold text-[#DB4444]">:</span>
      <TimeBlock label="Hours" value={format(hours)} variant="primary"/>
      <span className="text-3xl font-bold text-[#DB4444]">:</span>
      <TimeBlock label="Minutes" value={format(minutes)} variant="primary"/>
      <span className="text-3xl font-bold text-[#DB4444]">:</span>
      <TimeBlock label="Seconds" value={format(seconds)} variant="primary"/>
    </div>
  ) : (
    <div className="flex gap-6 mb-10">
      <TimeBlock label="Days" value={format(days)} variant="secondary" />
      <TimeBlock label="Hours" value={format(hours)} variant="secondary" />
      <TimeBlock label="Minutes" value={format(minutes)} variant="secondary" />
      <TimeBlock label="Seconds" value={format(seconds)} variant="secondary" />
    </div>
  );
}

function TimeBlock({ label, value, variant }: { label: string; value: string; variant: "primary" | "secondary" }) {
  return variant === "primary" ? (
    <div className="flex flex-col gap-1">
      <span className="font-poppins text-xs font-medium leading-[18px]">
        {label}
      </span>
      <span className="font-inter text-[32px] font-bold leading-7 tracking-[10%]">
        {value}
      </span>
    </div>
  ) : (
    <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
      <span className="font-poppins font-semibold text-base leading-[20px]">{value}</span>
      <span className="text-[11px] leading-[18px] font-poppins">{label}</span>
    </div>
  );
}
