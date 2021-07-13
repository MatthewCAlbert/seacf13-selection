import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const name = event.queryStringParameters.name ?? "John";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello World 2, ${name}!` }),
  };
};

export { handler };