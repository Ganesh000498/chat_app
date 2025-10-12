const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const backendBaseUrl = "http://52.172.26.253:5000";
  const apiPath = context.req.url.replace("/api", "");
  const backendUrl = `${backendBaseUrl}${apiPath}`;

  context.log(`Proxying request to: ${backendUrl}`);

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
    context.log(`Error: ${err.message}`);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
