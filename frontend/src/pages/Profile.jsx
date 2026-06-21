import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";

import { getProfile, updateProfile } from "../services/authService";
import { getApplications } from "../services/applicationService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    resume: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileData = await getProfile();
      const applicationData = await getApplications();

      setUser(profileData);
      setApplications(applicationData);

      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        college: profileData.college || "",
        branch: profileData.branch || "",
        resume: profileData.resume || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(formData);

      setUser(updatedUser);
      setEditing(false);

      alert("Profile Updated Successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile ❌");
    }
  };

  // FIXED FUNCTION
  const connectGmail = () => {
    const token = localStorage.getItem("token");

    window.location.href = `https://interntrack-vmff.onrender.com/api/gmail/connect?token=${token}`;
  };

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offers = applications.filter((app) => app.status === "Offer").length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-[#09090B] text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Profile</h1>

          <Link
            to="/dashboard"
            className="bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-700"
          >
            Dashboard
          </Link>
        </div>

        <div className="max-w-4xl mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-3xl font-bold">{user.name}</h2>

              <p className="text-zinc-400">InternTrack User</p>

              {user.gmailConnected && (
                <p className="text-green-500 mt-2">
                  ✅ Gmail Connected: {user.gmailEmail}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div>
              <p className="text-zinc-500 mb-2">Name</p>

              <input
                type="text"
                name="name"
                value={formData.name}
                disabled={!editing}
                onChange={handleChange}
                className="w-full bg-zinc-800 p-4 rounded-xl"
              />
            </div>

            <div>
              <p className="text-zinc-500 mb-2">Email</p>

              <input
                type="email"
                name="email"
                value={formData.email}
                disabled={!editing}
                onChange={handleChange}
                className="w-full bg-zinc-800 p-4 rounded-xl"
              />
            </div>

            <div>
              <p className="text-zinc-500 mb-2">College</p>

              <input
                type="text"
                name="college"
                value={formData.college}
                disabled={!editing}
                onChange={handleChange}
                className="w-full bg-zinc-800 p-4 rounded-xl"
              />
            </div>

            <div>
              <p className="text-zinc-500 mb-2">Branch</p>

              <input
                type="text"
                name="branch"
                value={formData.branch}
                disabled={!editing}
                onChange={handleChange}
                className="w-full bg-zinc-800 p-4 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <p className="text-zinc-500 mb-2">Resume URL</p>

              <input
                type="text"
                name="resume"
                value={formData.resume}
                disabled={!editing}
                onChange={handleChange}
                className="w-full bg-zinc-800 p-4 rounded-xl"
                placeholder="Paste resume link here"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-10">
            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Applications</p>
              <h3 className="text-2xl font-bold mt-2">{totalApplications}</h3>
            </div>

            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Interviews</p>
              <h3 className="text-2xl font-bold mt-2">{interviews}</h3>
            </div>

            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Offers</p>
              <h3 className="text-2xl font-bold mt-2">{offers}</h3>
            </div>

            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Rejected</p>
              <h3 className="text-2xl font-bold mt-2">{rejected}</h3>
            </div>
          </div>

          <div className="mt-8 flex gap-4 flex-wrap">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            )}

            {user.gmailConnected ? (
              <button className="bg-green-600 px-6 py-3 rounded-xl cursor-default">
                Gmail Connected ✓
              </button>
            ) : (
              <button
                onClick={connectGmail}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
              >
                Connect Gmail
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
