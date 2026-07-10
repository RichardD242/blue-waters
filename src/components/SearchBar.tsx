import { useState } from "react";
import type { FormEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  compact?: boolean;
}

export default function SearchBar({ onSearch, initialValue = "", compact = false }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="search something"
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm outline-none transition-shadow duration-150 placeholder:text-slate-300 focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <Search size={22} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500" />
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="search something"
          autoFocus
          className="w-full rounded-2xl border border-slate-200 bg-white py-5 pl-14 pr-6 text-xl text-slate-700 shadow-sm outline-none transition-shadow duration-150 placeholder:text-slate-300 focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>
    </form>
  );
}
