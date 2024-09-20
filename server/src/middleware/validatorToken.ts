import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { TOKEN_SECREAT } from "../utils/config";
import { CustomRequest } from "../utils/Interfaces";

export const authRequired = (req: CustomRequest, res: Response, next: NextFunction) => { 

    const {token} = req.cookies

    if(!token){
        res.status(400).json({message: "NO token"})
    }else{
        jwt.verify(token, TOKEN_SECREAT, (err: jwt.VerifyErrors|null, user: any) => {
            if(err) return res.status(404).json({msg: "Token Invalid"});
            req.user = user
            next() 
        })
    }
}