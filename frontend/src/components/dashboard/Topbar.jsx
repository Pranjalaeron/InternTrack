import { FiBell, FiSearch } from "react-icons/fi";

export default function Topbar() {
  return (
    <header
      className="
      border-b
      border-zinc-800
      px-8
      py-5
      flex
      justify-between
      items-center
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        bg-zinc-900
        px-4
        py-2
        rounded-xl
        "
      >
        <FiSearch />

        <input
          placeholder="Search..."
          className="
          bg-transparent
          outline-none
          "
        />
      </div>

      <div className="flex items-center gap-5">
        <FiBell size={20} />

        <div
          className="
          h-10
          w-10
          rounded-full
          bg-indigo-600
          flex
          items-center
          justify-center
          font-semibold
          "
        >
          M
        </div>
      </div>
    </header>
  );
}
