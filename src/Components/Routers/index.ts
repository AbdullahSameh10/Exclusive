import { lazy } from "react";
import { lazyWithDelay } from "../Utilities";

export const Home = lazyWithDelay(() => import("./Home"), 1000);
export const About = lazyWithDelay(() => import("./About"), 1000);
export const Contact = lazyWithDelay(() => import("./Contact"), 1000);
export const Authentication = lazyWithDelay(() => import("./Authentication"), 1000);
export const ProductDetails = lazyWithDelay(() => import("./ProductDetails"), 1000);
export const Wishlist = lazyWithDelay(() => import("./Wishlist"), 1000);
export const Cart = lazyWithDelay(() => import("./Cart"), 1000);
export const ForgotPassword = lazyWithDelay(() => import("./ForgotPassword"), 1000);
export const ManageAccount = lazyWithDelay(() => import("./Settings/ManageAccount"), 1000);
export const Products = lazyWithDelay(() => import("./Products"), 1000);
export const Checkout = lazyWithDelay(() => import("./Checkout"), 1000);
export { default as Verification } from "./Settings/Verification";
export { default as PaymentOptions } from "./Settings/PaymentOptions";
export { default as Security } from "./Settings/Security";

export const Error = lazy(() => import("./Error"));

export { default as VerifyEmail } from "./VerifyEmail";