import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import db from "./utils/db";
import { bodyParser, errorResponse, generateUpdateStatement, nonSelectQueryResponse, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "PUT" ) return errorResponse(405);
  const body = bodyParser(event);
  validator(body, ["id","doctorName","description","maxRegistrant","date"]);

  const {id,doctorName,description,maxRegistrant,date} = body;

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  if( auth.role !== 1 ) return { statusCode:403 }

  const mysql = db;

  let res = await mysql.query(generateUpdateStatement("doctorappointments",{doctorName,description,maxRegistrant,date}, `id = '${id}'`));
  await mysql.end();

  return nonSelectQueryResponse(res);
};

export { handler };