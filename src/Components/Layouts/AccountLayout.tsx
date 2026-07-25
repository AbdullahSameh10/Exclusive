import { Link, Outlet, useLocation } from "react-router";
import { Breadcrumb } from "@Elements/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { useEffect } from "react";
import {
  faAddressBook,
  faCreditCard,
  faShieldAlt,
  faTimesCircle,
  faTruckArrowRight,
  faUserCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AccountLayout() {
  const { user } = useAuth();

  const transition = useRouteTransition();

  const location = useLocation();

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [transition]);

  const navLinkClass = (path: string) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
        : "text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-400"
    }`;

  return (
    <div className="mb-20 lg:mb-32">
      {/* ================= Header ================= */}
      <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <Breadcrumb pages={["Home"]} links={["/"]} currentPage="My Account" />

        <div className="rounded-2xl mx-4 border border-zinc-200 bg-white px-5 py-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-poppins text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back,
          </p>

          <h2 className="mt-1 text-xl font-bold text-red-600 dark:text-red-400">
            {user?.name.split(" ")[0]} {user?.name.split(" ")[2]}
          </h2>
        </div>
      </div>

      {/* ================= Layout ================= */}
      <div className="flex flex-col mx-4 gap-8 lg:flex-row lg:gap-10 xl:gap-14">
        {/* ================= Sidebar ================= */}
        <aside className="w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 lg:w-[300px] lg:shrink-0">
          <div className="space-y-8">
            {/* Account */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                Manage My Account
              </h2>

              <ul className="space-y-2">
                <li>
                  <Link to="/account" className={navLinkClass("/account")}>
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className="w-5 text-base"
                    />
                    <span>My Profile</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account/payments"
                    className={navLinkClass("/account/payments")}
                  >
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="w-5 text-base"
                    />
                    <span>Payment Options</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account/security"
                    className={navLinkClass("/account/security")}
                  >
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="w-5 text-base"
                    />
                    <span>Security</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account/verification"
                    className={navLinkClass("/account/verification")}
                  >
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      className="w-5 text-base"
                    />
                    <span>Verification</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Orders */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                My Orders
              </h2>

              <ul className="space-y-2">
                <li>
                  <Link
                    to="/account/orders"
                    className={navLinkClass("/account/orders")}
                  >
                    <FontAwesomeIcon
                      icon={faTruckArrowRight}
                      className="w-5 text-base"
                    />
                    <span>My Orders</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account/cancellations"
                    className={navLinkClass("/account/cancellations")}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="w-5 text-base"
                    />
                    <span>My Cancellations</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              onClick={() => {
                transition.start();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-3 rounded-2xl border border-red-500 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faHeart} />
              <span>My Wishlist</span>
            </Link>
          </div>
        </aside>
        {/* ================= Content ================= */}
        <main className="min-h-[650px] flex-1 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-900 sm:p-8 lg:p-10 xl:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}