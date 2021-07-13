import jsonwebtoken from 'jsonwebtoken';
import db from './db';
import { PUB_KEY } from "./key";

export async function requireAuth(event){
  const tokenParts = event.headers.authorization.split(" ");
  if( tokenParts[0] === "Bearer" && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null ){

    try{
      const decoded = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {algorithms: ['RS256']});
      const uid = decoded.sub;
      const mysql = db;

      let results = await mysql.query(`SELECT id, hash, salt FROM \`users\` WHERE \`id\`='${uid}'`);
      await mysql.end();

      if( results && results[0] ){
        const user = results[0];
        if( !user.id ) return null;
        return user;
      }
    }catch(e){
    }

  }
  
  return null;
}