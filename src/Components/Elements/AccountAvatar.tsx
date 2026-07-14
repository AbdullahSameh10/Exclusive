import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "@Authentication/firebase";
import { useAuth } from "@Hooks/index";
import { uploadImage } from "@Utilities/index";
import { doc, updateDoc } from "firebase/firestore";

const defaultAvatar = "../../../src/Components/Assets/avatar.png";

export default function AvatarSection() {
  const { setUser, user } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(defaultAvatar);

  useEffect(() => {
    setPreview(user?.avatar || defaultAvatar);
  }, [user?.avatar]);

  const [loading, setLoading] = useState(false);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    // Preview immediately
    setPreview(URL.createObjectURL(file));

    try {
      setLoading(true);

      const downloadURL = await uploadImage(file);

      // Update Firebase Authentication
      const firebaseUser = auth.currentUser;

      if (!firebaseUser) {
        throw new Error("No authenticated user found.");
      }

      await updateProfile(firebaseUser, {
        photoURL: downloadURL,
      });
      if (setUser)
        setUser((prev) => (prev ? { ...prev, avatar: downloadURL } : prev));

      await updateDoc(doc(db, "users", user.uid), {
        photoURL: downloadURL,
      });

      setPreview(downloadURL);
      console.log(auth.currentUser?.photoURL);

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-black">Profile Picture</label>

      <div className="flex items-center gap-6 rounded-md bg-gray-100 p-5">
        {/* Avatar */}
        <div className="relative">
          <img
            src={preview}
            alt="Avatar"
            className="h-24 w-24 rounded-full border-2 border-white object-cover shadow"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">
            Change Profile Picture
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            PNG, JPG or WEBP (Maximum 5MB)
          </p>

          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="mt-4 w-fit rounded-md border border-red-500 px-5 py-2 font-medium text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Choose Image"}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}
