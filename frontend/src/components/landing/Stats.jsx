export default function Stats() {
  const stats = [
    {
      value: "10K+",
      label: "Applications Tracked",
    },
    {
      value: "500+",
      label: "Students",
    },
    {
      value: "95%",
      label: "Deadline Success",
    },
    {
      value: "150+",
      label: "Offers Landed",
    },
  ];

  return (
    <section className="py-24 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div
              key={item.label}
              className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-8
              text-center
              "
            >
              <h2 className="text-4xl font-bold">{item.value}</h2>

              <p className="text-zinc-400 mt-3">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
