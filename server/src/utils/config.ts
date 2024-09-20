import {dirname} from "path"
import {fileURLToPath} from "url"

export const TOKEN_SECREAT = "tokenrr32tty10";
export const socketMsg = {
    post: "createMsg",
    delete: "deleteMsg",
    put: "updateMsg",
} 

export const PORT = process.env.PORT || 5000
export const DB_URL = process.env.DB_URL
export const DB_HOST  = process.env.DB_HOST ||"localhost"
export const DB_PORT:any = process.env.DB_PORT || 5432
export const DB_USER = process.env.DB_USER || "postgres"
export const DB_PASSWORD = process.env.DB_PASSWORD || "1331"
export const DB_DATABASE = process.env.DB_DATABASE || "appchatdb"
export const CLIENT_URL = process.env.CLIENT_URL