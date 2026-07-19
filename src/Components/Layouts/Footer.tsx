import { Link } from "react-router";
import styled from "styled-components";
import {useRouteTransition} from "@Hooks/index";

const StyledRow = styled.div`
  font-family: Poppins, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledH4 = styled.h4`
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  color: #fafafa;
`;
import sendIcon from "@Assets/Footer/icon-send.svg";
import QRCodeImg from "@Assets/Footer/Qr Code.svg";
import googlePlayIcon from "@Assets/Footer/downloadGooglePlay.svg";
import appStoreIcon from "@Assets/Footer/downloadAppStore.svg";
import facebookIcon from "@Assets/Footer/facebook.svg";
import twitterIcon from "@Assets/Footer/twitter.svg";
import instagramIcon from "@Assets/Footer/instagram.svg";
import linkedInIcon from "@Assets/Footer/linkedin.svg";

export default function Footer() {
  const transition = useRouteTransition();
  return (
    <footer className="max-h-fit min-h-[440px] bg-black">
      <div className="mx-auto mb-[60px] flex max-w-[1170px] flex-wrap gap-[87px] pt-20 text-[#a7a7a7]">
        <StyledRow className="max-w-[217px]">
          <h3 className="font-inter text-2xl font-bold leading-6 text-[#FAFAFA]">
            Exclusive
          </h3>
          <StyledH4>Subscribe</StyledH4>
          <div className="flex flex-col gap-4">
            <p className="font-normal leading-6">
              Get 10% off your first order
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                id="footerEmail"
                name="footerEmail"
                className="h-[48px] w-[217px] rounded-[4px] border-[1.5px] border-white bg-transparent py-3 pl-4 pr-12"
              />
              <button className="absolute right-[15px] top-3 h-6 w-6">
                <img src={sendIcon} alt="send" />
              </button>
            </div>
          </div>
        </StyledRow>
        <StyledRow className="max-w-[175px]">
          <StyledH4 className="text-xl font-medium">Support</StyledH4>
          <div className="flex flex-col gap-4">
            <p className="font-normal leading-6">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="font-normal leading-6">
              <a
                href="mailto:exclusive@gmail.com"
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                exclusive@gmail.com
              </a>
            </p>
            <p className="font-normal leading-6">
              <a
                href="tel:+88015-88888-9999"
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                +88015-88888-9999
              </a>
            </p>
          </div>
        </StyledRow>
        <StyledRow className="w-[123px]">
          <StyledH4 className="text-xl font-medium">Account</StyledH4>
          <ul className="flex flex-col gap-4 font-normal">
            <li>
              <Link
                to="/account"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="/auth"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Login / Register
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Shop
              </Link>
            </li>
          </ul>
        </StyledRow>
        <StyledRow className="w-[109px]">
          <StyledH4 className="text-xl font-medium">Quick Link</StyledH4>
          <ul className="flex flex-col gap-4 font-normal">
            <li>
              <Link
                to="/"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  transition.start();
                  window.scrollTo({ top: 0 });
                }}
                className="transition-colors duration-300 hover:text-[#DB4444]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </StyledRow>
        <StyledRow className="max-w-[198px] !gap-0">
          <StyledH4 className="mb-6">Download App</StyledH4>
          <p className="text-xs font-medium leading-[18px]">
            Save $3 with App New User Only
          </p>
          <div className="mb-6 mt-2 flex gap-2">
            <img src={QRCodeImg} alt="qr code image" className="h-20 w-20" />
            <div className="flex flex-col gap-1">
              <button className="h-10 transition-transform duration-300 hover:scale-105">
                <img
                  src={googlePlayIcon}
                  alt="download app from google play btn"
                />
              </button>
              <button className="h-10 transition-transform duration-300 hover:scale-105">
                <img src={appStoreIcon} alt="download app from app store btn" />
              </button>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="#">
              <img src={facebookIcon} alt="facebook icon" />
            </a>
            <a href="#">
              <img src={twitterIcon} alt="twitter icon" />
            </a>
            <a href="#">
              <img src={instagramIcon} alt="instagram icon" />
            </a>
            <a href="#">
              <img src={linkedInIcon} alt="linkedin icon" />
            </a>
          </div>
        </StyledRow>
      </div>
      <div className="w-full border-t border-[#ffffff16] pb-6 pt-4">
        <p className="text-center text-[#ffffff22]">
          <i className="text-xl">&copy;</i> Copyright Abdullah 2026. All right
          reserved
        </p>
      </div>
    </footer>
  );
}
