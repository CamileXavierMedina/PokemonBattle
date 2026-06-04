export default function Footer() {
  return (
    <footer className="w-full flex justify-between items-center px-8 py-2 bg-[#0f2744] border-t-2 border-white shrink-0">
      <div className="font-['JetBrains_Mono'] text-xs text-[#f1c40f]">
        © 2004 POKÉ-BATTLE ENGINE. ALL RIGHTS RESERVED.
      </div>
      <div className="flex gap-4 font-['JetBrains_Mono'] text-[10px]">
        <a href="#" className="text-[#bfecff] hover:text-[#f1c40f] transition-colors">
          STATUS
        </a>
        <a href="#" className="text-[#bfecff] hover:text-[#f1c40f] transition-colors">
          LOGS
        </a>
        <a href="#" className="text-[#bfecff] hover:text-[#f1c40f] transition-colors">
          SERVER
        </a>
      </div>
    </footer>
  );
}
