import { useNavigate } from "react-router";
import TopAppBar from "../components/TopAppBar";
import SideNavBar from "../components/SideNavBar";
import Footer from "../components/Footer";

const battleHistory = [
  {
    date: "2023-10-27 14:32",
    team: "PIKACHU, CHARIZARD, SNORLAX",
    opponent: "BLUE",
    result: "victory",
  },
  {
    date: "2023-10-26 09:15",
    team: "GENGAR, ALAKAZAM",
    opponent: "AGATHA",
    result: "defeat",
  },
  {
    date: "2023-10-25 18:45",
    team: "DRAGONITE, LAPRAS, SCYTHER",
    opponent: "LANCE",
    result: "defeat",
  },
  {
    date: "2023-10-24 11:10",
    team: "VENUSAUR, BLASTOISE",
    opponent: "RIVAL ???",
    result: "victory",
  },
  {
    date: "2023-10-23 22:00",
    team: "ARCANINE, GYARADOS",
    opponent: "LORELEI",
    result: "victory",
  },
];

const leaderboard = [
  { rank: 1, trainer: "LANCE", xp: 999999, isYou: false },
  { rank: 2, trainer: "CYNTHIA", xp: 845230, isYou: false },
  { rank: 3, trainer: "STEVEN", xp: 792100, isYou: false },
  { rank: 4, trainer: "RED", xp: 750000, isYou: true },
  { rank: 5, trainer: "BLUE", xp: 748500, isYou: false },
  { rank: 6, trainer: "LEON", xp: 710000, isYou: false },
];

export default function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#0c192c] text-white">
      <TopAppBar />
      <div className="flex flex-1">
        <SideNavBar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-end mb-4 border-b-2 border-white pb-4">
            <div>
              <h2 className="font-['Courier_Prime'] text-3xl text-[#f1c40f] uppercase tracking-[0.1em] font-bold">
                COMBAT LOG &amp; RANKING
              </h2>
              <p className="font-['JetBrains_Mono'] text-xs text-[#bfecff] mt-2 uppercase">
                Global Server Data Access
              </p>
            </div>
            <button
              onClick={() => navigate("/lobby")}
              className="border-2 border-[#f1c40f] text-[#f1c40f] px-6 py-2 font-['JetBrains_Mono'] text-xs hover:bg-[#f1c40f] hover:text-black transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Voltar ao Lobby
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-1 md:col-span-6 flex flex-col gap-2">
              <h3 className="font-['Courier_Prime'] text-lg text-white uppercase bg-[#0f2744] p-2 border-2 border-white inline-block w-max mb-2 font-bold">
                Battle History
              </h3>
              <div className="border-2 border-white bg-[#0c192c] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr className="border-b-2 border-white bg-[#1e3a5f] font-['JetBrains_Mono'] text-xs text-[#bfecff] uppercase">
                      <th className="p-3 border-r border-white">Data</th>
                      <th className="p-3 border-r border-white">Sua Equipe</th>
                      <th className="p-3 border-r border-white">Oponente</th>
                      <th className="p-3">Resultado</th>
                    </tr>
                  </thead>
                  <tbody className="font-['JetBrains_Mono'] text-xs">
                    {battleHistory.map((battle, index) => (
                      <tr
                        key={index}
                        className="border-b border-white hover:bg-[#1e3a5f] transition-colors"
                      >
                        <td className="p-3 border-r border-white text-white">
                          {battle.date}
                        </td>
                        <td className="p-3 border-r border-white text-white">
                          {battle.team}
                        </td>
                        <td className="p-3 border-r border-white text-[#ffb4a9]">
                          {battle.opponent}
                        </td>
                        <td className="p-3">
                          {battle.result === "victory" ? (
                            <span className="text-[#bfecff] font-bold uppercase flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">
                                emoji_events
                              </span>
                              Victory
                            </span>
                          ) : (
                            <span className="text-[#ffb4ab] font-bold uppercase flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">skull</span>
                              Defeat
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 flex flex-col gap-2">
              <h3 className="font-['Courier_Prime'] text-lg text-white uppercase bg-[#0f2744] p-2 border-2 border-white inline-block w-max mb-2 font-bold">
                General Leaderboard
              </h3>
              <div className="border-2 border-white bg-[#0c192c] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr className="border-b-2 border-white bg-[#1e3a5f] font-['JetBrains_Mono'] text-xs text-[#bfecff] uppercase">
                      <th className="p-3 border-r border-white w-16 text-center">Pos</th>
                      <th className="p-3 border-r border-white">Treinador</th>
                      <th className="p-3 text-right">XP Acumulado</th>
                    </tr>
                  </thead>
                  <tbody className="font-['JetBrains_Mono'] text-xs">
                    {leaderboard.map((entry) => (
                      <tr
                        key={entry.rank}
                        className={`border-b border-white hover:bg-[#1e3a5f] transition-colors ${
                          entry.rank === 1 ? "bg-[#0f2744]" : "even:bg-[#0f2744]/50"
                        } ${entry.isYou ? "text-[#f1c40f] font-bold" : ""}`}
                      >
                        <td
                          className={`p-3 border-r border-white text-center ${
                            entry.isYou ? "" : "text-[#bfecff]"
                          }`}
                        >
                          #{entry.rank}
                        </td>
                        <td className={`p-3 border-r border-white flex items-center gap-2`}>
                          {entry.rank === 1 && (
                            <span className="material-symbols-outlined text-sm text-[#f1c40f]">star</span>
                          )}
                          {entry.trainer}
                          {entry.isYou && (
                            <span className="text-[#f1c40f] text-[10px] ml-2">(YOU)</span>
                          )}
                        </td>
                        <td className={`p-3 text-right ${entry.isYou ? "" : "text-[#bfecff]"}`}>
                          {entry.xp.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
