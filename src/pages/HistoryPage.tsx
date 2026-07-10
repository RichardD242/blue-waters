import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useSearchHistory } from "../hooks/useSearchHistory.ts";

export default function HistoryPage() {
  const { history, clearHistory } = useSearchHistory();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 bg-white px-4 py-16 dark:bg-slate-900">
      <Link
        to="/home"
        className="flex items-center gap-1 self-start text-sm text-slate-400 transition-colors duration-150 hover:text-[#2a3ce4] dark:text-slate-500"
      >
        <ArrowLeft size={16} />
        back home
      </Link>
      <button
        type="button"
        onClick={clearHistory}
        className="flex items-center gap-2 rounded-full bg-red-600 px-10 py-4 text-lg font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-red-700"
      >
        <Trash2 size={20} />
        delete history
      </button>
      {history.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">nothing searched yet</p>
      ) : (
        <ul className="w-full max-w-md space-y-5">
          {history.map((entry) => (
            <li key={entry}>
              <Link
                to={`/search?q=${encodeURIComponent(entry)}`}
                className="text-lg text-[#2a3ce4] hover:underline"
              >
                {entry}
              </Link>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                {window.location.origin}/search?q={encodeURIComponent(entry)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
