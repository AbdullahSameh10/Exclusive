import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "@Authentication/firebase";
import { useAuth } from "@Hooks/index";
import { uploadImage } from "@Utilities/index";
import { doc, updateDoc } from "firebase/firestore";

import defaultAvatar from "@Assets/Avatar.png"

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

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 w-full">
      <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        Profile Picture
      </label>

      <div className="rounded-2xl border border-zinc-200 bg-white w-full p-6 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col w-full items-center gap-6 lg:flex-row">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={preview}
              alt="Avatar"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg dark:border-zinc-800"
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600 active:scale-95"
            >
              <Camera size={18} />
            </button>
          </div>

          {/* Information */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Change Profile Picture
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Upload a PNG, JPG or WEBP image.
              <br />
              Maximum file size: <span className="font-semibold">5 MB</span>.
            </p>

              <button
                type="button"
                disabled={loading}
                onClick={() => inputRef.current?.click()}
                className="rounded-xl mt-6 bg-red-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
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
    </div>
  );
}
