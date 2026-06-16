import { Link } from "react-router-dom";
import {
  FiGrid,
  FiBriefcase,
  FiBarChart2,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

export default function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
      path: "/dashboard",
    },
    {
      name: "Applications",
      icon: <FiBriefcase />,
      path: "/applications",
    },
    {
      name: "Analytics",
      icon: <FiBarChart2 />,
      path: "/analytics",
    },
    {
      name: "Calendar",
      icon: <FiCalendar />,
      path: "/calendar",
    },
    {
      name: "Profile",
      icon: <FiUser />,
      path: "/profile",
    },
  ];

  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950">
      <div className="p-8">
        <h1 className="text-2xl font-bold">InternTrack</h1>
      </div>

      <nav className="px-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-zinc-400
            hover:bg-zinc-900
            hover:text-white
            transition
            mb-2
            "
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
