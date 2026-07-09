import { useEffect, useState } from "react";

const STORAGE_KEY = "bluewaters:history";
const MAX_ENTRIES = 50;

function readHistory(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => readHistory());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  function addEntry(query: string) {
    setHistory((current) => [query, ...current.filter((entry) => entry !== query)].slice(0, MAX_ENTRIES));
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, addEntry, clearHistory };
}
