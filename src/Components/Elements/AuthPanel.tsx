type Props = {
  show: boolean;
  side: "left" | "right";
  children: React.ReactNode;
};

export default function AuthPanel({ show, side, children }: Props) {
  const base =
    "absolute flex h-full w-1/2 flex-col overflow-hidden bg-white shadow-2xl transition-all duration-700 ease-in-out";

  const position =
    side === "left"
      ? show
        ? "translate-x-0 opacity-100 rounded-r-[80px]"
        : "-translate-x-full opacity-0"
      : show
        ? "translate-x-full opacity-100 rounded-l-[80px]"
        : "translate-x-[calc(100%*2)] opacity-0";

  return <div className={`${base} ${position}`}>{children}</div>;
}
