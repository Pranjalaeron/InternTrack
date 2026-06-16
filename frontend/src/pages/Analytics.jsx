import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import { getApplications } from "../services/applicationService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export default function Analytics() {
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

  const offers = applications.filter((app) => app.status === "Offer").length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const applied = applications.filter((app) => app.status === "Applied").length;

  const statusData = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interviews },
    { name: "Offer", value: offers },
    { name: "Rejected", value: rejected },
  ];

  const monthlyMap = {};

  applications.forEach((app) => {
    const month = new Date(app.createdAt).toLocaleString("default", {
      month: "short",
    });

    monthlyMap[month] = (monthlyMap[month] || 0) + 1;
  });

  const monthlyData = Object.keys(monthlyMap).map((month) => ({
    month,
    applications: monthlyMap[month],
  }));

  return (
    <div className="flex bg-[#09090B] text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">Analytics</h1>

        <p className="text-zinc-400 mt-2">
          Visualize your internship application progress.
        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400">Applications</p>
            <h2 className="text-3xl font-bold mt-2">{totalApplications}</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400">Interviews</p>
            <h2 className="text-3xl font-bold mt-2">{interviews}</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400">Offers</p>
            <h2 className="text-3xl font-bold mt-2">{offers}</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400">Rejected</p>
            <h2 className="text-3xl font-bold mt-2">{rejected}</h2>
          </div>
        </div>

        {/* Charts */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Pie Chart */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Status Distribution</h2>

            <div className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Applications by Month</h2>

            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
