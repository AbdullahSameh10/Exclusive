import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Button, SearchBar } from "@Elements/index";
import { CartIcon, WishlistIcon } from "../Assets/Assets Elements";
import styles from "@/styles.module.css";
import {useRouteTransition} from "@Hooks/index";
import { signOut } from "firebase/auth";
import { auth } from "@Authentication/firebase";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@Hooks/index";

import avatar from "@Assets/Avatar.png";

export default function Header() {
  const location = useLocation();
  const transition = useRouteTransition();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthPage = location.pathname === "/auth";

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    transition.start();
    navigate("/", { replace: true });
    setTimeout(async () => {
      await signOut(auth);
    }, 1000);
    setOpen(false);
  };

  return (
    <header className="z-50 w-full border-b-[0.5px] border-black border-opacity-30 bg-white pb-4 pt-10 dark:border-gray-500 dark:border-opacity-30 dark:bg-neutral-900">
      <div className="mx-auto flex h-[38px] max-w-[1170px] items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className={`${styles["text-3D-red-500"]} cursor-pointer`}
          onClick={() => {
            transition.start();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Exclusive
        </Link>

        {/* NAV */}
        <nav>
          <ul className="flex items-center gap-12 text-sm font-normal">
            {["/", "/contact", "/about"].map((path, i) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `relative leading-6 transition-colors duration-300 ${isActive ? "text-[#DB4444]" : "text-black dark:text-white"}`
                  }
                  onClick={() => {
                    transition.start();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {["Home", "Contact", "About"][i]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <SearchBar />
          <Link
            to="/wishlist"
            onClick={() => {
              transition.start();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="h-8"
          >
            <WishlistIcon productId="Header" navigating />
          </Link>
          <CartIcon />

          {/* AUTH */}
          {!loading &&
            (user ? (
              <div className="relative" ref={dropdownRef}>
                {/* AVATAR */}
                <img
                  src={user.avatar || avatar}
                  className="h-10 w-10 cursor-pointer rounded-full border object-cover"
                  onClick={() => setOpen(!open)}
                />

                {/* DROPDOWN */}
                <div
                  className={`absolute right-0 z-50 mt-3 w-[224px] overflow-hidden rounded-md border border-white/10 bg-black/40 text-white shadow-2xl backdrop-blur-[25px] transition-all duration-200 ease-out ${
                    open
                      ? "pointer-events-auto h-[200px]"
                      : "pointer-events-none h-0 opacity-0"
                  }`}
                >
                  <DropdownItem
                    icon="👤"
                    text="Manage My Account"
                    onClick={() => {
                      transition.start();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/account", { replace: true });

                      setOpen(false);
                    }}
                  />
                  <DropdownItem
                    icon="📦"
                    text="My Orders"
                    onClick={() => {
                      transition.start();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/account/orders", { replace: true });
                      setOpen(false);
                    }}
                  />
                  <DropdownItem
                    icon="❌"
                    text="My Cancellations"
                    onClick={() => {
                      transition.start();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/account/cancellations", { replace: true });
                      setOpen(false);
                    }}
                  />
                  <DropdownItem
                    icon="⭐"
                    text="My Reviews"
                    onClick={() => {
                      transition.start();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/account/reviews", { replace: true });
                      setOpen(false);
                    }}
                  />

                  <div className="my-2 h-px bg-white/20" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-white/10"
                  >
                    <span>↩</span>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Button
                  className={`rounded-full !border-4 !border-solid !border-[#DB4444] bg-transparent px-3 py-[5px] text-sm !text-[#DB4444] hover:!bg-[#DB4444] hover:!text-[#FAFAFA] ${isAuthPage && "!bg-[#DB4444] !text-[#FAFAFA]"}`}
                >
                  Login
                </Button>
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */
type Props = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

function DropdownItem({ icon, text, onClick }: Props) {
  return (
    <button
      className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-white/10"
      onClick={onClick}
    >
      <span>{icon}</span>
      {text}
    </button>
  );
}
