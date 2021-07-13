import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import db from "./utils/db";
import { errorResponse, selectResponse } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "GET" ) return errorResponse(405);

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);

  const mysql = db;

  let res = await mysql.query(`SELECT * FROM doctorappointments`)
  await mysql.end();

  if( res ){
    return selectResponse(res);
  }

  return errorResponse(500);
};

export { handler };