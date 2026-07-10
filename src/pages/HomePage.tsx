import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.tsx";
import SettingsPanel from "../components/SettingsPanel.tsx";
import { useSearchLimit } from "../hooks/useSearchLimit.ts";

interface HomePageProps {
  dark: boolean;
  onToggleDark: () => void;
}

const GITHUB_URL = "https://github.com/RichardD242/blue-waters";

export default function HomePage({ dark, onToggleDark }: HomePageProps) {
  const navigate = useNavigate();
  const { remaining, limit } = useSearchLimit();

  useEffect(() => {
    document.title = "blue waters";
  }, []);

  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function focusSearch() {
    document.getElementById("search-input")?.focus();
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-14 bg-white px-4 dark:bg-slate-900">
      <nav className="absolute left-4 top-4 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
        <a href="/home" className="transition-colors duration-150 hover:text-[#2a3ce4]">
          home
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-150 hover:text-[#2a3ce4]"
        >
          github
        </a>
        <button
          type="button"
          onClick={focusSearch}
          className="transition-colors duration-150 hover:text-[#2a3ce4]"
        >
          search
        </button>
      </nav>
      <SettingsPanel dark={dark} onToggleDark={onToggleDark} />
      <div className="flex items-center gap-5">
        <img src="/bluewaterslogo.png" alt="" className="h-44 w-44" />
        <span className="font-serif text-9xl text-[#2a3ce4]">Blue Waters</span>
      </div>
      <p className="-mt-10 text-lg text-slate-400 dark:text-slate-500">the best low cortisol search engine</p>
      <SearchBar onSearch={handleSearch} />
      <p className="text-sm text-slate-300 dark:text-slate-600">
        {remaining} of {limit} searches left today
      </p>
    </main>
  );
}
