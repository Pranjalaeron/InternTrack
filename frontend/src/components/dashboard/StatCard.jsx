export default function StatCard({ title, value }) {
  return (
    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      "
    >
      <p className="text-zinc-400">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
