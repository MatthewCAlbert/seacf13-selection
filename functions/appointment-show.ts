import { Handler } from "@netlify/functions";
import { requireAuth } from "./utils/authcheck";
import db from "./utils/db";
import { bodyParser, errorResponse, selectResponse, stringEscaper, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "GET" ) return errorResponse(405);
  const body = bodyParser(event);
  validator(body, ["id"]);

  const auth = await requireAuth(event);
  if( auth === null ) return errorResponse(401);
  if( auth.role !== 1 ) return errorResponse(403);

  const mysql = db;

  let appointmentDetail = await mysql.query(`SELECT * FROM appointments RIGHT JOIN doctorAppointments ON appointments.appointmentId = doctorAppointments.id WHERE doctorAppointments.id = '${stringEscaper(body.id)}'`)
  await mysql.end();

  let appointmentList = await mysql.query(`SELECT * FROM appointments RIGHT INNER JOIN users ON appointments.userId = users.id WHERE appointments.appointmentId='${stringEscaper(body.id)}'`);

  if( appointmentList && appointmentDetail ){
    if( appointmentDetail > 0 && appointmentDetail[0] ){
      let res = {
        detail: appointmentDetail[0],
        list: appointmentList
      }
      selectResponse(res);
    }
    return errorResponse(404);
  }

  return errorResponse(500);
};

export { handler };