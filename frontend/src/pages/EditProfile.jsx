import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile, updateProfile } from "../services/authService";

export default function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = await getProfile();

      setName(user.name);
      setEmail(user.email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        name,
        email,
        password,
      });

      alert("Profile Updated Successfully ✅");

      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
        <h1 className="text-3xl font-bold">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-800 p-4 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-800 p-4 rounded-xl"
          />

          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 p-4 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
