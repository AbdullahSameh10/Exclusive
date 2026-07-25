import { useContext, useState } from "react";
import { Mail, Phone, CircleCheckBig, CircleAlert } from "lucide-react";

import { useAuth } from "@Hooks/index";
import UserContext from "@/Components/Contexts/UserContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/Authentication/firebase";
import { toast } from "react-toastify";

export default function Verification() {
  const { user } = useAuth();

  const { verified, phoneVerified } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendVerification = async () => {
    try {
      setIsLoading(true);
      await sendEmailVerification(auth.currentUser!, {
        url: `https://exclusive-abdullahsameh10.vercel.app/verify-email?mode=verifyEmail&oobCode=${user?.uid}`,
        handleCodeInApp: false,
      });
      toast.success("Email Sent Successfuly");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/40 backdrop-blur-sm">
          <span className="h-20 w-20 animate-spin rounded-full border-4 border-white border-y-red-500" />
        </div>
      )}

      <h2 className="text-2xl font-bold text-red-500">Verification</h2>

      <div className="mt-8 flex flex-col gap-8">
        {/* ================= EMAIL ================= */}

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/10">
              <Mail className="text-red-500" size={26} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Email Verification
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Verify your email address to secure your account.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email */}

            <div>
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Current Email
              </label>

              <div className="mt-2 flex h-12 items-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {user?.email}
              </div>
            </div>

            {/* Status */}

            <div className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                {verified ? (
                  <>
                    <CircleCheckBig size={24} className="text-green-500" />

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-400">
                      Verified
                    </span>
                  </>
                ) : (
                  <>
                    <CircleAlert size={24} className="text-yellow-500" />

                    <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                      Pending Verification
                    </span>
                  </>
                )}
              </div>

              {!verified && (
                <button
                  onClick={handleSendVerification}
                  className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                >
                  {isLoading
                    ? "Sending Verification Email..."
                    : "Send Verification Email"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ================= PHONE ================= */}

        <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          {/* Coming Soon Overlay */}

          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[3px]">
            <div className="rotate-[-8deg] rounded-2xl border-2 border-red-500 bg-red-500 px-10 py-5 shadow-2xl">
              <h1 className="text-center text-2xl font-black uppercase tracking-widest text-white sm:text-3xl">
                Coming Soon 🚀
              </h1>

              <p className="mt-2 text-center text-md font-medium text-red-100">
                Requires Billing 😅
              </p>
            </div>
          </div>

          <div className="mb-8 flex select-none items-center gap-5 opacity-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/10">
              <Phone className="text-red-500" size={26} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Phone Verification
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Verify your phone number for extra protection.
              </p>
            </div>
          </div>

          <div className="select-none space-y-6 opacity-50">
            <div>
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Current Phone Number
              </label>

              <div
                className={`mt-2 flex h-12 items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 dark:border-zinc-700 dark:bg-zinc-800 ${
                  user?.phoneNumber
                    ? "text-zinc-600 dark:text-zinc-300"
                    : "uppercase italic text-red-500"
                }`}
              >
                {user?.phoneNumber || "No phone number added"}
              </div>
            </div>

            {user?.phoneNumber && (
              <div className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  {phoneVerified ? (
                    <>
                      <CircleCheckBig size={24} className="text-green-500" />

                      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-400">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <CircleAlert size={24} className="text-yellow-500" />

                      <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                        Pending Verification
                      </span>
                    </>
                  )}
                </div>

                {!phoneVerified && (
                  <button className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg">
                    Send Verification SMS
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
