import type { SearchResult } from "../api/braveSearch.ts";

interface ResultsListProps {
  results: SearchResult[];
}

export default function ResultsList({ results }: ResultsListProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="w-full max-w-2xl space-y-6">
      {results.map((result) => (
        <li key={result.url}>
          <a
            href={result.url}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-blue-700 hover:underline"
          >
            {result.title}
          </a>
          <p className="text-sm text-green-800">{result.url}</p>
          <p className="text-neutral-700">{result.description}</p>
        </li>
      ))}
    </ul>
  );
}
