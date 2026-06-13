import { Link, useLocation } from "react-router";

export default function SideNavBar() {
  const location = useLocation();

  const navItems = [
    { path: "/lobby", icon: "swords", label: "BATTLE" },
    { path: "/team", icon: "groups", label: "TEAM" },
    { path: "/shop", icon: "shopping_cart", label: "SHOP" },
    { path: "/dex", icon: "menu_book", label: "DEX" },
    { path: "/quests", icon: "assignment", label: "QUESTS" },
  ];

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 shrink-0 border-r-2 border-white bg-[#1e3a5f] py-8 gap-4 sticky top-0">
      <div className="px-8 mb-4">
        <h2 className="font-['Courier_Prime'] text-lg font-bold text-[#f1c40f]">TRAINER RED</h2>
        <p className="font-['JetBrains_Mono'] text-xs text-[#bfecff] mt-1 uppercase">
          LVL 42 CHAMPION
        </p>
      </div>
      <ul className="flex flex-col w-full font-['JetBrains_Mono'] text-sm font-bold">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 py-3 w-full transition-all ${
                  isActive
                    ? "text-[#f1c40f] font-bold border-l-4 border-[#f1c40f] pl-2 bg-[#f1c40f]/10"
                    : "text-[#bfecff] pl-4 hover:bg-[#f1c40f]/20 hover:text-[#f1c40f]"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
