import { Router } from "express";
import { createChatPrivateRequest, getChatsPrivateRequest, getUserByFilter, verifyChatByUser } from "../controllers/chatController";
import { authRequired } from "../middleware/validatorToken";

const chatRoute = Router()


chatRoute.post("/chat",  authRequired, createChatPrivateRequest)
chatRoute.get("/chat", authRequired, getChatsPrivateRequest)
chatRoute.get("/chat/:id", authRequired, verifyChatByUser)
chatRoute.get("/user/:str", authRequired, getUserByFilter)

export default chatRoute