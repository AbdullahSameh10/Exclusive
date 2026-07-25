import { useState } from "react";
import { Button } from ".";
import FormHeader from "./FormHeader";
import GoogleButton from "./GoogleButton";
import { signIn } from "../Utilities";
import { Link, useNavigate } from "react-router";
import { useRouteTransition } from "../Hooks";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type LoginFormPropsTypes = {
  onSwitch: () => void;
  onGoogleLogin: () => void;
};

export default function LoginForm(props: LoginFormPropsTypes) {
  const { onSwitch, onGoogleLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const transition = useRouteTransition();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setError("");
    setLoading(true);

    try {
      await signIn(email, password);

      transition.start();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      navigate("/", {
        replace: true,
      });
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Incorrect email or password.");
          setError("Incorrect email or password.");
          break;

        case "auth/invalid-email":
          toast.error("Please enter a valid email address.");
          setError("Please enter a valid email address.");
          break;

        case "auth/missing-password":
          toast.error("Password Field Is Empty !");
          setError("Password Field is Required.");
          break;

        case "auth/user-disabled":
          toast.error(
            "This account has been disabled. Please contact support.",
          );
          setError("This account has been disabled. Please contact support.");
          break;

        case "auth/too-many-requests":
          toast.error(
            "Too many failed login attempts. Please try again later.",
          );
          setError("Too many failed login attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          toast.error("Network error. Please check your internet connection.");
          setError("Network error. Please check your internet connection.");
          break;

        default:
          toast.error(error.message);
          setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader title="LOGIN" />

      <form
        onSubmit={handleLogin}
        autoComplete="on"
        className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 lg:px-10"
      >
        <div className="flex w-full max-w-[500px] flex-col gap-6 sm:gap-8 lg:gap-10">
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-[#1B2037] dark:text-white dark:placeholder:text-gray-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="current-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3.5 pr-12 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-[#1B2037] dark:text-white dark:placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-violet-500 dark:text-gray-400"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              onClick={() => {
                transition.start();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="font-medium text-[#DB4444] dark:text-violet-500 underline-offset-4 transition hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`h-14 rounded-xl dark:bg-violet-500 text-base transition-all dark:hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg ${loading ? "animate-pulse" : ""} `}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />

            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>

            <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
          </div>

          <GoogleButton text="Login with Google" onClick={onGoogleLogin} />
        </div>
      </form>

      <p className="mb-8 px-5 text-center text-sm text-gray-600 dark:text-gray-300 sm:mb-10 sm:text-base lg:text-lg">
        Don’t have an account?
        <button
          type="button"
          onClick={onSwitch}
          className="ml-2 font-semibold text-[#DB4444] dark:text-violet-500 underline-offset-4 transition hover:underline"
        >
          Sign up
        </button>
      </p>
    </>
  );
}
