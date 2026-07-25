import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { UserContext } from "../Contexts";

export default function VerifyEmail() {
  const { setVerified } = useContext(UserContext);

  const [redirectTime, setRedirectTime] = useState(10);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  const navigate = useNavigate();

  useEffect(() => {
    if (mode !== "verifyEmail" || !oobCode) {
      navigate("/", { replace: true });
      return;
    }

    const interval = setInterval(() => {
      setRedirectTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/", { replace: true });
          }, 0);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    setVerified(true);

    return () => clearInterval(interval);
  }, [mode, oobCode, navigate, setVerified]);

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-green-200 bg-green-50 p-6 text-center shadow-xl dark:border-green-500/30 dark:bg-[#161B2F] sm:p-8">
        <div className="mb-5 text-6xl">🎉</div>

        <h1 className="mb-3 font-inter text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Email Verified <span className="text-green-500">Successfully</span>
        </h1>

        <p className="font-poppins text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
          Your email has been verified successfully.
          <br />
          You can now log in and enjoy all Exclusive features.
        </p>

        <div className="mt-8 rounded-xl bg-white/70 px-4 py-3 text-sm text-gray-600 shadow-sm dark:bg-[#1B2037] dark:text-gray-300">
          Redirecting to Home in{" "}
          <span className="font-bold text-violet-500">{redirectTime}</span>{" "}
          second{redirectTime !== 1 && "s"}...
        </div>

        <button
          onClick={() => navigate("/", { replace: true })}
          className="mt-8 h-12 w-full rounded-xl bg-violet-500 font-semibold text-white transition-all duration-300 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98]"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
