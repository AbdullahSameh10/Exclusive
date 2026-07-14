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
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/", { replace: true });
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
        className="flex flex-1 items-center justify-center px-10"
        autoComplete="on"
      >
        <div className="flex w-full max-w-[800px] flex-col gap-10">
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            className="w-full rounded-lg border bg-[#F5F5F5] px-4 py-[13px] outline-none transition duration-200 focus:border focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB444440]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="current-password"
              autoComplete="current-password"
              className="w-full rounded-lg border bg-[#F5F5F5] px-4 py-[13px] outline-none transition duration-200 focus:border focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB444440]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex items-center justify-end text-sm">
            <Link
              to="/forgot-password"
              onClick={() => {
                transition.start();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-medium text-[#DB4444] underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className={`h-14 rounded-xl text-lg ${loading ? "animate-pulse" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <GoogleButton text="Login with Google" onClick={onGoogleLogin} />
        </div>
      </form>

      <p className="mb-10 text-center text-lg">
        Don’t have an account?
        <button
          type="button"
          onClick={onSwitch}
          className="ml-2 font-semibold text-[#DB4444] underline-offset-4 hover:underline"
        >
          Sign up
        </button>
      </p>
    </>
  );
}
