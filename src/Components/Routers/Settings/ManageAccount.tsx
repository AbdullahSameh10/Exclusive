import { useContext, useEffect, useState } from "react";
import { useAuth, useRouteTransition } from "@Hooks/index";
import { AccountAvatar, Button, PhoneField } from "@Elements/index";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/Authentication/firebase";
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
    <div className="flex h-full flex-col gap-4">
      <h2 className="text-xl font-semibold text-red-500">Edit Your Profile</h2>

      {/* User Information */}
      <form
        className="flex flex-1 flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-6">
          <AccountAvatar />
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              className="h-12 w-full rounded-md bg-gray-100 px-4 outline-none transition focus:ring-2 focus:ring-red-400"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              className="h-12 w-full rounded-md bg-gray-100 px-4 outline-none transition focus:ring-2 focus:ring-red-400"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
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
              className="h-12 w-full rounded-md bg-gray-100 px-4 outline-none transition focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
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
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-8">
          <Button
            type="submit"
            disabled={!hasChanges}
            className="mt-auto disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
