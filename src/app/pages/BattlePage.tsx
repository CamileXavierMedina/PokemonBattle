import { useState } from "react";
import { useNavigate } from "react-router";
import TopAppBar from "../components/TopAppBar";
import SideNavBar from "../components/SideNavBar";
import Footer from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import pikachuImgColor from "../../imports/image-9.png";
import charizardImgColor from "../../imports/image-10.png";
import blastoiseImgColor from "../../imports/image-7.png";
import gengarImgColor from "../../imports/image-8.png";

const playerTeam = [
  {
    name: "PIKACHU",
    hp: 80,
    maxHp: 100,
    image: pikachuImgColor
  },
  {
    name: "CHARIZARD",
    hp: 45,
    maxHp: 100,
    image: charizardImgColor
  },
  {
    name: "BLASTOISE",
    hp: 100,
    maxHp: 100,
    image: blastoiseImgColor
  },
];

const enemyTeam = [
  {
    name: "GENGAR",
    hp: 65,
    maxHp: 120,
    image: gengarImgColor
  },
  {
    name: "UNKNOWN",
    hp: 0,
    maxHp: 0,
    image: ""
  },
  {
    name: "UNKNOWN",
    hp: 0,
    maxHp: 0,
    image: ""
  },
];

const combatLog = [
  { message: "GENGAR usou Shadow Ball.", type: "enemy" },
  { message: "PIKACHU desviou!", type: "player" },
  { message: "PIKACHU usou Ataque Rápido!", type: "player" },
  { message: "Causou 15 de dano. GENGAR recuou.", type: "damage" },
  { message: "Aguardando comando..._", type: "waiting" },
];

export default function BattlePage() {
  const navigate = useNavigate();
  const [currentPlayer] = useState(playerTeam[0]);
  const [currentEnemy] = useState(enemyTeam[0]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c192c] text-white">
      <TopAppBar />
      <div className="flex flex-1">
        <SideNavBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-1 md:col-span-3">
              <div className="bg-[#1e3a5f] border-2 border-white h-full flex flex-col">
                <div className="border-b-2 border-white font-['JetBrains_Mono'] text-xs uppercase h-8 flex items-center px-4 text-[#bfecff]">
                  ALLIED FORCES
                </div>
                <div className="p-4 flex-1 flex flex-col gap-4">
                  {playerTeam.map((pokemon, index) => (
                    <PokemonListItem key={index} pokemon={pokemon} side="player" />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 flex flex-col gap-6">
              <div className="flex-1 min-h-[300px] flex justify-between items-center p-8 bg-[#0f2744] border-2 border-white relative">
                <div className="flex flex-col items-center gap-4 mt-auto">
                  <div className="w-32 h-32 border-2 border-[#bfecff] bg-[#0c192c] overflow-hidden relative flex items-center justify-center">
                    <ImageWithFallback
                      src={currentPlayer.image}
                      alt={currentPlayer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center font-['JetBrains_Mono'] text-xs bg-[#0c192c] border-2 border-white px-2 py-1">
                    LVL 25 {currentPlayer.name}
                  </div>
                </div>

                <div className="font-['Courier_Prime'] text-3xl text-[#f1c40f] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[0.1em] font-bold">
                  VS
                </div>

                <div className="flex flex-col items-center gap-4 mb-auto">
                  <div className="text-center font-['JetBrains_Mono'] text-xs bg-[#0c192c] border-2 border-white px-2 py-1">
                    LVL 28 {currentEnemy.name}
                  </div>
                  <div className="w-32 h-32 border-2 border-[#ffb4ab] bg-[#0c192c] overflow-hidden relative flex items-center justify-center">
                    <ImageWithFallback
                      src={currentEnemy.image}
                      alt={currentEnemy.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0c192c] border-2 border-[#f1c40f] h-48 p-4 font-['JetBrains_Mono'] text-sm text-white flex flex-col justify-end overflow-hidden">
                <div className="space-y-2 font-mono">
                  {combatLog.map((log, index) => (
                    <div
                      key={index}
                      className={`${
                        log.type === "enemy"
                          ? "text-[#bfecff]/50"
                          : log.type === "player"
                          ? "text-[#bfecff]"
                          : log.type === "damage"
                          ? "text-[#ffb4ab]"
                          : "text-white animate-pulse"
                      }`}
                    >
                      &gt; {log.message}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate("/lobby")}
                  className="border-2 border-[#f1c40f] bg-transparent text-white px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase transition-all hover:bg-[#f1c40f] hover:text-black"
                >
                  Voltar ao Lobby
                </button>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <div className="bg-[#1e3a5f] border-2 border-white h-full flex flex-col">
                <div className="border-b-2 border-white font-['JetBrains_Mono'] text-xs uppercase h-8 flex items-center px-4 text-[#ffb4ab]">
                  HOSTILE FORCES
                </div>
                <div className="p-4 flex-1 flex flex-col gap-4">
                  {enemyTeam.map((pokemon, index) => (
                    <PokemonListItem key={index} pokemon={pokemon} side="enemy" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function PokemonListItem({
  pokemon,
  side,
}: {
  pokemon: { name: string; hp: number; maxHp: number; image: string };
  side: "player" | "enemy";
}) {
  const isUnknown = pokemon.maxHp === 0;
  const hpPercent = pokemon.maxHp > 0 ? (pokemon.hp / pokemon.maxHp) * 100 : 0;

  return (
    <div
      className={`flex items-center gap-3 pb-3 border-b border-white last:border-b-0 ${
        side === "enemy" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="w-12 h-12 bg-[#0f2744] border-2 border-white shrink-0 overflow-hidden flex items-center justify-center">
        {isUnknown ? (
          <span className="material-symbols-outlined text-2xl text-white opacity-30">
            catching_pokemon
          </span>
        ) : (
          <ImageWithFallback
            src={pokemon.image}
            alt={pokemon.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <div
          className={`font-['JetBrains_Mono'] text-sm mb-1 ${
            isUnknown ? "text-white opacity-50" : ""
          }`}
        >
          {pokemon.name}
        </div>
        <div
          className={`border-2 h-3 w-full ${
            isUnknown ? "border-white opacity-50" : "border-white"
          }`}
        >
          <div
            className={`h-full ${
              isUnknown
                ? "bg-white opacity-50"
                : side === "enemy"
                ? "bg-[#e74c3c] ml-auto"
                : "bg-[#2ecc71]"
            }`}
            style={{ width: `${isUnknown ? 100 : hpPercent}%` }}
          ></div>
        </div>
        <div
          className={`font-['JetBrains_Mono'] text-[10px] mt-1 ${
            side === "enemy" ? "text-left" : "text-right"
          } ${isUnknown ? "text-white opacity-50" : ""}`}
        >
          {isUnknown ? "???/??? HP" : `${pokemon.hp}/${pokemon.maxHp} HP`}
        </div>
      </div>
    </div>
  );
}
