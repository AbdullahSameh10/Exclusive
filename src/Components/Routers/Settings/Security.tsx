import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, PasswordStrength } from "@Elements/index";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/Authentication/firebase";
import { toast } from "react-toastify";

export default function Security() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = newPassword === confirmPassword;

  const canSubmit =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authUser = auth.currentUser;

    if (!authUser || !authUser.email) return;

    try {
      setIsLoading(true);
     
      const credential = EmailAuthProvider.credential(
        authUser.email,
        currentPassword,
      );

      await reauthenticateWithCredential(authUser, credential);

      await updatePassword(authUser, newPassword);

      toast.success("Password updated successfully!");

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

        case "auth/network-request-failed":
          toast.error("Network error. Please check your internet connection.");
          break;

        default:
          console.error(error);
          toast.error("Failed to update password.");
      }
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <h2 className="text-xl font-semibold text-red-500">Security</h2>

      <form
        className="flex flex-1 flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>

            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-12 w-full rounded-md bg-gray-100 px-4 pr-12 outline-none transition focus:ring-2 focus:ring-red-400"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-500"
              >
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  className="text-gray-500 transition duration-300 hover:text-red-500"
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 w-full rounded-md bg-gray-100 px-4 pr-12 outline-none transition focus:ring-2 focus:ring-red-400"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-500"
              >
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  className="text-gray-500 transition duration-300 hover:text-red-500"
                />
              </button>
            </div>
          </div>

          {newPassword && <PasswordStrength password={newPassword} />}

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 w-full rounded-md bg-gray-100 px-4 pr-12 outline-none transition focus:ring-2 focus:ring-red-400"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-500"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className="text-gray-500 transition duration-300 hover:text-red-500"
                />
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-red-500">Passwords do not match.</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-8">
          <Button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
