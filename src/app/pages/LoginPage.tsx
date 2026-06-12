import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate("/lobby");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#0c192c]">
      <main className="w-full max-w-md bg-[#1e3a5f] border-2 border-white flex flex-col relative z-10">
        <header className="w-full border-b-2 border-white p-4 flex flex-col items-center justify-center bg-[#0f2744] text-center">
          <span
            className="material-symbols-outlined text-[#f1c40f] mb-2 text-5xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            videogame_asset
          </span>
          <h1 className="font-['Courier_Prime'] text-2xl text-[#f1c40f] uppercase tracking-[0.05em] font-bold">
            POKÉMON
          </h1>
          <h2 className="font-['Courier_Prime'] text-lg text-white uppercase mt-1 font-bold">
            AUTO-BATTLER RPG
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="font-['JetBrains_Mono'] text-xs font-medium text-[#f1c40f] uppercase"
            >
              Nome do Treinador
            </label>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bfecff]">
                person
              </span>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="DIGITE SEU NOME..."
                required
                className="w-full bg-[#0f2744] border-2 border-white text-white font-['JetBrains_Mono'] text-xs py-3 pl-10 pr-4 focus:outline-none focus:border-[#f1c40f] focus:ring-0 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-['JetBrains_Mono'] text-xs font-medium text-[#f1c40f] uppercase"
            >
              Senha
            </label>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bfecff]">
                key
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full bg-[#0f2744] border-2 border-white text-white font-['JetBrains_Mono'] text-xs py-3 pl-10 pr-4 focus:outline-none focus:border-[#f1c40f] focus:ring-0 transition-colors"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-[#f1c40f] border-2 border-[#f1c40f] text-black font-['JetBrains_Mono'] text-sm font-bold py-3 uppercase hover:bg-transparent hover:text-[#f1c40f] transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                login
              </span>
              Acessar Arena
            </button>
          </div>
        </form>

        <footer className="p-4 border-t-2 border-white bg-[#0f2744] text-center">
          <a
            href="#"
            className="font-['JetBrains_Mono'] text-[10px] text-[#f1c40f] underline hover:text-[#bfecff] transition-colors uppercase tracking-widest"
          >
            Criar novo perfil de Treinador
          </a>
        </footer>
      </main>

      <div
        className="fixed inset-0 pointer-events-none opacity-10 z-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]"
        style={{ backgroundSize: "32px 32px" }}
      ></div>
    </div>
  );
}
