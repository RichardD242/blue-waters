import { useEffect, useState } from "react";
import type { SearchResult } from "../api/tavilySearch.ts";

const STORAGE_KEY = "bluewaters:bookmarks";

function readBookmarks(): SearchResult[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as SearchResult[];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<SearchResult[]>(() => readBookmarks());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  function isBookmarked(url: string) {
    return bookmarks.some((bookmark) => bookmark.url === url);
  }

  function toggleBookmark(result: SearchResult) {
    setBookmarks((current) =>
      isBookmarked(result.url)
        ? current.filter((bookmark) => bookmark.url !== result.url)
        : [...current, result],
    );
  }

  return { bookmarks, isBookmarked, toggleBookmark };
}
