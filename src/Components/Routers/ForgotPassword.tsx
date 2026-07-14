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
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-[420px] flex-col gap-4 rounded-xl bg-[#F9FAFB] p-8 shadow-md"
      >
        <h1 className="text-3xl font-bold">Forgot Password</h1>

        <p className="text-gray-500">
          Enter your email and we'll send you a password reset link.
        </p>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border bg-white px-4 py-[13px] outline-none transition duration-200 focus:border focus:border-[#44a9db] focus:ring-2 focus:ring-[#44a9db40]"
        />

        <button
          disabled={loading}
          type="submit"
          className="h-14 rounded-xl bg-[#4F46E5] text-white transition-colors duration-300 hover:bg-[#4338CA] disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <Link
          to="/auth"
          onClick={() => {
            transition.start();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-center text-sm text-[#6366F1] transition-colors duration-300 hover:underline focus:text-[#818CF8]"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
}
