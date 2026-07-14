import { useState } from "react";
import type { FormEvent } from "react";
import { Lock } from "lucide-react";

interface LockScreenProps {
  onUnlock: (pin: string) => Promise<boolean>;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = await onUnlock(pin);
    if (!ok) {
      setError("wrong passcode");
      setPin("");
      return;
    }
    setError("");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4 dark:bg-slate-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a3ce4]/10 text-[#2a3ce4]">
        <Lock size={22} />
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300">enter your passcode</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          className="w-48 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-center text-lg tracking-widest outline-none focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded-full bg-[#2a3ce4] px-8 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#2432b8]"
        >
          unlock
        </button>
      </form>
    </div>
  );
}