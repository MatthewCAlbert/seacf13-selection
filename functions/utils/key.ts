import path from "path";
import fs from "fs";

try{
    require('dotenv').config({path: path.resolve(process.cwd(), '.env.local')});
}catch(e){

}

let JWT_SIGN_KEY_METHOD:string, PUB_KEY: string, PRIV_KEY: string, JWT_SECRET: string, JWT_EXP: string;

JWT_SIGN_KEY_METHOD = process.env.JWT_SIGN_KEY_METHOD;

if( process.env.JWT_SIGN_KEY_METHOD === "pem" ){

    try{
        const pubkey_path = path.resolve('id_rsa_pub.pem');
        PUB_KEY = fs.readFileSync(pubkey_path, "utf8");

        const privkey_path = path.resolve('id_rsa_priv.pem');
        PRIV_KEY = fs.readFileSync(privkey_path, "utf8");
    }catch(e){

    }
    if( !PUB_KEY || !PRIV_KEY ){
        process.exit(1);
    }
    
}else{

    JWT_SECRET = process.env.JWT_SIGN_SECRET;
    JWT_EXP = process.env.JWT_EXP;

}

export {PUB_KEY, PRIV_KEY, JWT_SECRET, JWT_EXP, JWT_SIGN_KEY_METHOD}
