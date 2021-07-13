import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import { errorResponse } from "./utils/utils";

const handler: Handler = async (event, context) => {
  const auth = await requireAuth(event);

  if( auth === null ) return errorResponse(401);

  return { statusCode:200 }
};

export { handler };