import { useState } from "react";
import SearchBar from "./components/SearchBar.tsx";
import ResultsList from "./components/ResultsList.tsx";
import { search } from "./api/braveSearch.ts";
import type { SearchResult } from "./api/braveSearch.ts";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setStatus("loading");
    try {
      const nextResults = await search(nextQuery);
      setResults(nextResults);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-semibold">Blue Waters</h1>
      <SearchBar onSearch={handleSearch} initialValue={query} />
      {status === "loading" && <p className="text-neutral-500">Searching…</p>}
      {status === "error" && (
        <p className="text-red-600">Something went wrong. Check that BRAVE_API_KEY is set and try again.</p>
      )}
      <ResultsList results={results} />
    </main>
  );
}
