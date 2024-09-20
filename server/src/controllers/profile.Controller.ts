import { Request, Response } from "express";
import connectdb from "../utils/connectiondb";
import fs from "fs"
import path from "path"
import { CustomRequest } from "../utils/Interfaces";
import { getElementByNumber } from "../utils/seachFile";

type Image ={
    id: number,
    name: string, 
    data: string
}

export const updateNameProfile = async (req: Request, res: Response) => { 
    const {name} = req.body
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("update users set name = $1 where id = $2", [name, req.params.id])
        pgClient.release()
        res.json({msg: "nombre modificado"})
    } catch (error) {
        console.log(error)
    }
}

//images
export const getImagesProfilebyId = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query('SELECT * FROM images WHERE id = $1', [req.params.id])

        if(Array.isArray(response.rows) && response.rows.length == 0) res.status(404).json({msg: "no hay archivos"})

        const file: Image[] = response.rows
        fs.writeFileSync(path.join(__dirname, '../dbImages/' + file[0].id + "-facichat.png"), file[0].data)
        const images = fs.readdirSync(path.join(__dirname, '../dbImages/'))
        let fileFound = getElementByNumber(images, parseInt(req.params.id))

        pgClient.release()

        res.json(fileFound)
    } catch (error) {
        console.log(error)
    }
}

export const createImageProfile = async (req: Request, res: Response) => {
    const type = req.file?.mimetype
    const name = req.file?.originalname
    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file?.filename))
    try {
        const pgClient = await connectdb.connect()
        //subimos la img a la db
        await pgClient.query('INSERT INTO images(type, name, data)  VALUES($1, $2, $3)', [type, name, data])
        //seleccionamos la ultima img de la tabla
        const myImages = await pgClient.query('SELECT * FROM images ORDER BY id DESC LIMIT 1')
        pgClient.release()
        
        if(Array.isArray(myImages.rows))  res.json(myImages.rows[0]) 
    } catch (error) {
        console.log(error)
    }
}

export const changeUserImageProfile = async (req: CustomRequest, res: Response) => {
    const imgId = req.params.id
    const {id} = req.body
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("update users set id_image = $1 where id = $2", [imgId, id])
        pgClient.release()
        res.send("mensaje modificado")
    } catch (error) {
        console.log(error)
    }
}

export const deleteImageProdile = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("DELETE FROM images WHERE id = $1", [req.params.id])
        pgClient.release()
        res.send("mensaje eliminado")
    } catch (error) {
        console.log(error)
    }
}

 