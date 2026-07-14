import { useEffect, useState } from "react";

const HASH_KEY = "bluewaters:passcode-hash";
const UNLOCKED_KEY = "bluewaters:unlocked-at";
const SESSION_MS = 1000 * 60 * 30;

export interface LockControls {
    hasPasscode: boolean;
    unlocked: boolean;
    setPasscode: (pin: string) => Promise<void>;
    removePasscode: () => void;
    unlock: (pin: string) => Promise<boolean>;
    lock: () => void;
}

async function hashPin(pin: string): Promise<string> {
    const data = new TextEncoder().encode(pin);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function readSession(): boolean {
    const raw = localStorage.getItem(UNLOCKED_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < SESSION_MS;
}
export function useLock(): LockControls {

    const [hash, setHash] = useState<string | null>(() => localStorage.getItem(HASH_KEY));
    const [unlocked, setUnlocked] = useState(() => (hash ? readSession() : true));

    useEffect(() => {
        if (!unlocked) return;
        const interval = setInterval(() => {
            if (!readSession()) setUnlocked(false);
        }, 5000);
        return () => clearInterval(interval);
    }, [unlocked]);

    async function setPasscode(pin: string) {
        const next = await hashPin(pin);
        localStorage.setItem(HASH_KEY, next);
        localStorage.setItem(UNLOCKED_KEY, String(Date.now()));
        setHash(next);
        setUnlocked(true);
    }

    function removePasscode() {
        localStorage.removeItem(HASH_KEY);
        localStorage.removeItem(UNLOCKED_KEY);
        setHash(null);
        setUnlocked(true);
    }

    async function unlock(pin: string): Promise<boolean> {
        const attempt = await hashPin(pin);
        if (attempt !== hash) return false;
        localStorage.setItem(UNLOCKED_KEY, String(Date.now()));
        setUnlocked(true);
        return true;
    }

    function lock() {
        localStorage.removeItem(UNLOCKED_KEY);
        setUnlocked(false);
    }

    return { hasPasscode: hash !== null, unlocked, setPasscode, removePasscode, unlock, lock };
}