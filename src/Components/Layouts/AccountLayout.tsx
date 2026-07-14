import { Link, Outlet, useLocation } from "react-router";
import { Breadcrumb } from "@Elements/index";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { useEffect } from "react";
import { faAddressBook, faCreditCard, faExchangeAlt, faShieldAlt, faTimesCircle, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AccountLayout() {
  const { user } = useAuth();

  const transition = useRouteTransition();

  const location = useLocation();

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mb-[140px]">
      <div className="mb-20 flex items-end justify-between">
        <Breadcrumb pages={["Home"]} links={["/"]} currentPage="My Account" />
        <span className="font-poppins text-sm font-normal">
          Welcome! <span className="text-[#DB4444]">{user?.name}</span>
        </span>
      </div>
      <div className="flex gap-[100px]">
        <div className="flex w-[200px] flex-col gap-4">
          <h2 className="font-poppins text-base font-semibold">
            Manage My Account
          </h2>
          <ul className="ml-[35px] flex flex-col gap-2">
            <li>
              <Link
                to="/account"
                className={`items-center flex gap-3 text-base text-black/50 transition duration-300 hover:text-[#DB4444] ${location.pathname === "/account" ? "!text-[#DB4444]" : ""}`}
              >
                <FontAwesomeIcon icon={faAddressBook} />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/account/payments"
                className={`items-center flex gap-3 text-base text-black/50 transition duration-300 hover:text-[#DB4444] ${location.pathname === "/account/payments" ? "!text-[#DB4444]" : ""}`}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Payment Options
              </Link>
            </li>
            <li>
              <Link
                to="/account/security"
                className={`items-center flex gap-3 text-base text-black/50 transition duration-300 hover:text-[#DB4444] ${location.pathname === "/account/security" ? "!text-[#DB4444]" : ""}`}
              >
                <FontAwesomeIcon icon={faShieldAlt} />
                Security
              </Link>
            </li>
            <li>
              <Link
                to="/account/verification"
                className={`items-center flex gap-3 text-base text-black/50 transition duration-300 hover:text-[#DB4444] ${location.pathname === "/account/verification" ? "!text-[#DB4444]" : ""}`}
              >
                <FontAwesomeIcon icon={faUserCheck} />
                Verification
              </Link>
            </li>
          </ul>
          <h2 className="font-poppins text-base font-semibold">My Orders</h2>
          <ul className="ml-[35px] flex flex-col gap-2">
            <li>
              <Link
                to="/account/returns"
                className={`items-center flex gap-3 text-base text-black/50 transition duration-300 hover:text-[#DB4444] ${location.pathname === "/account/returns" ? "!text-[#DB4444]" : ""}`}
              >
                <FontAwesomeIcon icon={faExchangeAlt} />
                My Returns
              </Link>
            </li>
            <li>
              <Link
                to="/account/cancellations"
                className={`items-center flex gap-3 text-base text-black/50 transition duration-300 hover:text-[#DB4444] ${location.pathname === "/account/cancellations" ? "!text-[#DB4444]" : ""}`}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
                My Cancellations
              </Link>
            </li>
          </ul>
          <Link
            to="/wishlist"
            className="font-poppins text-base font-semibold"
            onClick={() => {
              transition.start();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            My WishList
          </Link>
        </div>
        <div className="min-h-[630px] w-full flex-1 rounded-md px-20 py-10 shadow-[0_0_13px_rgba(0,0,0,0.05)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
