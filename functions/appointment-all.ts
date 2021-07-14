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

  // Check full or not
  let appointmentCount = await mysql.query(`SELECT appointmentId, userId FROM appointments`);

  await mysql.end();

  if( res ){
    return { statusCode:200, body: JSON.stringify({
        success: true,
        message: "Ok!",
        data:{
          all: res,
          list: appointmentCount
        }
      }) 
    }
  }

  return errorResponse(500);
};

export { handler };