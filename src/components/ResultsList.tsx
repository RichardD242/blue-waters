import { useState } from "react";
import { Check, Copy, Star } from "lucide-react";
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

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function breadcrumb(url: string): string {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return [parsed.hostname.replace(/^www\./, ""), ...segments].join(" › ");
  } catch {
    return url;
  }
}

function favicon(url: string): string {
  return `https://icons.duckduckgo.com/ip3/${hostname(url)}.ico`;
}

export default function ResultsList({ results, isBookmarked, onToggleBookmark }: ResultsListProps) {

  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (results.length === 0) {
    return null;
  }

  async function handleCopy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl((current) => (current === url ? null : current)), 1500);
  }

  return (
    <ul className="w-full max-w-2xl space-y-2 px-4 py-8">
      {results.map((result) => (
        <li
          key={result.url}
          className="flex items-start justify-between gap-4 rounded-2xl px-3 py-3 transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <img src={favicon(result.url)} alt="" className="h-4 w-4 rounded-sm" />
              <p className="text-sm text-slate-500 dark:text-slate-400">{breadcrumb(result.url)}</p>
            </div>
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-[#2a3ce4] hover:underline"
            >
              {result.title}
            </a>
            <p className="mt-1 text-slate-500 dark:text-slate-400">{snippet(result.description)}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopy(result.url)}
              aria-label="copy link"
              className="text-slate-200 transition-colors duration-150 hover:text-[#2a3ce4] dark:text-slate-700"
            >
              {copiedUrl === result.url ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button
              type="button"
              onClick={() => onToggleBookmark(result)}
              aria-label={isBookmarked(result.url) ? "remove bookmark" : "save bookmark"}
              className={
                isBookmarked(result.url)
                  ? "text-[#2a3ce4] transition-colors duration-150"
                  : "text-slate-200 transition-colors duration-150 hover:text-[#2a3ce4] dark:text-slate-700"
              }
            >
              <Star size={20} fill={isBookmarked(result.url) ? "currentColor" : "none"} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
