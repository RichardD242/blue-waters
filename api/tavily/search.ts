export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.text();

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TAVILY_API_KEY ?? ""}`,
    },
    body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
