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

  const mysql = db;
  let res;

  if( auth.role !== 1 ){
    res = await mysql.query(`DELETE FROM appointments WHERE id='${stringEscaper(id)}'`)
  }else{
    res = await mysql.query(`DELETE FROM appointments WHERE id='${stringEscaper(id)}' AND userId='${auth.id}'`)
  }
  await mysql.end();

  return nonSelectQueryResponse(res);
};

export { handler };