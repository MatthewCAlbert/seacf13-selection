import { Handler } from "@netlify/functions";
import db from "./utils/db";
import jwt from "./utils/jwt";
import { bodyParser, errorResponse, stringEscaper, validator } from "./utils/utils";

const handler: Handler = async (event, context) => {
  console.log(process.env.NODE_ENV);
  if( event.httpMethod !== "POST" ) errorResponse(405);

  const body = bodyParser(event);
  validator(body, ["username","password"]);

  const { username, password } = body;

  const mysql = db;
  let results = await mysql.query(`SELECT * FROM \`users\` WHERE \`username\`='${stringEscaper(username)}' OR \`email\`='${stringEscaper(username)}'`);
  await mysql.end();

  if( results && results[0] ){
    const user = results[0];
    if( user.hash && user.salt ){
      const isValid = jwt.validPassword(password, user.hash, user.salt);
      if( isValid ){
        // Authorize
        const tokenObj = jwt.issueJWT(user.id);
        const {firstName, lastName, email, role, age} = user;
        const userObj = { id: user.id, token: tokenObj, username, firstName, lastName, email, role, age }
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, data: userObj }),
        };
      }
    }
  }
  return errorResponse(403);
};

export { handler };