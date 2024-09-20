import { Request, Response } from "express";
import connectdb from "../utils/connectiondb";
import { CustomRequest } from "../utils/Interfaces";
import { socket } from "../main";
import { socketMsg } from "../utils/config";

const SLQ_QUERY = `
SELECT
    m.id AS mensaje_id,
    m.containe as "message",
    m.creation AS fecha_creacion,
    u.id AS usuario_id,
    u.name AS nombre_usuario,
    c.id AS chat_id
FROM
    messages m
JOIN
    users u ON m.id_user = u.id
JOIN
    chats c ON m.id_chat = c.id
WHERE 
    c.id = $1
ORDER BY 
    m.creation DESC;
`

export const getMessagesbyAdmin = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query(`
                SELECT m.containe as "message", m.creation as "fecha y horario", u.name, u.email 
                FROM messages as m JOIN users as u
                ON m.user_id = u.id
        `)
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const getMessagesByChatId = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query(SLQ_QUERY, [parseInt(req.params.id)])
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
    
}

export const createMessage = async (req: CustomRequest, res: Response) => {
    const {containe, id_user, id_chat} = req.body
    try {
        const pgClient = await connectdb.connect()

        //Gets the id of the chat that will be used to create the message
        const chatFound = await pgClient.query(`SELECT * FROM chats WHERE id = $1`, [id_chat])

        if(Array.isArray(chatFound.rows) && chatFound.rows.length == 0){
            return res.status(404).json({message: "NO existe el chat"})
        }
        //the message is create using the chats id obtained
        await pgClient.query(`INSERT INTO messages(containe, id_user, id_chat) VALUES( $1, $2, $3);`, [containe, id_user, id_chat])
        const response = await pgClient.query(SLQ_QUERY, [id_chat])
        pgClient.release()

        socket.emit(socketMsg.post, response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        await connectdb.query(`DELETE FROM messages WHERE id = $1`, [req.params.id])
        // res.json({message: "mensage eliminado"})
        pgClient.release()
    } catch (error) {
        console.log(error)
    }
}
