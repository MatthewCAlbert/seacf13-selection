import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import db from "./utils/db";
import { bodyParser, errorResponse, selectResponse, stringEscaper, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "GET" ) return errorResponse(405);
  const {id} = event.queryStringParameters;
  if( !id ) return errorResponse(400);

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  if( auth.role !== 1 ) return errorResponse(403);

  const mysql = db;

  let appointmentDetail = [];
  appointmentDetail = await mysql.query(`SELECT * FROM appointments RIGHT JOIN doctorappointments ON appointments.appointmentId = doctorappointments.id WHERE doctorappointments.id = '${stringEscaper(id)}'`)

  let appointmentList = await mysql.query(`SELECT * FROM appointments RIGHT  JOIN users ON appointments.userId = users.id WHERE appointments.appointmentId='${stringEscaper(id)}'`);

  await mysql.end();

  if( appointmentDetail && appointmentDetail[0] ){
    if( appointmentDetail.length > 0 && appointmentDetail[0] ){
      let res = {
        detail: appointmentDetail[0],
        list: appointmentList
      }
      return selectResponse(res);
    }
    return errorResponse(404);
  }

  return errorResponse(500);
};

export { handler };