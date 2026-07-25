import { useEffect, useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Authentication/firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useRouteTransition } from "../Hooks";

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const transition = useRouteTransition();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value.trim();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      toast.success("Password reset email has been sent.");

      transition.start();
      window.scrollTo({ top: 0, behavior: "smooth" });

      navigate("/auth", { replace: true });
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email.");
          break;

        case "auth/too-many-requests":
          toast.error("Too many requests. Try again later.");
          break;

        default:
          toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-lg dark:border-gray-700 dark:bg-[#161B2F] sm:p-8"
      >
        <div className="flex flex-col gap-3">
          <h1 className="font-inter text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h1>

          <p className="font-poppins text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-[#1B2037] dark:text-white dark:placeholder:text-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-14 rounded-xl bg-violet-500 text-base font-semibold text-white transition-all duration-300 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link
            to="/auth"
            onClick={() => {
              transition.start();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="text-center text-sm font-medium text-violet-500 transition-colors duration-300 hover:underline dark:text-violet-400"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
