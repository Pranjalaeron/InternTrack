import {
  FiBarChart2,
  FiCalendar,
  FiFileText,
  FiBell,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: <FiBarChart2 size={28} />,
      title: "Analytics Dashboard",
      desc: "Visualize your application journey.",
    },
    {
      icon: <FiCalendar size={28} />,
      title: "Interview Calendar",
      desc: "Never miss important deadlines.",
    },
    {
      icon: <FiFileText size={28} />,
      title: "Resume Manager",
      desc: "Track multiple resume versions.",
    },
    {
      icon: <FiBell size={28} />,
      title: "Reminders",
      desc: "Stay ahead with notifications.",
    },
    {
      icon: <FiUsers size={28} />,
      title: "Networking Tracker",
      desc: "Manage recruiter connections.",
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: "Growth Tracking",
      desc: "Measure progress over time.",
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-bold text-center">Everything You Need</h2>

        <p className="text-zinc-400 text-center mt-4">
          Built specifically for students preparing for internships.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-8
             hover:border-indigo-500
            hover:-translate-y-2
            hover:shadow-indigo-500/10
            hover:shadow-2xl
              transition-all
              duration-300
              "
            >
              <div className="text-indigo-500">{feature.icon}</div>

              <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>

              <p className="text-zinc-400 mt-3">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
