import { Request, Response } from "express";
import { CustomRequest } from "../utils/Interfaces";
import connectdb from "../utils/connectiondb";

export const getChatsPrivateRequest = async (req: CustomRequest, res: Response) => {
    
    type chatUser = {
        id: Number,
        id_user: Number,
        id_chat: Number 
    }
    type chatUsers = {
        user_name: String,
        chat_id: Number,
        latest_message_content: string,
        latest_message_time: string
    }
    function chatList(arr1: chatUser[], arr2: chatUsers[] ) {
        const newX = arr1.reduce((cc, el) => cc.concat(el.id_chat), [] as Number[])
        const mY = arr2.filter(data => newX.indexOf(data.chat_id) != -1)
        return mY
    }
    
    try {
        const pgClient = await connectdb.connect()

        const mychat = await pgClient.query(`SELECT * FROM users_chat WHERE id_user = $1`, [req.user.id])
        const userchat = await pgClient.query(`
        SELECT
            u.name AS user_name, 
            u.id_image AS id_image,
            c.id AS chat_id,
            m.containe AS latest_message_content,
            m.id_user AS message_user,
            mt.latest_message AS latest_message_time 
        FROM
            users u
        JOIN
            users_chat uc ON u.id = uc.id_user
        JOIN
            chats c ON uc.id_chat = c.id
        JOIN (
            SELECT
                m.id_chat,
                MAX(m.creation) AS latest_message
            FROM
                messages m
            GROUP BY
                m.id_chat
        ) mt ON c.id = mt.id_chat
        JOIN
            messages m ON mt.latest_message = m.creation AND mt.id_chat = m.id_chat
        WHERE
            m.containe IS NOT NULL and uc.id_user <> $1
        ORDER BY
            latest_message_time DESC
        `, [req.user.id])
        pgClient.release()

        if (Array.isArray(mychat.rows) && Array.isArray(userchat.rows)) {
            const mc: chatUser[] | any = mychat.rows
            const uc: chatUser[] | any = userchat.rows
            const myChatsList = chatList(mc, uc)
            
            res.json(myChatsList)
        }
    } catch (error) {
        console.log(error)
    } 
}

export const createChatPrivateRequest = async (req: CustomRequest, res: Response) => {
    const n = 1
    const yo  = req.user.id
    const {userId} = req.body
    try {
        const pgClient = await connectdb.connect()
        //cramos el chat para crear la sala de combersacion 
        await pgClient.query(`INSERT INTO chats(id_type) VALUES($1);`, [n])
        const response = await pgClient.query(`SELECT * FROM chats`)
        if (Array.isArray(response.rows)) {
            const chatFound: any = response.rows[response.rows.length -1]
            //para definir quienes seran los integrantes de la combersacion
            await pgClient.query(`INSERT INTO users_chat(id_user, id_chat) VALUES($1, $2);`, [yo ,chatFound.id])
            await pgClient.query(`INSERT INTO users_chat(id_user, id_chat) VALUES($1, $2);`, [userId ,chatFound.id])
            
            res.json({message: "chat privado creado con exito"})
        }
        pgClient.release()

    } catch (error) {
        console.log(error)
    }
}

export const getUserByFilter = async  (req: CustomRequest, res: Response) => {

    type User = {
        id: number,
        name: string,
        email: string,
        password: string
    }

    function userList(profile: User, list: User[]){
        const myList = list.filter((user) => user.id != profile.id)
        return myList
    }

    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query(`SELECT * FROM users WHERE name LIKE '%${req.params.str}%' or email LIKE  '%${req.params.str}%'`)
        pgClient.release()

        if(Array.isArray(response.rows)){
            const mychatList: any = response.rows
            const profile = req.user
            const newUserList = userList(profile, mychatList)
            res.json(newUserList)
        }
    } catch (error) {
        console.log(error)
    }
}

export const verifyChatByUser = async  (req: CustomRequest, res: Response) => {

    type chatUser = {
        user_name: string, 
        id_image: number,
        chat_id: Number
    }

    function findChat(arr1: chatUser[], arr2: chatUser[]){
        const newX = arr1.reduce((cc, el) => cc.concat(el.chat_id), [] as Number[])
        const mY = arr2.filter(data => newX.indexOf(data.chat_id) != -1)
        return mY
    }
    try {
        const pgClient = await connectdb.connect()

        const myChats= await pgClient.query(`
            select 
                u.name as user_name, 
                u.id_image as id_image,
                uc.id_chat as chat_id
            from 
                users u join users_chat uc
            on 
                u.id = uc.id_user 
            where u.id = $1;`, [req.user.id])
        const userChat= await pgClient.query(`
        select 
            u.name as user_name, 
            u.id_image as id_image,
            uc.id_chat as chat_id
        from 
            users u join users_chat uc
        on 
            u.id = uc.id_user 
        where u.id = $1;`, [req.params.id])
        const chatTest= findChat(myChats.rows, userChat.rows)
        pgClient.release()

        res.json(chatTest)
    } catch (error) {
        console.log(error)
    }
}