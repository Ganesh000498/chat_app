const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log(`Original URL: ${context.req.url}`);
  context.log(`Method: ${req.method}`);
  context.log(`Query: ${JSON.stringify(context.req.query)}`);
  context.log(`Body: ${JSON.stringify(req.body)}`);

  const backendBaseUrl = "http://52.172.26.253:5000";
  
  // Extract the path from the x-ms-original-url header
  // The original URL is: https://ashy-bay-0f2f22600.1.azurestaticapps.net/api/auth/register
  // We need to extract: /api/auth/register
  let apiPath = "/";
  if (req.headers && req.headers['x-ms-original-url']) {
    const originalUrl = req.headers['x-ms-original-url'];
    const url = new URL(originalUrl);
    apiPath = url.pathname; // This will be /api/auth/register
    context.log(`Extracted path from x-ms-original-url: ${apiPath}`);
  }
  
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
