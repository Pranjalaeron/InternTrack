import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://interntrack-vmff.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        },
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>

        <p className="text-zinc-400 mt-2">
          Start tracking your internship journey.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label className="text-zinc-300 text-sm">Full Name</label>

            <input
              type="text"
              placeholder="Mitali Raj"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm">Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
