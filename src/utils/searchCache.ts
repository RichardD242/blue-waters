import type { SearchResult } from "../api/tavilySearch.ts";

const CACHE_KEY = "bluewaters:search-cache";
const MAX_ENTRIES = 100;
const TTL_MS = 1000 * 60 * 60 * 24;

interface CacheEntry {
  results: SearchResult[];
  elapsedMs: number;
  cachedAt: number;
}

function normalize(query: string): string {
  return query.trim().toLowerCase();
}

function readCache(): Record<string, CacheEntry> {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as Record<string, CacheEntry>;
  } catch {
    return {};
  }
}

export function getCachedSearch(query: string): CacheEntry | null {
  const entry = readCache()[normalize(query)];
  if (!entry) {
    return null;
  }
  if (Date.now() - entry.cachedAt > TTL_MS) {
    return null;
  }
  return entry;
}

export function setCachedSearch(query: string, results: SearchResult[], elapsedMs: number): void {
  const cache = readCache();
  const key = normalize(query);
  delete cache[key];
  const entries = Object.entries(cache);
  const kept = entries.length >= MAX_ENTRIES ? entries.slice(entries.length - MAX_ENTRIES + 1) : entries;
  const next = Object.fromEntries([...kept, [key, { results, elapsedMs }]]);
  localStorage.setItem(CACHE_KEY, JSON.stringify(next));
}
