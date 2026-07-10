import { useState } from "react";
import type { FormEvent } from "react";

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

  return (
    <form onSubmit={handleSubmit} className={compact ? "w-full max-w-md" : "w-full max-w-2xl"}>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="search something"
        autoFocus={!compact}
        className={
          compact
            ? "w-full rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm outline-none transition-shadow duration-150 placeholder:text-slate-300 focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            : "w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-lg text-slate-700 shadow-sm outline-none transition-shadow duration-150 placeholder:text-slate-300 focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        }
      />
    </form>
  );
}
