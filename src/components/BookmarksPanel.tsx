import type { SearchResult } from "../api/tavilySearch.ts";

interface BookmarksPanelProps {
  bookmarks: SearchResult[];
  onRemove: (result: SearchResult) => void;
}

export default function BookmarksPanel({ bookmarks, onRemove }: BookmarksPanelProps) {
  return (
    <div className="w-full max-w-2xl border-b border-slate-100 bg-slate-50 px-4 py-6">
      {bookmarks.length === 0 ? (
        <p className="text-sm text-slate-400">nothing saved yet star a result to keep it here</p>
      ) : (
        <ul className="space-y-1">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.url}
              className="flex items-start justify-between gap-4 rounded-2xl px-3 py-3 transition-colors duration-150 hover:bg-white"
            >
              <div>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2a3ce4] hover:underline"
                >
                  {bookmark.title}
                </a>
                <p className="text-sm text-slate-400">{bookmark.url}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(bookmark)}
                className="shrink-0 text-sm text-slate-300 transition-colors duration-150 hover:text-[#2a3ce4]"
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
