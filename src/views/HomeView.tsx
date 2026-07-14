import SearchBar from "../components/SearchBar.tsx";
import SettingsPanel from "../components/SettingsPanel.tsx";
import { useSearchLimit } from "../hooks/useSearchLimit.ts";

interface HomeViewProps {
  dark: boolean;
  onToggleDark: () => void;
  onSearch: (query: string) => void;
}

const GITHUB_URL = "https://github.com/RichardD242/blue-waters";

export default function HomeView({ dark, onToggleDark, onSearch }: HomeViewProps) {
  const { remaining, limit } = useSearchLimit();

  function focusSearch() {
    document.getElementById("search-input")?.focus();
  }

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-14 bg-white px-4 dark:bg-slate-900">
      <nav className="absolute left-4 top-4 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="transition-colors duration-150 hover:text-[#2a3ce4]">
          github
        </a>
        <button type="button" onClick={focusSearch} className="transition-colors duration-150 hover:text-[#2a3ce4]">
          search
        </button>
      </nav>
      <SettingsPanel dark={dark} onToggleDark={onToggleDark} />
      <div className="flex items-center gap-5">
        <img src="/bluewaterslogo.png" alt="" className="h-44 w-44" />
        <span className="font-serif text-9xl text-[#2a3ce4]">Blue Waters</span>
      </div>
      <p className="-mt-10 text-lg text-slate-400 dark:text-slate-500">the best low cortisol search engine</p>
      <SearchBar onSearch={onSearch} />
      <p className="text-sm text-slate-300 dark:text-slate-600">
        {remaining} of {limit} searches left today
      </p>
    </main>
  );
}
