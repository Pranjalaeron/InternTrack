import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logged out successfully 👋");

    navigate("/login");
  };

  return (
    <div
      className="
      w-64
      min-h-screen
      bg-zinc-950
      border-r
      border-zinc-800
      p-6
      flex
      flex-col
      "
    >
      <h1 className="text-2xl font-bold text-white mb-10">InternTrack</h1>

      <div className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 text-white p-3 rounded-xl"
              : "text-zinc-300 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 text-white p-3 rounded-xl"
              : "text-zinc-300 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition"
          }
        >
          Applications
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 text-white p-3 rounded-xl"
              : "text-zinc-300 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition"
          }
        >
          Analytics
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 text-white p-3 rounded-xl"
              : "text-zinc-300 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition"
          }
        >
          Profile
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="
        mt-auto
        bg-red-500
        hover:bg-red-600
        text-white
        p-3
        rounded-xl
        transition
        "
      >
        Logout
      </button>
    </div>
  );
}
