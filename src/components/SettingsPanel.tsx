import { useState } from "react";
import type { FormEvent } from "react";
import { Lock, LockOpen, Moon, Settings, Sun, UserX } from "lucide-react";
import type { LockControls } from "../hooks/useLock.ts";

interface SettingsPanelProps {
  dark: boolean;
  onToggleDark: () => void;
  lock: LockControls;
  onClearName: () => void;
}

export default function SettingsPanel({ dark, onToggleDark, lock, onClearName }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSetPasscode(event: FormEvent) {
    event.preventDefault();
    if (pin.length < 4) {
      setError("passcode must be at least 4 digits");
      return;
    }
    if (pin !== confirm) {
      setError("passcodes don't match");
      return;
    }
    await lock.setPasscode(pin);
    setPin("");
    setConfirm("");
    setError("");
    setEditing(false);
  }

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
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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

          <button
            type="button"
            onClick={onClearName}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <UserX size={16} />
            forget my name
          </button>

          {!lock.hasPasscode && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Lock size={16} />
              set passcode
            </button>
          )}

          {lock.hasPasscode && (
            <>
              <button
                type="button"
                onClick={lock.lock}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Lock size={16} />
                lock now
              </button>
              <button
                type="button"
                onClick={lock.removePasscode}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <LockOpen size={16} />
                remove passcode
              </button>
            </>
          )}

          {editing && (
            <form onSubmit={handleSetPasscode} className="flex flex-col gap-2 px-3 py-2">
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                value={pin}
                onChange={(event) => setPin(event.target.value)}
                placeholder="new passcode"
                className="w-full rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-[#2a3ce4] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <input
                type="password"
                inputMode="numeric"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                placeholder="confirm passcode"
                className="w-full rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-[#2a3ce4] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                className="rounded-full bg-[#2a3ce4] px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#2432b8]"
              >
                save
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}