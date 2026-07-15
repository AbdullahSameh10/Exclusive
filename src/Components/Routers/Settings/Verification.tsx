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
    <div className="relative flex h-full flex-col gap-10">
      {isLoading ? (
        <div className="absolute inset-0 -bottom-10 -left-20 -right-20 -top-10 z-10 flex items-center justify-center rounded-md bg-black/40">
          <span className="h-20 w-20 animate-spin rounded-full border-4 border-white border-y-red-500" />
        </div>
      ) : null}
      <h2 className="text-xl font-semibold text-red-500">Verification</h2>

      <section className="rounded-md p-6 shadow-md">
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <Mail className="text-red-500" size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Email Verification</h3>

            <p className="text-sm text-gray-500">Verify your email address.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Current Email</label>

            <div className="mt-2 flex h-12 items-center rounded-md bg-gray-100 px-4 text-gray-500">
              {user?.email}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              {verified ? (
                <>
                  <CircleCheckBig size={22} className="text-green-500" />

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Verified
                  </span>
                </>
              ) : (
                <>
                  <CircleAlert size={22} className="text-yellow-500" />

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    Pending Verification
                  </span>
                </>
              )}
            </div>

            {!verified && (
              <button
                className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600"
                onClick={() => handleSendVerification()}
              >
                {isLoading
                  ? "Sending Verification Email..."
                  : "Send Verification Email"}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="relative rounded-md p-6 shadow-md">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-red-500/50 shadow-md backdrop-blur-[2px]">
          <h1 className="rotate-[20deg] text-4xl font-black uppercase italic text-red-800">
            Coming Soon ( Need paying 😅 )
          </h1>
        </div>
        <div className="mb-8 flex select-none items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <Phone className="text-red-500" size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Phone Verification</h3>

            <p className="text-sm text-gray-500">Verify your phone number.</p>
          </div>
        </div>

        <div className="select-none space-y-6">
          <div>
            <label className="text-sm font-medium">Current Phone Number</label>

            <div
              className={`mt-2 flex h-12 items-center rounded-md bg-gray-100 px-4 ${user?.phoneNumber ? "text-gray-500" : "uppercase italic text-red-500"}`}
            >
              {user?.phoneNumber || "No phone number added"}
            </div>
          </div>

          {user?.phoneNumber && (
            <div className="flex items-center justify-between rounded-md bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                {phoneVerified ? (
                  <>
                    <CircleCheckBig size={22} className="text-green-500" />

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Verified
                    </span>
                  </>
                ) : (
                  <>
                    <CircleAlert size={22} className="text-yellow-500" />

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                      Pending Verification
                    </span>
                  </>
                )}
              </div>

              {!phoneVerified && user?.phoneNumber && (
                <button className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600">
                  Send Verification SMS
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
