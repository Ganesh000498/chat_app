import fetch from "node-fetch";

export async function onRequest(context) {
  const { request, params } = context;
  const path = params.rest || "";
  const backendUrl = `http://52.172.26.253:5000/api/${path}`;

  const res = await fetch(backendUrl, {
    method: request.method,
    headers: Object.fromEntries(request.headers),
    body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined,
  });

  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") || "application/json" },
  });
}
