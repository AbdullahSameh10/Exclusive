import { Link, useLocation } from "react-router";
import { useRouteTransition } from "../../Hooks";

export default function CartIcon() {
  const { pathname } = useLocation();
  const transition = useRouteTransition();

  const isCartPage = pathname === "/cart";

  const handleNavigate = () => {
    transition.start();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const activeClass = (active: string, inactive: string) =>
    `
      transition-all
      duration-300

      ${isCartPage ? active : inactive}
    `;

  return (
    <Link
      to="/cart"
      aria-label="Go to cart"
      onClick={handleNavigate}
      className="group flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-90"
    >
      <svg
        viewBox="0 0 128 150"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="h-8 w-6 sm:h-9 sm:w-7"
      >
        {/* Handle */}
        <path
          d="M22 26c12 0 18 6 24 18"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            activeClass(
              "stroke-[#DB4444]",
              `stroke-black group-hover:stroke-[#DB4444] dark:stroke-white/90 dark:group-hover:stroke-[#DB4444] `,
            ) + " stroke-[8]"
          }
        />

        {/* Basket */}
        <path
          d="M46 44h68l-10 42H56z"
          strokeLinejoin="round"
          className={
            activeClass(
              `fill-[#c6dbff] stroke-[#c6dbff] `,
              `fill-transparent stroke-black group-hover:fill-[#c6dbff] group-hover:stroke-[#c6dbff] dark:stroke-white/90 `,
            ) + " stroke-[6]"
          }
        />

        {/* Basket grid vertical */}
        <path
          d="M62 44v42M80 44v42M98 44v42"
          className={
            activeClass(
              "stroke-[#9bb8e8]",
              `stroke-black/40 group-hover:stroke-[#9bb8e8] dark:stroke-white/40 `,
            ) + " stroke-[4]"
          }
        />

        {/* Basket grid horizontal */}
        <path
          d="M56 58h54M54 72h58"
          className={
            activeClass(
              "stroke-[#9bb8e8]",
              `stroke-black/40 group-hover:stroke-[#9bb8e8] dark:stroke-white/40 `,
            ) + " stroke-[4]"
          }
        />

        {/* Bottom curve */}
        <path
          d="M56 86c-8 12-24 16-24 30h72"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            activeClass(
              "stroke-[#c6dbff]",
              `stroke-black group-hover:stroke-[#c6dbff] dark:stroke-white/90 `,
            ) + " stroke-[8]"
          }
        />

        {/* Left wheel */}
        <circle
          cx="46"
          cy="135"
          r="8"
          className={
            activeClass(
              `fill-[#3b5b8a] stroke-[#3b5b8a] `,
              `fill-transparent stroke-black group-hover:fill-[#3b5b8a] group-hover:stroke-[#3b5b8a] dark:stroke-white/90 `,
            ) + " stroke-[6]"
          }
        />

        {/* Right wheel */}
        <circle
          cx="88"
          cy="135"
          r="8"
          className={
            activeClass(
              `fill-[#3b5b8a] stroke-[#3b5b8a] `,
              `fill-transparent stroke-black group-hover:fill-[#3b5b8a] group-hover:stroke-[#3b5b8a] dark:stroke-white/90 `,
            ) + " stroke-[6]"
          }
        />
      </svg>
    </Link>
  );
}
