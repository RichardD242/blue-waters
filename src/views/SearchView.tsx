import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BookmarksPanel from "../components/BookmarksPanel.tsx";
import ResultsList from "../components/ResultsList.tsx";
import { search } from "../api/tavilySearch.ts";
import type { SearchResult } from "../api/tavilySearch.ts";
import type { Tab } from "../types.ts";
import { useBookmarks } from "../hooks/useBookmarks.ts";
import { useSearchLimit } from "../hooks/useSearchLimit.ts";
import { useSearchHistory } from "../hooks/useSearchHistory.ts";

interface SearchViewProps {
  tab: Tab;
  onResults: (tab: Tab, results: SearchResult[], elapsedMs: number) => void;
}

export default function SearchView({ tab, onResults }: SearchViewProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "limited">(tab.results ? "idle" : "loading");
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const { useSearch } = useSearchLimit();
  const { addEntry } = useSearchHistory();

  useEffect(() => {
    if (tab.results !== null) {
      setStatus("idle");
      return;
    }

    if (!useSearch()) {
      setStatus("limited");
      return;
    }

    addEntry(tab.query);
    setStatus("loading");
    const startedAt = performance.now();
    search(tab.query)
      .then((results) => {
        onResults(tab, results, performance.now() - startedAt);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab.id, tab.query, tab.results]);

  const results = tab.results ?? [];

  return (
    <main className="flex flex-1 flex-col items-center bg-white dark:bg-slate-900">
      <div className="flex w-full max-w-2xl items-center justify-end px-4 pt-4">
        <button
          type="button"
          onClick={() => setBookmarksOpen((open) => !open)}
          className={
            bookmarksOpen
              ? "rounded-full bg-[#2a3ce4] px-4 py-2 text-sm text-white"
              : "rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
          }
        >
          saved {bookmarks.length > 0 && `(${bookmarks.length})`}
        </button>
      </div>
      {bookmarksOpen && <BookmarksPanel bookmarks={bookmarks} onRemove={toggleBookmark} />}
      {status === "loading" && (
        <p className="flex items-center gap-2 pt-10 text-slate-400 dark:text-slate-500">
          <Loader2 size={16} className="animate-spin" />
          searching
        </p>
      )}
      {status === "error" && (
        <p className="pt-10 text-slate-400 dark:text-slate-500">
          something went wrong check the tavily api key and try again
        </p>
      )}
      {status === "limited" && <p className="pt-10 text-slate-400 dark:text-slate-500">out of credits</p>}
      {status === "idle" && results.length > 0 && (
        <p className="w-full max-w-2xl px-4 pt-6 text-sm text-slate-400 dark:text-slate-500">
          about {results.length} results ({(tab.elapsedMs / 1000).toFixed(2)} seconds)
        </p>
      )}
      {status === "idle" && results.length === 0 && (
        <p className="pt-10 text-slate-400 dark:text-slate-500">no results found for "{tab.query}"</p>
      )}
      <ResultsList results={results} isBookmarked={isBookmarked} onToggleBookmark={toggleBookmark} />
    </main>
  );
}
