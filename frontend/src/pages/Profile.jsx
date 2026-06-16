import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";

import { getProfile } from "../services/authService";
import { getApplications } from "../services/applicationService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileData = await getProfile();
      const applicationData = await getApplications();

      setUser(profileData);
      setApplications(applicationData);
    } catch (error) {
      console.log(error);
    }
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
            className="
            bg-indigo-600
            px-4
            py-2
            rounded-xl
            hover:bg-indigo-700
            "
          >
            Dashboard
          </Link>
        </div>

        <div
          className="
          max-w-4xl
          mt-10
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          "
        >
          <div className="flex items-center gap-6">
            <div
              className="
              h-24
              w-24
              rounded-full
              bg-indigo-600
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-3xl font-bold">{user.name}</h2>

              <p className="text-zinc-400">InternTrack User</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div>
              <p className="text-zinc-500 mb-2">Email</p>

              <div className="bg-zinc-800 p-4 rounded-xl">{user.email}</div>
            </div>

            <div>
              <p className="text-zinc-500 mb-2">Joined On</p>

              <div className="bg-zinc-800 p-4 rounded-xl">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Stats */}

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

          <Link
            to="/edit-profile"
            className="
  mt-8
  inline-block
  bg-indigo-600
  hover:bg-indigo-700
  px-6
  py-3
  rounded-xl
  "
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
