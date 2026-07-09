import { Star } from "lucide-react";
import type { SearchResult } from "../api/tavilySearch.ts";

interface ResultsListProps {
  results: SearchResult[];
  isBookmarked: (url: string) => boolean;
  onToggleBookmark: (result: SearchResult) => void;
}

const SNIPPET_LENGTH = 160;

function snippet(description: string): string {
  const clean = description.replace(/\s+/g, " ").trim();
  return clean.length > SNIPPET_LENGTH ? `${clean.slice(0, SNIPPET_LENGTH).trimEnd()}…` : clean;
}

export default function ResultsList({ results, isBookmarked, onToggleBookmark }: ResultsListProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="w-full max-w-2xl space-y-2 px-4 py-8">
      {results.map((result) => (
        <li
          key={result.url}
          className="flex items-start justify-between gap-4 rounded-2xl px-3 py-3 transition-colors duration-150 hover:bg-slate-50"
        >
          <div>
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-[#2a3ce4] hover:underline"
            >
              {result.title}
            </a>
            <p className="text-sm text-slate-400">{result.url}</p>
            <p className="mt-1 text-slate-500">{snippet(result.description)}</p>
          </div>
          <button
            type="button"
            onClick={() => onToggleBookmark(result)}
            aria-label={isBookmarked(result.url) ? "remove bookmark" : "save bookmark"}
            className={
              isBookmarked(result.url)
                ? "shrink-0 text-[#2a3ce4] transition-colors duration-150"
                : "shrink-0 text-slate-200 transition-colors duration-150 hover:text-[#2a3ce4]"
            }
          >
            <Star size={20} fill={isBookmarked(result.url) ? "currentColor" : "none"} />
          </button>
        </li>
      ))}
    </ul>
  );
}
