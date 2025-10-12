const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log(`Original URL: ${context.req.url}`);
  context.log(`Method: ${req.method}`);
  context.log(`Query: ${JSON.stringify(context.req.query)}`);
  context.log(`Body: ${JSON.stringify(req.body)}`);

  // Return the request details to debug
  context.res = {
    status: 200,
    body: {
      message: "Debug info",
      originalUrl: context.req.url,
      method: req.method,
      query: context.req.query,
      body: req.body,
      headers: req.headers
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  };
};
