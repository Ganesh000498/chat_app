import fetch from "node-fetch";

export default async function (context, req) {
  const backendBaseUrl = "http://52.172.26.253:5000";
  const apiPath = context.req.url.replace("/api", "");
  const backendUrl = `${backendBaseUrl}${apiPath}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { 
        "Content-Type": "application/json",
        ...req.headers
      },
      body: req.body ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    context.res = {
      status: response.status,
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
}
