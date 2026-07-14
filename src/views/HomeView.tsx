import SearchBar from "../components/SearchBar.tsx";
import SettingsPanel from "../components/SettingsPanel.tsx";
import type { LockControls } from "../hooks/useLock.ts";

interface HomeViewProps {
  dark: boolean;
  onToggleDark: () => void;
  onSearch: (query: string) => void;
  lock: LockControls;
  isPrivate: boolean;
  name: string;
  onClearName: () => void;
}

const GITHUB_URL = "https://github.com/RichardD242/blue-waters";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "good morning";
  if (hour < 18) return "good afternoon";
  return "good evening";
}

export default function HomeView({ dark, onToggleDark, onSearch, lock, isPrivate, name, onClearName }: HomeViewProps) {
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
      <SettingsPanel dark={dark} onToggleDark={onToggleDark} lock={lock} onClearName={onClearName} />
      <div className="flex flex-col items-center gap-5">
        {!isPrivate && (
          <p className="text-lg text-slate-400 dark:text-slate-500">
            {greeting()}, {name}
          </p>
        )}
        <div className="flex items-center gap-5">
          <img src="/bluewaterslogo.png" alt="" className="h-44 w-44" />
          <span className="font-serif text-9xl text-[#2a3ce4]">
            {isPrivate ? (
              <>
                <span className="underline">Private</span> Waters
              </>
            ) : (
              "Blue Waters"
            )}
          </span>
        </div>
      </div>
      <p className="-mt-10 text-lg text-slate-400 dark:text-slate-500">the best low cortisol search engine</p>
      <SearchBar onSearch={onSearch} />
    </main>
  );
}