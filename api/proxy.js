import fetch from "node-fetch";

export default async function (context, req) {
  const backendUrl = "http://52.172.26.253:5000/api/auth/register";

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    context.res = {
      status: response.status,
      body: data
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
}
