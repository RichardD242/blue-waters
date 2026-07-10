import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.tsx";
import SettingsPanel from "../components/SettingsPanel.tsx";
import { useSearchLimit } from "../hooks/useSearchLimit.ts";

interface HomePageProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function HomePage({ dark, onToggleDark }: HomePageProps) {
  const navigate = useNavigate();
  const { remaining, limit } = useSearchLimit();

  useEffect(() => {
    document.title = "blue waters";
  }, []);

  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center gap-10 bg-white px-4 py-24 dark:bg-slate-900">
      <SettingsPanel dark={dark} onToggleDark={onToggleDark} />
      <div className="flex items-center gap-3">
        <img src="/bluewaterslogo.png" alt="" className="h-12 w-12" />
        <span className="font-serif text-5xl text-[#2a3ce4]">Blue Waters</span>
      </div>
      <p className="-mt-6 text-sm text-slate-400 dark:text-slate-500">the best low cortisol search engine</p>
      <SearchBar onSearch={handleSearch} />
      <p className="text-xs text-slate-300 dark:text-slate-600">
        {remaining} of {limit} searches left today
      </p>
    </main>
  );
}
