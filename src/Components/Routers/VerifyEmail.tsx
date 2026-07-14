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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl p-8 text-center shadow-xl bg-green-400 bg-opacity-20">
        <div className="mb-4 text-5xl">🎉</div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Email Verified <span className="text-green-500">Successfully</span>
        </h1>

        <p className="mb-6 text-gray-600">
          Your email has been verified. You can now log in to your account.
        </p>

        <div className="text-sm text-gray-500">
          Redirecting to login in{" "}
          <span className="font-semibold text-indigo-600">{redirectTime}</span>{" "}
          seconds…
        </div>

        <button
          onClick={() => navigate("/", { replace: true })}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
