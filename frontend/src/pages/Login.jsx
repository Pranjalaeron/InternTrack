import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending request to:");
      console.log("http://localhost:8000/api/auth/login");

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        },
      );

      console.log("Response:", response.data);

      localStorage.setItem("token", response.data.token);

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(error.response?.data?.message || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

        <p className="text-zinc-400 mt-2">
          Sign in to continue tracking applications.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="text-zinc-300 text-sm">Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
