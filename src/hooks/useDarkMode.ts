import { useEffect, useState } from "react";

const STORAGE_KEY = "bluewaters:theme";

function readInitial(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return stored === "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export interface DarkModeControls {
  dark: boolean;
  toggle: () => void;
}

export function useDarkMode(): DarkModeControls {
  const [dark, setDark] = useState(() => readInitial());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggle: () => setDark((current) => !current) };
}
