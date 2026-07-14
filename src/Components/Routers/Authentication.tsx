import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useRouteTransition from "../Hooks/useRouteTransition";
import {
  AuthIllustrations,
  AuthPanel,
  LoginForm,
  SignupForm,
} from "../Elements";
import signInWithGoogle from "../Utilities/signInWithGoogle";
import { signUpWithGoogle } from "../Utilities";
import { toast } from "react-toastify";
import { UserContext } from "../Contexts";

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
    <div className="relative left-1/2 right-1/2 max-h-[850px] w-[calc(100vw-7px)] -translate-x-1/2 overflow-hidden bg-gradient-to-br from-[#0F1424] via-[#141A33] to-[#0F1424]">
      <AuthIllustrations isSignup={isSignup} />

      <div className="relative z-10 flex h-[850px] items-center">
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
  );
}
