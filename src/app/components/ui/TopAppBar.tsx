import { Link } from "react-router";

export default function TopAppBar() {
  return (
    <header className="bg-[#0f2744] w-full border-b-2 border-white flex justify-between items-center px-8 py-4 sticky top-0 z-50">
      <h1 className="font-['Courier_Prime'] text-2xl font-bold text-[#f1c40f] uppercase tracking-[0.05em]">
        POKÉMON COMMAND
      </h1>
      <div className="flex gap-4 items-center">
        <Link
          to="/history"
          className="text-[#f1c40f] hover:bg-[#f1c40f] hover:text-black transition-colors p-2 rounded"
          title="Ver Histórico e Ranking"
        >
          <span className="material-symbols-outlined">leaderboard</span>
        </Link>
        <button className="text-[#f1c40f] hover:bg-[#f1c40f] hover:text-black transition-colors p-2 rounded">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
        <button className="text-[#f1c40f] hover:bg-[#f1c40f] hover:text-black transition-colors p-2 rounded">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
