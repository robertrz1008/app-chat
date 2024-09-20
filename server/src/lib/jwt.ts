import jwt from "jsonwebtoken"
import { TOKEN_SECREAT } from "../utils/config"

type userId = {
    id: any
}

export const createAccessToken = (payload: userId) => {

    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECREAT, { expiresIn: "2d" }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token as string);
            }
        });
    });
}