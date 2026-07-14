import { Outlet } from "react-router";
import { TopHeader } from "../Elements";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} limit={3} />
      <div className="relative min-h-screen bg-white dark:bg-neutral-900">
        <TopHeader />

        <div className="sticky top-0 z-50">
          <Header />
        </div>

        <main className="mx-auto max-w-[1170px]">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
