import { useState } from "react";
import { Moon, Settings, Sun } from "lucide-react";

interface SettingsPanelProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function SettingsPanel({ dark, onToggleDark }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  return (

    <div className="absolute right-4 top-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="settings"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-150 hover:border-[#2a3ce4] hover:text-[#2a3ce4] dark:border-slate-700 dark:text-slate-400"
      >
        <Settings size={18} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={onToggleDark}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <span className="flex items-center gap-2">
              {dark ? <Moon size={16} /> : <Sun size={16} />}
              dark mode
            </span>
            <span
              className={
                dark
                  ? "flex h-5 w-9 shrink-0 items-center rounded-full bg-[#2a3ce4] px-0.5 transition-colors duration-150"
                  : "flex h-5 w-9 shrink-0 items-center rounded-full bg-slate-200 px-0.5 transition-colors duration-150 dark:bg-slate-600"
              }
            >
              <span
                className={
                  dark
                    ? "h-4 w-4 translate-x-4 rounded-full bg-white transition-transform duration-150"
                    : "h-4 w-4 translate-x-0 rounded-full bg-white transition-transform duration-150"
                }
              />
            </span>
          </button>
          
        </div>
      )}
    </div>
  );
}
