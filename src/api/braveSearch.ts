export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

interface BraveWebResult {
  title: string;
  url: string;
  description: string;
}

interface BraveSearchResponse {
  web?: {
    results?: BraveWebResult[];
  };
}

export async function search(query: string, signal?: AbortSignal): Promise<SearchResult[]> {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`/api/brave/search?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error(`Search request failed with status ${response.status}`);
  }

  const data: BraveSearchResponse = await response.json();
  return data.web?.results?.map((result) => ({
    title: result.title,
    url: result.url,
    description: result.description,
  })) ?? [];
}
