import { useContext, useRef, useState } from "react";
import { Button } from "@Elements/index";
import FormHeader from "./FormHeader";
import GoogleButton from "./GoogleButton";
import { signUp } from "@Utilities/index";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { UserContext } from "@Contexts/index";
import { useAuth } from "../Hooks";

type SignupFormProps = {
  onSwitch: () => void;
  onGoogleSignUp: () => void;
};

export default function SignupForm(props: SignupFormProps) {
  const { setUser } = useAuth();
  const { onSwitch, onGoogleSignUp } = props;

  const { setVerified } = useContext(UserContext);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!termsRef.current?.checked) {
      toast.error("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (
      !usernameRef.current?.value.trim() ||
      !emailRef.current?.value.trim() ||
      !passwordRef.current?.value.trim()
    ) {
      toast.error("One or more input fields are empty.");
      return;
    }

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);

      const firebaseUser = await signUp({
        username,
        email,
        password,
      });

      if (setUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Guest User",
          email: firebaseUser.email || "No Email Provided!",
          avatar:
            firebaseUser.photoURL ||
            "../../../src/Components/Assets/avatar.png",
          provider: firebaseUser.providerData[0]?.providerId || "password",
          phoneNumber: firebaseUser.phoneNumber,
        });
      }

      toast.success("Account created successfuly!");
      toast.info("Please verify your email then login. ( Check Spam Emails )");

      navigate("/", {
        replace: true,
      });

      setVerified(false);
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already in use. Try logging in.");
          break;

        case "auth/invalid-email":
          toast.error("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          toast.error("Password should be at least 10 characters.");
          break;

        default:
          toast.error("An error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader title="SIGN UP" />

      <form
        autoComplete="on"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 lg:px-10"
      >
        <div className="flex w-full max-w-[500px] flex-col gap-6 sm:gap-8">
          <input
            ref={usernameRef}
            placeholder="Username"
            name="username"
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-[#1B2037] dark:text-white dark:placeholder:text-gray-400"
          />

          <input
            ref={emailRef}
            placeholder="Email"
            name="new-email"
            autoComplete="new-email"
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-[#1B2037] dark:text-white dark:placeholder:text-gray-400"
          />

          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="new-password"
              autoComplete="new-password"
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

          <label className="flex cursor-pointer select-none items-start gap-3">
            <input ref={termsRef} type="checkbox" className="peer sr-only" />

            <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-gray-300 transition-all duration-200 after:scale-50 after:text-sm after:font-bold after:text-white after:opacity-0 after:transition-all after:duration-200 after:content-['✓'] peer-checked:border-violet-500 peer-checked:bg-violet-500 peer-checked:after:scale-100 peer-checked:after:opacity-100 dark:border-gray-600" />

            <span className="text-sm font-medium leading-6 text-gray-700 dark:text-gray-300">
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-[#DB4444] dark:text-violet-500 underline-offset-4 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-semibold text-[#DB4444] dark:text-violet-500 underline-offset-4 hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          <Button
            type="submit"
            disabled={loading}
            className={`h-14 rounded-xl dark:bg-violet-500 text-base transition-all dark:hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg ${loading ? "animate-pulse" : ""} `}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />

            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>

            <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
          </div>

          <GoogleButton text="Sign up with Google" onClick={onGoogleSignUp} />
        </div>
      </form>

      <p className="mb-8 px-5 text-center text-sm text-gray-600 dark:text-gray-300 sm:mb-10 sm:text-base lg:text-lg">
        Already have an account?
        <button
          type="button"
          onClick={onSwitch}
          className="ml-2 font-semibold text-[#DB4444] dark:text-violet-500 underline-offset-4 transition hover:underline"
        >
          Login
        </button>
      </p>
    </>
  );
}
