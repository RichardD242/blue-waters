import { useEffect, useState } from "react";
import type { Tab, TabMode } from "../types.ts";

const TABS_KEY = "bluewaters:tabs";
const ACTIVE_KEY = "bluewaters:active-tab";

function createTab(mode: TabMode = "home"): Tab {
    return {
        id: crypto.randomUUID(),
        mode,
        title: "new tab",
        query: "",
        url: "",
        results: null,
        elapsedMs: 0,
    };
}

function readTabs(): Tab[] {
    const raw = localStorage.getItem(TABS_KEY);
    if (!raw) {
        return [createTab()];
    }
    try {
        const parsed = JSON.parse(raw) as Tab[];
        const normalized = parsed.map((tab) => ({ ...tab, results: tab.results ?? null, elapsedMs: tab.elapsedMs ?? 0 }));
        return normalized.length > 0 ? normalized : [createTab()];
    } catch {
        return [createTab()];
    }
}

function readActiveId(tabs: Tab[]): string {
    const raw = localStorage.getItem(ACTIVE_KEY);
    return raw && tabs.some((tab) => tab.id === raw) ? raw : tabs[0].id;
}

export function useTabs() {
    const [tabs, setTabs] = useState<Tab[]>(readTabs());
    const [activeId, setActiveId] = useState<string>(() => readActiveId(tabs));

    useEffect(() => {
        localStorage.setItem(TABS_KEY, JSON.stringify(tabs));
    }, [tabs]);

    useEffect(() => {
        localStorage.setItem(ACTIVE_KEY, activeId);
    }, [activeId]);

    function openTab(mode: TabMode = "home") {
        const tab = createTab(mode);
        setTabs((current) => [...current, tab]);
        setActiveId(tab.id);
        return tab.id;
    }
    function closeTab(id: string) {
        setTabs((current) => {
            const next = current.filter((tab) => tab.id !== id);
            if (next.length === 0) {
                const fallback = createTab();
                setActiveId(fallback.id);
                return [fallback];
            }
            if (id === activeId) {
                setActiveId(next[next.length -1].id);
            }
            return next;
        });
    }

    function updateTab(id: string, patch: Partial<Tab>) {
        setTabs((current) => current.map((tab) => (tab.id === id ? { ...tab, ...patch } : tab)));
    }

    const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

    return { tabs, activeTab, openTab, closeTab, setActiveId, updateTab };
}

