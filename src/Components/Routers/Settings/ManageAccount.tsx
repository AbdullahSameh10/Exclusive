import { useContext, useEffect, useState } from "react";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { AccountAvatar, Button, PhoneField } from "@Elements/index";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@Authentication/firebase";
import { updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { UserContext } from "@Contexts/index";

export default function ManageAccount() {
  const transition = useRouteTransition();
  const { user, setUser } = useAuth();
  const { setVerified, setPhoneVerified } = useContext(UserContext);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ").slice(1).join(" ") ?? "",
    email: user?.email ?? "",
    phone: user?.phoneNumber ?? "",
  });

  useEffect(() => {
    transition.end();
  }, []);

  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.name.split(" ")[0] ?? "",
      lastName: user.name.split(" ").slice(1).join(" ") ?? "",
      email: user.email,
      phone: user.phoneNumber ?? "",
    });
  }, [user]);

  useEffect(() => {
    setHasChanges(
      formData.firstName !== (user?.name.split(" ")[0] ?? "") ||
        formData.lastName !==
          (user?.name.split(" ").slice(1).join(" ") ?? "") ||
        formData.email !== (user?.email ?? "") ||
        formData.phone !== (user?.phoneNumber ?? ""),
    );
  }, [formData, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firebaseUser = auth.currentUser;

    if (!setUser || !user || !firebaseUser) return;

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      setIsLoading(true);

      if (firebaseUser.email !== formData.email) {
        await verifyBeforeUpdateEmail(firebaseUser, formData.email);

        toast.success(
          "A verification email has been sent to your new email address. Please verify it before it becomes active.",
        );
        setVerified(false);
        await updateDoc(doc(db, "users", user.uid), {
          email: formData.email,
          emailVerified: false,
        });

        return;
      }
      if(firebaseUser.phoneNumber !== formData.phone) setPhoneVerified(false);

      if (firebaseUser.displayName !== fullName) {
        await updateProfile(firebaseUser, {
          displayName: fullName,
        });
      }

      await updateDoc(doc(db, "users", user.uid), {
        name: fullName,
        email: formData.email,
        phoneNumber: formData.phone,
      });

      setUser({
        ...user,
        name: fullName,
        email: formData.email,
        phoneNumber: formData.phone,
      });

      toast.success("Profile updated successfully!"); 
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "The email address is already in use by another account.",
          );
          break;
        case "auth/invalid-email":
          toast.error("The email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          toast.error("Email/password accounts are not enabled.");
          break;
        case "auth/network-request-failed":
          toast.error(
            "A network error has occurred. Please check your connection.",
          );
          break;
        default:
          toast.error("An unknown error occurred. Please try again later.");
          console.error(error.message);
          console.error(error.code);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-red-500">Edit Your Profile</h2>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Keep your personal information up to date.
        </p>
      </div>

      {/* Form */}
      <form
        className="flex flex-1 flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
          {/* Avatar */}
          <div className="flex justify-center lg:justify-start">
            <AccountAvatar />
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-950"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-950"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-950"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <PhoneField
                value={formData.phone}
                onChange={(phone) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone,
                  }))
                }
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 transition-all duration-300 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:bg-zinc-950"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-700 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            disabled={!hasChanges}
            className="w-full disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
