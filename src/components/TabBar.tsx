import { Plus, X, Globe, Search as SearchIcon, Home as HomeIcon, Clock } from "lucide-react";
import type { Tab } from "../types.ts";

interface TabBarProps {
    tabs: Tab[];
    activeId: string;
    onSelect: (id: string) => void;
    onClose: (id: string) => void;
    onNew: () => void;
}

function iconFor(tab: Tab) {
    if (tab.mode === "site") return Globe;
    if (tab.mode === "search") return SearchIcon;
    if (tab.mode === "history") return Clock;
    return HomeIcon;
}