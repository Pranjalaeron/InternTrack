import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          InternTrack
        </Link>

        <div className="hidden md:flex gap-8 text-zinc-400">
          <a href="#features">Features</a>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/applications">Applications</Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link
            to="/login"
            className="text-zinc-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
              bg-indigo-600
              hover:bg-indigo-700
              px-5
              py-2
              rounded-xl
              transition
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
