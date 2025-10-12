const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log(`Original URL: ${context.req.url}`);
  context.log(`Method: ${req.method}`);
  context.log(`Query: ${JSON.stringify(context.req.query)}`);
  context.log(`Body: ${JSON.stringify(req.body)}`);

  // Simple test - just return the request info
  context.res = {
    status: 200,
    body: {
      message: "Function is working",
      originalUrl: context.req.url,
      method: req.method,
      query: context.req.query,
      body: req.body
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  };
};
