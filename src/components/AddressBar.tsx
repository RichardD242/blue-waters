import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Globe, Search } from "lucide-react";
import { looksLikeUrl, normalizeUrl, hostnameOf } from "../utils/url.ts";

interface AddressBarProps {
  value: string;
  history: string[];
  onSearch: (query: string) => void;
  onVisit: (url: string) => void;
}

interface Suggestion {
  type: "visit" | "search" | "history";
  label: string;
  value: string;
}

export default function AddressBar({ value, history, onSearch, onVisit }: AddressBarProps) {
  const [input, setInput] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function buildSuggestions(raw: string): Suggestion[] {
    const trimmed = raw.trim();
    if (!trimmed) {
      return [];
    }

    const primary: Suggestion = looksLikeUrl(trimmed)
      ? { type: "visit", label: `visit ${hostnameOf(trimmed)}`, value: trimmed }
      : { type: "search", label: `search for "${trimmed}"`, value: trimmed };

    const historyMatches = history
      .filter(
        (entry) =>
          entry.toLowerCase().includes(trimmed.toLowerCase()) && entry.toLowerCase() !== trimmed.toLowerCase(),
      )
      .slice(0, 5)
      .map((entry) => ({ type: "history" as const, label: entry, value: entry }));

    return [primary, ...historyMatches];
  }

  const suggestions = buildSuggestions(input);

  function commit(suggestion: Suggestion) {
    setOpen(false);
    if (suggestion.type === "visit") {
      onVisit(normalizeUrl(suggestion.value));
    } else {
      onSearch(suggestion.value);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }
    if (open && suggestions[highlighted]) {
      commit(suggestions[highlighted]);
      return;
    }
    if (looksLikeUrl(trimmed)) {
      onVisit(normalizeUrl(trimmed));
    } else {
      onSearch(trimmed);
    }
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((current) => (current - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {looksLikeUrl(input) ? (
            <Globe
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500"
            />
          ) : (
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500"
            />
          )}
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setHighlighted(0);
              setOpen(true);
            }}
            onFocus={(event) => event.target.select()}
            onKeyDown={handleKeyDown}
            placeholder="search or enter website"
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-5 text-sm text-slate-700 shadow-sm outline-none transition-shadow duration-150 placeholder:text-slate-300 focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </form>
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {suggestions.map((suggestion, index) => (
            <li key={`${suggestion.type}-${suggestion.value}`}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commit(suggestion)}
                onMouseEnter={() => setHighlighted(index)}
                className={
                  index === highlighted
                    ? "flex w-full items-center gap-3 bg-slate-50 px-4 py-2.5 text-left text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-100"
                    : "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-600 dark:text-slate-300"
                }
              >
                {suggestion.type === "history" ? (
                  <Search size={14} className="shrink-0 text-slate-200 dark:text-slate-600" />
                ) : suggestion.type === "visit" ? (
                  <Globe size={14} className="shrink-0 text-slate-300 dark:text-slate-500" />
                ) : (
                  <Search size={14} className="shrink-0 text-slate-300 dark:text-slate-500" />
                )}
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
