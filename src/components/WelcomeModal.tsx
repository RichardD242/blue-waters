import { useState } from "react";
import type { FormEvent } from "react";

interface WelcomeModalProps {
    onSubmit: (name: string) => void;
}

export default function WelcomeModal({ onSubmit }: WelcomeModalProps) {
    const [value, setValue] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!value.trim()) return;
        onSubmit(value);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
            <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
                <img
                    src="/bluewaterslogo.png"
                    alt=""
                    className="mx-auto h-16 w-16"
                />
                <h1 className="mt-4 text-center text-2xl font-serif text-[#2a3ce4] dark:text-[#7d8bf4]">Welcome to Blue Waters</h1>
                <p className="mt-2 text-center text-slate-500 dark:text-slate-400">what's your name?</p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                    <input
                        type="text"
                        autoFocus
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        placeholder="your name"
                        className="w-full rounded-full border border-slate-200 bg-white px-5 py-2.5 text-center text-sm text-slate-900 outline-none focus:border-[#2a3ce4] focus:ring-4 focus:ring-[#2a3ce4]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-[#2a3ce4] px-8 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#2432b8]"
                    >
                        continue
                    </button>
                </form>
            </div>
        </div>
    );
}