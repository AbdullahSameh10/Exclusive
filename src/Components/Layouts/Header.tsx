import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Button, SearchBar } from "@Elements/index";
import { CartIcon, WishlistIcon } from "@Assets/Assets Elements";
import styles from "@/styles.module.css";
import { useRouteTransition } from "@Hooks/index";
import { signOut } from "firebase/auth";
import { auth } from "@Authentication/firebase";
import { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "@Hooks/index";
import { UserContext } from "@Contexts/index";
import {
  Menu,
  X,
  Moon,
  Sun,
  User,
  LogIn,
  LogOut,
  Package,
  CircleX,
} from "lucide-react";

import avatar from "@Assets/Avatar.png";

export default function Header() {
  const location = useLocation();
  const transition = useRouteTransition();
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const { userWishlist, userCart } = useContext(UserContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const isAuthPage = location.pathname === "/auth";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

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
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-900/95">
        <div className="mx-auto flex h-20 max-w-[1170px] items-center justify-between px-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800 lg:hidden"
            >
              <Menu size={26} className="text-black dark:text-white/90"/>
            </button>

            <Link
              to="/"
              className={`${styles["text-3D-red-500"]} text-2xl md:text-3xl`}
              onClick={() => {
                transition.start();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Exclusive
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10 text-sm">
              {["/", "/products", "/contact", "/about"].map((path, i) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `relative transition duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#DB4444] after:transition-all after:duration-300 ${
                        isActive
                          ? "font-semibold text-[#DB4444] after:w-full"
                          : "text-black after:w-0 hover:text-[#DB4444] hover:after:w-full dark:text-white"
                      }`
                    }
                    onClick={() => {
                      transition.start();
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {["Home", "Products", "Contact", "About"][i]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden xl:block">
              <SearchBar />
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {darkMode ? (
                <Sun size={22} className="text-yellow-400" />
              ) : (
                <Moon size={22} className="text-neutral-700 dark:text-white" />
              )}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-neutral-800"
              onClick={() => {
                transition.start();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <WishlistIcon productId="Header" navigating />

              {userWishlist.length > 0 && (
                <div className="pointer-events-none absolute right-1 top-1">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#DB4444]/60" />

                  <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-[#DB4444] text-[10px] font-bold text-white">
                    {userWishlist.length > 99 ? "99+" : userWishlist.length}
                  </span>
                </div>
              )}
            </Link>

            {/* Cart */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-neutral-800">
              <CartIcon />

              {userCart.length > 0 && (
                <div className="pointer-events-none absolute right-1 top-1">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#DB4444]/60" />

                  <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-[#DB4444] text-[10px] font-bold text-white">
                    {new Set(userCart).size > 99
                      ? "99+"
                      : new Set(userCart).size}
                  </span>
                </div>
              )}
            </div>
            {/* ================= Desktop Authentication ================= */}
            {!loading &&
              (user ? (
                <div ref={dropdownRef} className="relative hidden lg:block">
                  {/* Avatar */}
                  <img
                    src={user.avatar || avatar}
                    alt="avatar"
                    onClick={() => setOpen(!open)}
                    className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-200 object-cover transition hover:border-[#DB4444] dark:border-neutral-700"
                  />

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-900 ${
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <DropdownItem
                      icon={<User size={18} />}
                      text="Manage My Account"
                      onClick={() => {
                        transition.start();
                        navigate("/account");
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        setOpen(false);
                      }}
                    />

                    <DropdownItem
                      icon={<Package size={18} />}
                      text="My Orders"
                      onClick={() => {
                        transition.start();
                        navigate("/account/orders");
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        setOpen(false);
                      }}
                    />

                    <DropdownItem
                      icon={<CircleX size={18} />}
                      text="My Cancellations"
                      onClick={() => {
                        transition.start();
                        navigate("/account/cancellations");
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        setOpen(false);
                      }}
                    />

                    <div className="border-t border-gray-200 dark:border-neutral-700" />

                    <DropdownItem
                      icon={<LogOut size={18} />}
                      text="Logout"
                      onClick={handleLogout}
                    />
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden lg:block"
                  onClick={() => {
                    transition.start();
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <Button
                    className={`rounded-full border-2 !border-[#DB4444] bg-transparent px-5 py-2 text-sm !text-[#DB4444] transition hover:!bg-[#DB4444] hover:!text-white ${
                      isAuthPage && "!bg-[#DB4444] !text-white"
                    }`}
                  >
                    Login
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </header>
      {/* ================= Overlay ================= */}

      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition duration-300 lg:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* ================= Drawer ================= */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-80 flex-col bg-white shadow-2xl transition-transform duration-500 ease-in-out dark:bg-neutral-900 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}

        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-black dark:text-white/90">
            Menu
          </h2>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <X size={24} className="text-black dark:text-white/90" />
          </button>
        </div>

        {/* Search */}

        <div className="border-b border-gray-200 p-4 dark:border-neutral-700">
          <SearchBar />
        </div>

        {/* Navigation */}

        <nav className="flex h-full flex-1 flex-col justify-between overflow-y-auto py-4">
          <ul className="space-y-2 px-4">
            {["/", "/products", "/contact", "/about"].map((path, i) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => {
                    transition.start();
                    setMobileMenuOpen(false);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-black transition dark:text-white/90 ${
                      isActive
                        ? "bg-[#DB4444] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`
                  }
                >
                  {["Home", "Products", "Contact", "About"][i]}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* ---------------- Mobile Account ---------------- */}

          <div className="mt-6 border-t border-gray-200 px-4 pt-6 dark:border-neutral-700">
            {!loading &&
              (user ? (
                <>
                  {/* User Info */}

                  <div className="mb-6 flex items-center gap-3">
                    <img
                      src={user.avatar || avatar}
                      alt="Avatar"
                      className="h-14 w-14 rounded-full border object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-500 dark:text-neutral-400">
                        {user.name || "User"}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-neutral-400">
                        {user.email.length > 25
                          ? user.email.slice(0, 25) + "..."
                          : user.email}
                      </p>
                    </div>
                  </div>

                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DB4444] px-4 py-3 font-medium text-white transition hover:bg-[#c73434]"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => {
                      transition.start();
                      setMobileMenuOpen(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Button className="flex w-full items-center justify-center gap-2">
                      <LogIn size={18} />
                      Login
                    </Button>
                  </Link>
                </>
              ))}
          </div>
        </nav>
      </aside>
    </>
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
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-[#DB4444] dark:text-gray-200 dark:hover:bg-neutral-800 dark:hover:text-[#DB4444]"
    >
      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>

      <span>{text}</span>
    </button>
  );
}
