import { useState } from "react";

const STORAGE_KEY = "bluewaters:username";

export function useUserName() {
    const [name, setNameState] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

    function setName(value: string) {
        const trimmed = value.trim();
        if (!trimmed) return;
        localStorage.setItem(STORAGE_KEY, trimmed);
        setNameState(trimmed);
    }

    function clearName() {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }

    return { name, hasName: name !== null, setName, clearName };
}