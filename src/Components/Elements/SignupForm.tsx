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
      const firebaseUser = await signUp({ username, email, password });
      if (setUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Guest User",
          email: firebaseUser.email || "No Email Provided!",
          avatar: firebaseUser.photoURL || "../../../src/Components/Assets/avatar.png",
          provider: firebaseUser.providerData[0]?.providerId || "password",
          phoneNumber: firebaseUser.phoneNumber,
        });
      }
      toast.success("Account created successfuly!");
      toast.info("Please verify your email then login. ( Check Spam Emails )");
      navigate("/", { replace: true });
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
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="flex flex-1 items-center justify-center px-12"
        autoComplete="on"
      >
        <div className="flex w-full max-w-[500px] flex-col gap-8">
          <input
            placeholder="Username"
            name="username"
            className="w-full rounded-lg border bg-[#F5F5F5] px-4 py-[13px] outline-none transition duration-200 focus:border focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB444440]"
            ref={usernameRef}
          />
          <input
            placeholder="Email"
            name="new-email"
            autoComplete="new-email"
            className="w-full rounded-lg border bg-[#F5F5F5] px-4 py-[13px] outline-none transition duration-200 focus:border focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB444440]"
            ref={emailRef}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="new-password"
              autoComplete="new-password"
              className="w-full rounded-lg border bg-[#F5F5F5] px-4 py-[13px] outline-none transition duration-200 focus:border focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB444440]"
              ref={passwordRef}
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

          <label className="flex cursor-pointer select-none items-center gap-3">
            <input type="checkbox" className="peer sr-only" ref={termsRef} />
            <span className="relative flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 transition-all duration-200 after:scale-50 after:text-sm after:font-bold after:text-white after:opacity-0 after:transition-all after:duration-200 after:content-['✓'] peer-checked:border-[#DB4444] peer-checked:bg-[#DB4444] peer-checked:after:scale-100 peer-checked:after:opacity-100" />
            <span className="font-bold text-gray-700">
              I agree to the{" "}
              <a
                href="#"
                className="text-[#DB4444] underline-offset-4 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#DB4444] underline-offset-4 hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          <Button
            className={`h-14 rounded-xl text-lg ${loading ? "animate-pulse" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <GoogleButton text="Sign up with Google" onClick={onGoogleSignUp} />
        </div>
      </form>

      <p className="mb-10 text-center text-lg">
        Already have an account?
        <button
          type="button"
          onClick={onSwitch}
          className="ml-2 font-semibold text-[#DB4444] underline-offset-4 hover:underline"
        >
          Login
        </button>
      </p>
    </>
  );
}
