import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, PasswordStrength } from "@Elements/index";
import {
  EmailAuthProvider,
  linkWithCredential,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/Authentication/firebase";
import { toast } from "react-toastify";
import { UserContext } from "@Contexts/index";

export default function Security() {
  const authUser = auth.currentUser;
  const { setVerified } = useContext(UserContext);

  const hasPasswordProvider =
    authUser?.providerData.some(
      (provider) => provider.providerId === "password",
    ) ?? false;

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = newPassword === confirmPassword;

  const canSubmit =
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    passwordsMatch &&
    (!hasPasswordProvider || currentPassword.trim() !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authUser = auth.currentUser;

    if (!authUser || !authUser.email) return;

    try {
      setIsLoading(true);

      if (hasPasswordProvider) {
        const credential = EmailAuthProvider.credential(
          authUser.email,
          currentPassword,
        );

        await reauthenticateWithCredential(authUser, credential);

        await updatePassword(authUser, newPassword);

        toast.success("Password updated successfully!");
      } else {
        const credential = EmailAuthProvider.credential(
          authUser.email,
          newPassword,
        );
        
        await linkWithCredential(authUser, credential);
        
        toast.success(
          "Password created successfully! You can now sign in using either Google or your email and password.",
        );
        toast.info("You Are Now Not Verified, Please Go to Verification Page To Verificate Your Mail Agian!");
        setVerified(false);
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          toast.error("Current password is incorrect.");
          break;

        case "auth/weak-password":
          toast.error(
            "Your new password is too weak. Please choose a stronger one.",
          );
          break;

        case "auth/requires-recent-login":
          toast.error(
            "For security reasons, please log in again before changing your password.",
          );
          break;

        case "auth/email-already-in-use":
          toast.error("This email is already linked to another account.");
          break;

        case "auth/provider-already-linked":
          toast.error("A password has already been created for this account.");
          break;

        case "auth/network-request-failed":
          toast.error("Network error. Please check your internet connection.");
          break;

        default:
          console.error(error);
          toast.error("Failed to update password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <h2 className="text-2xl font-bold text-red-500">Security</h2>

      <form
        className="mt-8 flex flex-1 flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
          {/* Current Password */}
          {hasPasswordProvider && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-red-500"
                >
                  <FontAwesomeIcon
                    icon={showCurrentPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
          )}

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-red-500"
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Password Strength */}
          {newPassword && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
              <PasswordStrength password={newPassword} />
            </div>
          )}

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-12 w-full rounded-xl border bg-zinc-50 px-4 pr-12 text-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 ${
                  confirmPassword && !passwordsMatch
                    ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : "border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-red-500"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>

            {confirmPassword && !passwordsMatch && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-500">
                Passwords do not match.
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="w-full disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
