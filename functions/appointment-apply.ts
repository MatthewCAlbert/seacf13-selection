import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import { nanoid } from 'nanoid';
import db from "./utils/db";
import { bodyParser, errorResponse, generateInsertStatement, nonSelectQueryResponse, stringEscaper, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "POST" ) return errorResponse(405);
  const body = bodyParser(event);
  validator(body, ["appointmentId"]);

  const {appointmentId} = body;

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  // if( auth.role !== 2 ) return { statusCode:403 }

  const mysql = db;

  // Check had appointed before or not
  let res = await mysql.query(`SELECT id FROM appointments WHERE userId = '${auth.id}' AND appointmentId = '${stringEscaper(appointmentId)}'`);
  if( !res || (res && res.affectedRows > 0) ){
    return errorResponse(403, "Already applied before");
  }

  // Check full or not
  let appointmentCount = await mysql.query(`SELECT COUNT(id) FROM appointments WHERE appointmentId='${stringEscaper(appointmentId)}'`);
  let appointmentLimit = await mysql.query(`SELECT maxRegistrant FROM doctorappointments WHERE id='${stringEscaper(appointmentId)}'`);
  if( !appointmentCount || !appointmentLimit ){
    if( appointmentCount >= appointmentLimit ) return errorResponse(403, "Quota Exceeded")
    return errorResponse(500);
  }

  // Process
  const data = {id: nanoid(), userId: auth.id, appointmentId };

  res = await mysql.query(generateInsertStatement('doctorappointments', data));
  await mysql.end();

  return nonSelectQueryResponse(res);
};

export { handler };