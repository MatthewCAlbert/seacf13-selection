import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import { nanoid } from 'nanoid';
import db from "./utils/db";
import { bodyParser, errorResponse, generateInsertStatement, nonSelectQueryResponse, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "POST" ) return errorResponse(405);

  const body = bodyParser(event);
  validator(body, ["doctorName","description","maxRegistrant","date"]);

  const {doctorName, description, maxRegistrant, date} = body;

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  if( auth.role !== 1 ) return errorResponse(403);

  const mysql = db;
  const data = {id: nanoid(), doctorName, description, maxRegistrant, date};

  let results = await mysql.query(generateInsertStatement('doctorappointments', data));
  await mysql.end();

  return nonSelectQueryResponse(results);
};

export { handler };