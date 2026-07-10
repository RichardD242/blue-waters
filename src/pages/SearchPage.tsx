import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import TopBar from "../components/TopBar.tsx";
import BookmarksPanel from "../components/BookmarksPanel.tsx";
import ResultsList from "../components/ResultsList.tsx";
import { search } from "../api/tavilySearch.ts";
import type { SearchResult } from "../api/tavilySearch.ts";
import { useBookmarks } from "../hooks/useBookmarks.ts";
import { useSearchLimit } from "../hooks/useSearchLimit.ts";
import { useSearchHistory } from "../hooks/useSearchHistory.ts";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "limited">("idle");
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const { useSearch } = useSearchLimit();
  const { addEntry } = useSearchHistory();
  const lastQuery = useRef("");

  useEffect(() => {
    if (!query) {
      navigate("/home", { replace: true });
      return;
    }
    if (query === lastQuery.current) {
      return;
    }
    lastQuery.current = query;

    if (!useSearch()) {
      setStatus("limited");
      return;
    }

    addEntry(query);
    setStatus("loading");
    const startedAt = performance.now();
    search(query)
      .then((nextResults) => {
        setResults(nextResults);
        setElapsed(performance.now() - startedAt);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    document.title = query ? `${query} — blue waters` : "blue waters";
  }, [query]);

  function handleSearch(nextQuery: string) {
    setSearchParams({ q: nextQuery });
  }

  if (!query) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white dark:bg-slate-900">
      <TopBar
        onSearch={handleSearch}
        initialValue={query}
        bookmarkCount={bookmarks.length}
        onToggleBookmarks={() => setBookmarksOpen((open) => !open)}
        bookmarksOpen={bookmarksOpen}
      />
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
          about {results.length} results ({(elapsed / 1000).toFixed(2)} seconds)
        </p>
      )}
      {status === "idle" && results.length === 0 && (
        <p className="pt-10 text-slate-400 dark:text-slate-500">no results found for "{query}"</p>
      )}
      <ResultsList results={results} isBookmarked={isBookmarked} onToggleBookmark={toggleBookmark} />
    </main>
  );
}
