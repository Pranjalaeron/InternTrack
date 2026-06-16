import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";
import Sidebar from "../components/common/Sidebar";

import { getApplications } from "../services/applicationService";

export default function Dashboard() {
const [applications, setApplications] = useState([]);

useEffect(() => {
fetchApplications();
}, []);

const fetchApplications = async () => {
try {
const data = await getApplications();
setApplications(data);
} catch (error) {
console.log(error);
}
};

const totalApplications = applications.length;

const interviews = applications.filter(
(app) => app.status === "Interview",
).length;

const offers = applications.filter(
(app) => app.status === "Offer",
).length;

const rejected = applications.filter(
(app) => app.status === "Rejected",
).length;

const successRate =
totalApplications === 0
? 0
: ((offers / totalApplications) * 100).toFixed(1);

const upcomingDeadlines = applications
.filter(
(app) =>
app.deadline &&
new Date(app.deadline) >= new Date()
)
.sort(
(a, b) =>
new Date(a.deadline) - new Date(b.deadline)
)
.slice(0, 5);

return ( <div className="flex bg-[#09090B] text-white"> <Sidebar />

  <div className="flex-1 p-8">
    {/* Header */}

    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <Link
        to="/"
        className="
        border
        border-zinc-700
        px-4
        py-2
        rounded-xl
        hover:bg-zinc-800
        transition
        "
      >
        Home
      </Link>
    </div>

    {/* Stats Cards */}

    <div className="grid md:grid-cols-5 gap-6 mt-10">
      <StatCard
        title="Applications"
        value={totalApplications}
      />

      <StatCard
        title="Interviews"
        value={interviews}
      />

      <StatCard title="Offers" value={offers} />

      <StatCard
        title="Rejected"
        value={rejected}
      />

      <StatCard
        title="Success Rate"
        value={`${successRate}%`}
      />
    </div>

    {/* Navigation Cards */}

    <div className="grid md:grid-cols-2 gap-6 mt-10">
      <Link
        to="/applications"
        className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-8
        hover:border-indigo-500
        transition
        "
      >
        <h2 className="text-2xl font-bold">
          Applications
        </h2>

        <p className="text-zinc-400 mt-3">
          Manage internship applications,
          search, filter and track progress.
        </p>
      </Link>

      <Link
        to="/analytics"
        className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-8
        hover:border-indigo-500
        transition
        "
      >
        <h2 className="text-2xl font-bold">
          Analytics
        </h2>

        <p className="text-zinc-400 mt-3">
          View detailed application
          statistics and performance
          insights.
        </p>
      </Link>
    </div>

    {/* Upcoming Deadlines */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Upcoming Deadlines
      </h2>

      {upcomingDeadlines.length === 0 ? (
        <p className="text-zinc-400">
          No upcoming deadlines
        </p>
      ) : (
        upcomingDeadlines.map((app) => {
          const daysLeft = Math.ceil(
            (new Date(app.deadline) -
              new Date()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={app._id}
              className="flex justify-between items-center py-4 border-b border-zinc-800 last:border-b-0"
            >
              <div>
                <p className="font-semibold">
                  {app.company}
                </p>

                <p className="text-zinc-400 text-sm">
                  {app.role}
                </p>
              </div>

              <div className="text-indigo-400 font-medium">
                {daysLeft} day
                {daysLeft !== 1 ? "s" : ""} left
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
</div>


);
}
