import path from "path";
import serverlessMysql from "serverless-mysql";

require('dotenv').config({path: path.resolve(process.cwd(), '.env.local')});

const dbconfig = ()=>{
  if( process.env.NODE_ENV === "production" )
  return { config:{
    host     : process.env.PROD_DB_HOST,
    database : process.env.PROD_DB_NAME,
    user     : process.env.PROD_DB_USERNAME,
    password : process.env.PROD_DB_PASSWORD
  }}
  else
  return { config:{
    host     : process.env.DEV_DB_HOST,
    database : process.env.DEV_DB_NAME,
    user     : process.env.DEV_DB_USERNAME,
    password : process.env.DEV_DB_PASSWORD
  }}
};

export default serverlessMysql(dbconfig())