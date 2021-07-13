import path from "path";
import fs from "fs";

const pubkey_path = path.resolve(process.cwd(), 'id_rsa_pub.pem');
export const PUB_KEY = fs.readFileSync(pubkey_path, "utf8");

const privkey_path = path.resolve(process.cwd(), 'id_rsa_priv.pem');
export const PRIV_KEY = fs.readFileSync(privkey_path, "utf8");

if( !PUB_KEY || !PRIV_KEY ){
    process.exit(1);
}