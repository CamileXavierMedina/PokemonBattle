import { useState } from "react";
import { useNavigate } from "react-router";
import TopAppBar from "../components/TopAppBar";
import SideNavBar from "../components/SideNavBar";
import Footer from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import rattataImgBW from "../../imports/image-3.png";
import charizardImgBW from "../../imports/image-10.png";
import pikachuImgBW from "../../imports/image-9.png";
import gengarImgBW from "../../imports/image-8.png";
import blastoiseImgBW from "../../imports/image-7.png";

const pokemonData = [
  {
    id: 1,
    name: "PIKACHU",
    level: 50,
    atk: 75,
    def: 40,
    spd: 90,
    image: pikachuImgBW,
  },
  {
    id: 2,
    name: "CHARIZARD",
    level: 55,
    atk: 85,
    def: 60,
    spd: 80,
    image: charizardImgBW,
  },
  {
    id: 3,
    name: "BLASTOISE",
    level: 52,
    atk: 70,
    def: 80,
    spd: 65,
    image: blastoiseImgBW,
  },
  {
    id: 4,
    name: "RATTATA",
    level: 51,
    atk: 72,
    def: 75,
    spd: 60,
    image: rattataImgBW,
  },
];

export default function LobbyPage() {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState<number[]>([1, 2]);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePokemon = (id: number) => {
    if (activeTeam.includes(id)) {
      setActiveTeam(activeTeam.filter((pId) => pId !== id));
    } else if (activeTeam.length < 3) {
      setActiveTeam([...activeTeam, id]);
    }
  };

  const getActivePokemon = () =>
    pokemonData.filter((p) => activeTeam.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#0c192c] text-white">
      <TopAppBar />
      <div className="flex flex-1">
        <SideNavBar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-white pb-4">
            <div>
              <h1 className="font-['Courier_Prime'] text-3xl text-[#f1c40f] uppercase tracking-[0.1em] font-bold">
                SELECTION LOBBY
              </h1>
              <p className="font-['Arimo'] text-base text-[#bfecff] mt-2">
                Configure your active roster for the upcoming engagement.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="QUERY POKEDEX..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 font-['JetBrains_Mono'] text-xs flex-1 md:w-64 bg-[#0f2744] border-2 border-white text-white focus:border-[#f1c40f] focus:outline-none"
              />
              <button className="border-2 border-[#f1c40f] bg-transparent text-white px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase transition-all hover:bg-[#f1c40f] hover:text-black flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  search
                </span>
                PESQUISAR
              </button>
            </div>
          </header>

          <section className="mb-8 bg-[#1e3a5f] border-2 border-white p-4">
            <div className="font-['JetBrains_Mono'] text-sm text-[#f1c40f] mb-4 uppercase border-b-2 border-white pb-2">
              &gt; QUICK DEPLOYMENT REPOSITORY
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pokemonData.map((pokemon) => (
                <button
                  key={pokemon.id}
                  onClick={() => togglePokemon(pokemon.id)}
                  className={`py-3 font-['JetBrains_Mono'] text-xs text-center hover:-translate-y-1 transition-transform border-2 ${
                    activeTeam.includes(pokemon.id)
                      ? "bg-[#f1c40f] text-black border-[#f1c40f]"
                      : "border-[#f1c40f] bg-transparent text-white hover:bg-[#f1c40f] hover:text-black"
                  }`}
                >
                  {pokemon.name}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="font-['JetBrains_Mono'] text-sm text-[#f1c40f] mb-4 uppercase flex items-center gap-2">
              <span className="material-symbols-outlined">groups</span> ACTIVE
              TEAM ({activeTeam.length}/3)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((index) => {
                const pokemon = getActivePokemon()[index];
                if (pokemon) {
                  return (
                    <div
                      key={index}
                      className="bg-[#1e3a5f] border-2 border-white flex flex-col"
                    >
                      <div className="border-b-2 border-white p-2 bg-[#0f2744] flex justify-between items-center">
                        <span className="font-['JetBrains_Mono'] text-xs text-[#f1c40f]">
                          &gt; SLOT_0{index + 1}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#bfecff]">
                          LVL {pokemon.level}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col gap-4">
                        <div className="w-full h-48 border-2 border-white bg-[#0c192c] flex items-center justify-center overflow-hidden">
                          <ImageWithFallback
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                        <h3 className="font-['Courier_Prime'] text-lg text-[#f1c40f] uppercase border-b border-white pb-1 font-bold">
                          {pokemon.name}
                        </h3>
                        <div className="space-y-2">
                          <StatBar
                            label="Ataque"
                            value={pokemon.atk}
                            color="bg-[#e74c3c]"
                          />
                          <StatBar
                            label="Defesa"
                            value={pokemon.def}
                            color="bg-[#3498db]"
                          />
                          <StatBar
                            label="Veloc."
                            value={pokemon.spd}
                            color="bg-[#f1c40f]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={index}
                    className="bg-[#1e3a5f] border-2 border-dashed border-white flex flex-col opacity-50"
                  >
                    <div className="border-b-2 border-white p-2 bg-[#0f2744] flex justify-between items-center">
                      <span className="font-['JetBrains_Mono'] text-xs text-[#bfecff]">
                        &gt; SLOT_0{index + 1} [EMPTY]
                      </span>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center h-full min-h-[300px]">
                      <span className="material-symbols-outlined text-5xl text-white opacity-50 mb-4">
                        add_box
                      </span>
                      <span className="font-['JetBrains_Mono'] text-xs text-[#bfecff] uppercase text-center">
                        Awaiting Assignment
                        <br />
                        Select from Repository
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="flex justify-end mt-8 border-t-2 border-white pt-4">
            <button
              onClick={() => navigate("/battle")}
              disabled={activeTeam.length === 0}
              className="bg-[#f1c40f] text-black border-2 border-[#f1c40f] font-['Courier_Prime'] text-2xl uppercase px-8 py-4 flex items-center gap-3 hover:bg-transparent hover:text-[#f1c40f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-[0.05em] font-bold"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              INICIAR BATALHA
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function StatBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-['JetBrains_Mono'] text-[10px] w-16 uppercase text-[#bfecff]">
        {label}
      </span>
      <div className="border-2 border-white h-3 w-full flex-1">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
