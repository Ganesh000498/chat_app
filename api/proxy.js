import fetch from "node-fetch";

export async function post(context, req) {
  const response = await fetch("http://52.172.26.253:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  return { jsonBody: data };
}
