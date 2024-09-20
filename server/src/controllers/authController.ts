import { Request, Response } from "express";
import connectdb from "../utils/connectiondb";
import bcrypt from "bcryptjs"
import jwt, { VerifyErrors } from "jsonwebtoken"
import { createAccessToken } from "../lib/jwt";
import { CustomRequest, User } from "../utils/Interfaces";
import { TOKEN_SECREAT } from "../utils/config";



export const getUsersRequest = async (req: Request, res: Response):Promise< Response| void> => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("SELECT * FROM users",)

        if(!response.rows) return res.status(404).json({mesaje: "user not found"})

        res.json(response.rows)
        pgClient.release()
       
    } catch (error) {
        console.log(error)
    }
}

export const registerRequest = async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    const passwordCrypt = await bcrypt.hash(password, 3) 

    try {
        const pgClient = await connectdb.connect()

        await pgClient.query(`INSERT INTO users(name, email, password) VALUES( $1, $2, $3);`,[name, email, passwordCrypt])
        const response = await pgClient.query("SELECT * FROM users WHERE email = $1", [email])

        if(Array.isArray(response.rows)){
            const userFound: User | any = response.rows[0]
            const token = await createAccessToken({ id: userFound.id })

            res.cookie("token", token)

            res.json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email, 
                password: userFound.password
            })
        }
        pgClient.release()

    } catch (error) {
        console.log(error)
        res.status(400).json([ "El coreo esta en uso"])
    }
}

export const loginRrquest = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const pgClient = await connectdb.connect()

        const response = await pgClient.query("SELECT * FROM users WHERE email = $1", [email])
        if(Array.isArray(response.rows) && response.rows.length == 0) return res.status(404).json(["no se reconoce el email"])

        if(Array.isArray(response.rows)){
            const userFound: User | any = response.rows[0]
            const isMatch = await bcrypt.compare(password, userFound.password) 

            if(!isMatch) return res.status(404).json(["La contraseña es incorrecta"])

            const token = await createAccessToken({id: userFound.id}) 
            res.cookie("token", token)
            res.send(`Bienvenido ${userFound.name}`)
        }
        pgClient.release()

    } catch (error) {
        console.log(error)
    }
}

export const logoutRequest = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    res.sendStatus(200)
}

export const profileRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query(`SELECT * FROM users WHERE id = $1`, [req.user.id])
        pgClient.release()
        if(!response.rows){
            return res.status(404).json({message: "User not Found"}) 
        }
        res.json(response.rows) 

    } catch (error) {
        console.log(error)
    }
} 

export const verifyToken = async (req: CustomRequest, res: Response) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({msg: "No autorizado"})

    jwt.verify(token, TOKEN_SECREAT, async (error: jwt.VerifyErrors|null, user: any) => {
        if(error) return res.status(400).json({message: "Token Fallido"})

        const pgClient = await connectdb.connect()
        const response = await pgClient.query(`SELECT * FROM users WHERE id = $1 `, [user.id])
        pgClient.release()

        if(!response.rows) return res.status(404).json({message: "No hay Token"})
        
        if(Array.isArray(response.rows)){
            const userFound: User | any = response.rows[0]
            res.json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email, 
                password: userFound.password
            })
        }
    })
}