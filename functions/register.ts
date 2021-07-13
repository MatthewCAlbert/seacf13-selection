import { Handler } from "@netlify/functions";
import { nanoid } from 'nanoid';
import db from "./utils/db";
import jwt from "./utils/jwt";
import { bodyParser, errorResponse, generateInsertStatement, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  if( event.httpMethod !== "POST" ) return errorResponse(405);

  const body = bodyParser(event);
  validator(body, ["firstName", "lastName", "email", "username", "password", "age"]);

  const { firstName, lastName, email, username, password, age } = body;
  
  const id = nanoid();
  const role = body.role && !isNaN(parseInt(body.role)) ? parseInt(body.role) : 2;
  const saltHash = jwt.genPassword(password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const data = {id, firstName, lastName, email, username, age, salt, hash, role};
   
  const mysql = db;
  let results = await mysql.query(generateInsertStatement('users',data));
  await mysql.end();

  if( results && results.affectedRows > 0 ){
    const tokenObj = jwt.issueJWT(id);
    const userObj = { id, token: tokenObj, username, firstName, lastName, email, role, age }
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: userObj }),
    };
  }

  return errorResponse(500);

};

export { handler };