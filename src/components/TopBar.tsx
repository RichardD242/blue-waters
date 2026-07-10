import { Link } from "react-router-dom";
import { History, Star } from "lucide-react";
import SearchBar from "./SearchBar.tsx";

interface TopBarProps {
  onSearch: (query: string) => void;
  initialValue: string;
  bookmarkCount: number;
  onToggleBookmarks: () => void;
  bookmarksOpen: boolean;
}

export default function TopBar({
  onSearch,
  initialValue,
  bookmarkCount,
  onToggleBookmarks,
  bookmarksOpen,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-center gap-4 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <img src="/bluewaterslogo.png" alt="blue waters" className="h-7 w-7 shrink-0" />
      <SearchBar onSearch={onSearch} initialValue={initialValue} compact />
      <button
        type="button"
        onClick={onToggleBookmarks}
        className={
          bookmarksOpen
            ? "flex shrink-0 items-center gap-1.5 rounded-full bg-[#2a3ce4] px-4 py-2 text-sm text-white transition-colors duration-150"
            : "flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 transition-colors duration-150 hover:border-[#2a3ce4] hover:text-[#2a3ce4] dark:border-slate-700 dark:text-slate-400"
        }
      >
        <Star size={16} fill={bookmarksOpen ? "currentColor" : "none"} />
        saved
        {bookmarkCount > 0 && <span>{bookmarkCount}</span>}
      </button>
      <Link
        to="/history"
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 transition-colors duration-150 hover:border-[#2a3ce4] hover:text-[#2a3ce4] dark:border-slate-700 dark:text-slate-400"
      >
        <History size={16} />
        history
      </Link>
    </header>
  );
}
