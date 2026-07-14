import { Plus, X, Globe, Search as SearchIcon, Home as HomeIcon, Clock, EyeOff } from "lucide-react";
import type { Tab } from "../types.ts";

interface TabBarProps {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onNew: () => void;
}

function iconFor(tab: Tab) {
  if (tab.private) return EyeOff;
  if (tab.mode === "site") return Globe;
  if (tab.mode === "search") return SearchIcon;
  if (tab.mode === "history") return Clock;
  return HomeIcon;
}

export default function TabBar({ tabs, activeId, onSelect, onClose, onNew }: TabBarProps) {
  return (
    <div className="flex w-full items-center gap-1 overflow-x-auto border-b border-slate-100 bg-slate-50 px-2 pt-2 dark:border-slate-800 dark:bg-slate-900">
      {tabs.map((tab) => {
        const Icon = iconFor(tab);
        const active = tab.id === activeId;
        const className = tab.private
          ? active
            ? "flex max-w-48 shrink-0 items-center gap-2 rounded-t-xl border border-b-0 border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            : "flex max-w-48 shrink-0 items-center gap-2 rounded-t-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-900"
          : active
          ? "flex max-w-48 shrink-0 items-center gap-2 rounded-t-xl border border-b-0 border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          : "flex max-w-48 shrink-0 items-center gap-2 rounded-t-xl px-3 py-2 text-sm text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800/60";
        const closeClassName = tab.private
          ? "ml-1 shrink-0 rounded-full p-0.5 text-slate-500 hover:bg-slate-700 hover:text-white"
          : "ml-1 shrink-0 rounded-full p-0.5 text-slate-300 hover:bg-slate-200 hover:text-slate-600 dark:text-slate-600 dark:hover:bg-slate-700";

        return (
          <button key={tab.id} type="button" onClick={() => onSelect(tab.id)} className={className}>
            <Icon size={13} className="shrink-0" />
            <span className="truncate">{tab.private ? "private" : tab.title || "new tab"}</span>
            <span
              role="button"
              tabIndex={-1}
              onClick={(event) => {
                event.stopPropagation();
                onClose(tab.id);
              }}
              className={closeClassName}
            >
              <X size={12} />
            </span>
          </button>
        );
      })}
      <button
        type="button"
        onClick={onNew}
        aria-label="new tab"
        className="ml-1 flex shrink-0 items-center justify-center rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#2a3ce4] dark:text-slate-500 dark:hover:bg-slate-800"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
