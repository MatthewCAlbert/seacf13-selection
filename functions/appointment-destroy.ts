import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import db from "./utils/db";
import { bodyParser, errorResponse, generateInsertStatement, nonSelectQueryResponse, stringEscaper, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "DELETE" ) return errorResponse(405);
  const body = bodyParser(event);
  validator(body, ["id"]);

  const {id} = body;

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  if( auth.role !== 1 ) return { statusCode:403 }

  const mysql = db;

  let res = await mysql.query(`DELETE FROM appointments WHERE appointmentId='${stringEscaper(id)}'`);
  let res2 = await mysql.query(`DELETE FROM doctorappointments WHERE id='${stringEscaper(id)}'`);
  await mysql.end();

  if( res ){
    return errorResponse(200);
  }

  return errorResponse(500);
};

export { handler };