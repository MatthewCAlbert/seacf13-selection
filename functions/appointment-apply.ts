import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import { nanoid } from 'nanoid';
import db from "./utils/db";
import { bodyParser, errorResponse, generateInsertStatement, nonSelectQueryResponse, stringEscaper, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "POST" ) return errorResponse(405);
  const body = bodyParser(event);
  validator(body, ["id"]);

  const {id} = body;

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  // if( auth.role !== 2 ) return { statusCode:403 }

  const mysql = db;

  // Check had appointed before or not
  let res = await mysql.query(`SELECT id FROM appointments WHERE userId = '${auth.id}' AND appointmentId = '${stringEscaper(id)}'`);
  if( !res || (res && res[0]) ){
    console.log("oops")
    return errorResponse(403, "Already applied before");
  }

  // Check full or not
  let appointmentCount = await mysql.query(`SELECT COUNT(id) FROM appointments WHERE appointmentId='${stringEscaper(id)}'`);
  let appointmentLimit = await mysql.query(`SELECT maxRegistrant FROM doctorappointments WHERE id='${stringEscaper(id)}'`);
  if( !appointmentCount || !appointmentLimit ){
    return errorResponse(500);
  }
  if( appointmentCount && appointmentCount[0] && appointmentLimit && appointmentCount[0] ){
    let count = appointmentCount[0]["COUNT(id)"];
    let limit = appointmentLimit[0]["maxRegistrant"];
    if( count >= limit ) return errorResponse(403, "Quota Exceeded")
  }


  // Process
  const data = {id: nanoid(), userId: auth.id, appointmentId: id };

  res = await mysql.query(generateInsertStatement('appointments', data));
  await mysql.end();

  return nonSelectQueryResponse(res);
};

export { handler };