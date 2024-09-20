import { Router } from "express";
import { createMessage, deleteMessage, getMessagesByChatId } from "../controllers/messageController";
import { authRequired } from "../middleware/validatorToken";

const msgRoute = Router()

msgRoute.get("/message/:id", authRequired, getMessagesByChatId)
msgRoute.post("/message", authRequired, createMessage)
msgRoute.put("/message:id")
msgRoute.delete("/message/:id", authRequired, deleteMessage)

export default msgRoute