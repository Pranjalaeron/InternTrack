import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center min-h-[85vh]">
        {/* Left Side */}

        <div>
          <div
            className="
            inline-block
            px-4
            py-2
            rounded-full
            border
            border-indigo-500/30
            text-indigo-400
            text-sm
            mb-6
            "
          >
            Internship Tracking Platform
          </div>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            "
          >
            Track Every
            <br />
            Application.
          </h1>

          <p
            className="
            text-zinc-400
            text-lg
            mt-6
            max-w-xl
            "
          >
            Organize internships, interviews, resumes and deadlines in one
            place.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              to="/dashboard"
              className="
              bg-indigo-600
              hover:bg-indigo-700
              px-7
              py-3
              rounded-xl
              font-medium
              shadow-lg
              shadow-indigo-600/30
              transition-all
              duration-300
              hover:scale-105
              "
            >
              Start Tracking
            </Link>

            <Link
              to="/applications"
              className="
              border
              border-zinc-700
              px-7
              py-3
              rounded-xl
              hover:bg-zinc-800
              transition
              "
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Right Side */}

        <div
          className="
          bg-zinc-900/90
          backdrop-blur-xl
          border
          border-zinc-800
          rounded-3xl
          p-8
          shadow-2xl
          "
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Applications</p>
              <h2 className="text-4xl font-bold mt-2">52</h2>
            </div>

            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Interviews</p>
              <h2 className="text-4xl font-bold mt-2">11</h2>
            </div>

            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Offers</p>
              <h2 className="text-4xl font-bold mt-2">3</h2>
            </div>

            <div className="bg-zinc-800 p-5 rounded-xl">
              <p className="text-zinc-400">Success Rate</p>
              <h2 className="text-4xl font-bold mt-2">87%</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
