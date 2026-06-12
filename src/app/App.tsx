import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import LobbyPage from "./pages/LobbyPage";
import HistoryPage from "./pages/HistoryPage";
import BattlePage from "./pages/BattlePage";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark size-full min-h-screen bg-[#0c192c] text-white">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/team" element={<PlaceholderPage title="EQUIPE" />} />
          <Route path="/shop" element={<PlaceholderPage title="LOJA" />} />
          <Route path="/dex" element={<PlaceholderPage title="POKÉDEX" />} />
          <Route path="/quests" element={<PlaceholderPage title="MISSÕES" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}