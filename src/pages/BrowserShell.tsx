import { useEffect } from "react";
import { History, EyeOff } from "lucide-react";
import TabBar from "../components/TabBar.tsx";
import AddressBar from "../components/AddressBar.tsx";
import SiteFrame from "../components/SiteFrame.tsx";
import HomeView from "../views/HomeView.tsx";
import SearchView from "../views/SearchView.tsx";
import HistoryView from "../views/HistoryView.tsx";
import { useTabs } from "../hooks/useTabs.ts";
import { useDarkMode } from "../hooks/useDarkMode.ts";
import { useSearchHistory } from "../hooks/useSearchHistory.ts";
import { hostnameOf } from "../utils/url.ts";
import { getCachedSearch, setCachedSearch } from "../utils/searchCache.ts";
import type { SearchResult } from "../api/tavilySearch.ts";
import type { Tab } from "../types.ts";
import type { LockControls } from "../hooks/useLock.ts";

interface BrowserShellProps {
  lock: LockControls;
}

export default function BrowserShell({ lock }: BrowserShellProps) {
  const { tabs, activeTab, openTab, closeTab, setActiveId, updateTab } = useTabs();
  const { dark, toggle } = useDarkMode();
  const { history } = useSearchHistory();

  useEffect(() => {
    document.title = activeTab.title !== "new tab" ? `${activeTab.title} — blue waters` : "blue waters";
  }, [activeTab.title]);

  function runSearch(query: string) {
    if (activeTab.mode === "search" && activeTab.query === query) {
      return;
    }
    const cached = activeTab.private ? null : getCachedSearch(query);
    updateTab(activeTab.id, {
      mode: "search",
      query,
      url: "",
      title: query,
      results: cached ? cached.results : null,
      elapsedMs: cached ? cached.elapsedMs : 0,
    });
  }

  function saveResults(tab: Tab, results: SearchResult[], elapsedMs: number) {
    updateTab(tab.id, { results, elapsedMs });
    if (!tab.private) {
      setCachedSearch(tab.query, results, elapsedMs);
    }
  }

  function runVisit(url: string) {
    updateTab(activeTab.id, { mode: "site", query: "", url, title: hostnameOf(url) });
  }

  function goHome() {
    updateTab(activeTab.id, { mode: "home", query: "", url: "", title: "new tab" });
  }

  function goHistory() {
    updateTab(activeTab.id, { mode: "history", query: "", url: "", title: "history" });
  }

  function openPrivateTab() {
    openTab("home", true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900">
      <TabBar tabs={tabs} activeId={activeTab.id} onSelect={setActiveId} onClose={closeTab} onNew={() => openTab("home")} />
      <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <button type="button" onClick={goHome} className="shrink-0">
          <img src="/bluewaterslogo.png" alt="home" className="h-6 w-6" />
        </button>
        <AddressBar
          value={activeTab.mode === "site" ? activeTab.url : activeTab.query}
          history={history}
          onSearch={runSearch}
          onVisit={runVisit}
        />
        <button
          type="button"
          onClick={openPrivateTab}
          aria-label="private mode"
          title="private mode"
          className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 transition-colors duration-150 hover:border-[#2a3ce4] hover:text-[#2a3ce4] dark:border-slate-700 dark:text-slate-400"
        >
          <EyeOff size={16} />
        </button>
        <button
          type="button"
          onClick={goHistory}
          aria-label="history"
          className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 transition-colors duration-150 hover:border-[#2a3ce4] hover:text-[#2a3ce4] dark:border-slate-700 dark:text-slate-400"
        >
          <History size={16} />
        </button>
      </div>
      {activeTab.mode === "home" && (
        <HomeView dark={dark} onToggleDark={toggle} onSearch={runSearch} lock={lock} isPrivate={activeTab.private} />
      )}
      {activeTab.mode === "search" && <SearchView tab={activeTab} onResults={saveResults} />}
      {activeTab.mode === "history" && <HistoryView onSearch={runSearch} />}
      {activeTab.mode === "site" && <SiteFrame url={activeTab.url} />}
    </div>
  );
}