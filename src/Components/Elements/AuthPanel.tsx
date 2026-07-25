type Props = {
  show: boolean;
  side: "left" | "right";
  children: React.ReactNode;
};

export default function AuthPanel({ show, side, children }: Props) {
  const base = `
    absolute
    inset-0
    lg:inset-y-0
    lg:w-1/2
    flex
    flex-col
    overflow-hidden
    bg-white
    dark:bg-slate-900
    shadow-2xl
    transition-all
    duration-700
    ease-in-out
  `;

  const position =
    side === "left"
      ? show
        ? "translate-x-0 opacity-100 lg:rounded-r-[80px]"
        : "-translate-x-full opacity-0"
      : show
        ? "translate-x-0 lg:translate-x-full opacity-100 lg:rounded-l-[80px]"
        : "translate-x-full lg:translate-x-[calc(100%*2)] opacity-0";

  return <div className={`${base} ${position}`}>{children}</div>;
}
