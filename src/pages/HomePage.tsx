import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.tsx";
import { useSearchLimit } from "../hooks/useSearchLimit.ts";

export default function HomePage() {
  const navigate = useNavigate();
  const { remaining, limit } = useSearchLimit();

  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 bg-white px-4 py-24">
      <img src="/bluewaters-banner.png" alt="blue waters" className="w-full max-w-sm" />
      <p className="-mt-6 text-sm text-slate-400">the best low cortisol search engine</p>
      <SearchBar onSearch={handleSearch} />
      <p className="text-xs text-slate-300">
        {remaining} of {limit} searches left today
      </p>
    </main>
  );
}
