import { useNavigate } from "react-router";
import TopAppBar from "../components/TopAppBar";
import SideNavBar from "../components/SideNavBar";
import Footer from "../components/Footer";

export default function PlaceholderPage({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#0c192c] text-white">
      <TopAppBar />
      <div className="flex flex-1">
        <SideNavBar />
        <main className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full bg-[#1e3a5f] border-2 border-white p-8 text-center">
            <span
              className="material-symbols-outlined text-[#f1c40f] text-8xl mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              construction
            </span>
            <h1 className="font-['Courier_Prime'] text-3xl text-[#f1c40f] uppercase tracking-[0.1em] font-bold mb-4">
              {title}
            </h1>
            <p className="font-['Arimo'] text-base text-[#bfecff] mb-8">
              Esta funcionalidade está em desenvolvimento. Em breve estará disponível!
            </p>
            <button
              onClick={() => navigate("/lobby")}
              className="border-2 border-[#f1c40f] text-[#f1c40f] px-6 py-3 font-['JetBrains_Mono'] text-sm hover:bg-[#f1c40f] hover:text-black transition-colors uppercase tracking-widest"
            >
              Voltar ao Lobby
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
