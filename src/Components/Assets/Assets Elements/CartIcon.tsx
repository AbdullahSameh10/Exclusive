import { Link, useLocation } from "react-router";
import { useRouteTransition } from "../../Hooks";

export default function CartIcon() {
  const { pathname } = useLocation();
  const isCartPage = pathname === "/cart";
   const transition = useRouteTransition();

  return (
    <Link
      to="/cart"
      className="group"
      onClick={() => {
        transition.start();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <svg
        viewBox="0 0 128 150"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-6 cursor-pointer"
        fill="none"
      >
        {/* Handle */}
        <path
          d="M22 26c12 0 18 6 24 18"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`stroke-[8] transition-all duration-300 ${
            isCartPage
              ? "stroke-red-500"
              : "stroke-black group-hover:stroke-red-500"
          }`}
        />

        {/* Basket */}
        <path
          d="M46 44h68l-10 42H56z"
          strokeLinejoin="round"
          className={`stroke-[6] transition-all duration-300 ${
            isCartPage
              ? "fill-[#c6dbff] stroke-[#c6dbff]"
              : "fill-transparent stroke-black group-hover:fill-[#c6dbff] group-hover:stroke-[#c6dbff]"
          }`}
        />

        {/* Basket grid */}
        <path
          d="M62 44v42M80 44v42M98 44v42"
          className={`stroke-[4] transition-all duration-300 ${
            isCartPage
              ? "stroke-[#9bb8e8]"
              : "stroke-black/40 group-hover:stroke-[#9bb8e8]"
          }`}
        />
        <path
          d="M56 58h54M54 72h58"
          className={`stroke-[4] transition-all duration-300 ${
            isCartPage
              ? "stroke-[#9bb8e8]"
              : "stroke-black/40 group-hover:stroke-[#9bb8e8]"
          }`}
        />

        {/* Bottom curve */}
        <path
          d="M56 86c-8 12-24 16-24 30h72"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`stroke-[8] transition-all duration-300 ${
            isCartPage
              ? "stroke-[#c6dbff]"
              : "stroke-black group-hover:stroke-[#c6dbff]"
          }`}
        />

        {/* Wheels */}
        <circle
          cx="46"
          cy="135"
          r="8"
          className={`stroke-[6] transition-all duration-300 ${
            isCartPage
              ? "fill-[#3b5b8a] stroke-[#3b5b8a]"
              : "fill-transparent stroke-black group-hover:fill-[#3b5b8a] group-hover:stroke-[#3b5b8a]"
          }`}
        />
        <circle
          cx="88"
          cy="135"
          r="8"
          className={`stroke-[6] transition-all duration-300 ${
            isCartPage
              ? "fill-[#3b5b8a] stroke-[#3b5b8a]"
              : "fill-transparent stroke-black group-hover:fill-[#3b5b8a] group-hover:stroke-[#3b5b8a]"
          }`}
        />
      </svg>
    </Link>
  );
}