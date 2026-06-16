import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ApplicationTable from "../components/applications/ApplicationTable";
import Sidebar from "../components/common/Sidebar";

import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
} from "../services/applicationService";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Applied");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const data = await getApplications();

      setApplications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async () => {
    if (!company || !role || !deadline) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createApplication({
        company,
        role,
        status,
        deadline,
      });

      await fetchApplications();

      setCompany("");
      setRole("");
      setDeadline("");
      setStatus("Applied");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);

      await fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplication(id, {
        status: newStatus,
      });

      await fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.company
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
        Loading Applications...
      </div>
    );
  }

  return (
    <div className="flex bg-[#09090B] text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Applications</h1>

          <div className="flex gap-3">
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

            <Link
              to="/dashboard"
              className="
              bg-indigo-600
              hover:bg-indigo-700
              px-4
              py-2
              rounded-xl
              transition
              "
            >
              Dashboard
            </Link>
          </div>
        </div>

        <p className="text-zinc-400">
          Track and manage all internship applications.
        </p>

        {/* Search & Filter */}

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-xl
            px-4
            py-3
            outline-none
            md:w-80
            "
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-xl
            px-4
            py-3
            outline-none
            "
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Add Application */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Add Application</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-zinc-800 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-zinc-800 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-zinc-800 rounded-xl px-4 py-3 outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-zinc-800 rounded-xl px-4 py-3 outline-none"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          <button
            onClick={addApplication}
            className="
            mt-5
            bg-indigo-600
            hover:bg-indigo-700
            px-6
            py-3
            rounded-xl
            transition
            "
          >
            Add Application
          </button>
        </div>

        {/* Applications Table */}

        <div className="mt-8">
          <ApplicationTable
            applications={filteredApplications}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}
