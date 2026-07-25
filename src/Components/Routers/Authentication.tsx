import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {useRouteTransition} from "@Hooks/index";
import {
  AuthIllustrations,
  AuthPanel,
  LoginForm,
  SignupForm,
} from "@Elements/index";
import { signInWithGoogle, signUpWithGoogle } from "@Utilities/index";
import { toast } from "react-toastify";
import { UserContext } from "@Contexts/index";

export default function Authentication() {
  const { setVerified } = useContext(UserContext);

  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const transition = useRouteTransition();

  const from = location.state?.from || "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogle();
      transition.start();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setVerified(true);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google sign-up failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      transition.start();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setVerified(true);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error("Login Field, Please Try Again.");
    }
  };

  return (
    <div className="relative left-1/2 right-1/2 min-h-screen w-[calc(100vw-7px)] -translate-x-1/2 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200 transition-colors duration-300 dark:from-[#0F1424] dark:via-[#141A33] dark:to-[#0F1424]">
      {/* Desktop only */}
      <div className="hidden lg:block">
        <AuthIllustrations isSignup={isSignup} />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md lg:max-w-none">
          <AuthPanel show={!isSignup} side="right">
            <LoginForm
              onSwitch={() => setIsSignup(true)}
              onGoogleLogin={handleGoogleLogin}
            />
          </AuthPanel>

          <AuthPanel show={isSignup} side="left">
            <SignupForm
              onSwitch={() => setIsSignup(false)}
              onGoogleSignUp={handleGoogleSignUp}
            />
          </AuthPanel>
        </div>
      </div>
    </div>
  );
}
