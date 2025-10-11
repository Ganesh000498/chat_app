import fetch from "node-fetch";

export async function handler(context, req) {
  const backendUrl = `http://52.172.26.253:5000${req.originalUrl.replace("/api", "")}`;

  const options = {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.rawBody : undefined,
  };

  try {
    const response = await fetch(backendUrl, options);
    const data = await response.text();

    context.log(`Proxying ${req.method} to ${backendUrl} => ${response.status}`);

    return {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
      body: data,
    };
  } catch (err) {
    context.log("Proxy error:", err);
    return {
      status: 500,
      body: JSON.stringify({ error: "Proxy failed", details: err.message }),
    };
  }
}
