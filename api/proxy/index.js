const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log(`Original URL: ${context.req.url}`);
  context.log(`Method: ${req.method}`);
  context.log(`Query: ${JSON.stringify(context.req.query)}`);
  context.log(`Body: ${JSON.stringify(req.body)}`);

  const backendBaseUrl = "http://52.172.26.253:5000";
  
  // Extract the path from the query parameters
  // For /api/auth/register, the path should be in req.query.restOfPath as "auth/register"
  let apiPath = "/";
  if (context.req.query && context.req.query.restOfPath) {
    apiPath = `/${context.req.query.restOfPath}`;
  } else {
    // If restOfPath is not available, try to extract from the original URL
    // The URL should be something like /api/proxy?restOfPath=auth/register
    context.log('restOfPath not found in query, trying to extract from URL');
    const urlParts = context.req.url.split('?');
    if (urlParts.length > 1) {
      const queryString = urlParts[1];
      const params = new URLSearchParams(queryString);
      const restOfPath = params.get('restOfPath');
      if (restOfPath) {
        apiPath = `/${restOfPath}`;
      }
    }
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
