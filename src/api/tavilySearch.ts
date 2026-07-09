export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

interface TavilyResult {
  title: string;
  url: string;
  content: string;
}

interface TavilyResponse {
  results?: TavilyResult[];
}

export async function search(query: string, signal?: AbortSignal): Promise<SearchResult[]> {
  const response = await fetch("/api/tavily/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 5,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Search request failed with status ${response.status}`);
  }

  const data: TavilyResponse = await response.json();
  return data.results?.slice(0, 5).map((result) => ({
    title: result.title,
    url: result.url,
    description: result.content,
  })) ?? [];
}
