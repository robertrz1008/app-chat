import { createMsg } from "../interfaces/contextInterfaces"
import axios from "./axios"

export const getChatsRequest = () => axios.get("/chat")
export const verifyChatRequest = (id: number) => axios.get(`/chat/${id}`)
type ui = {userId: number}
export const createChatsRequest = (userId: ui) => axios.post("/chat", userId)
//messages services
export const getMessageRequest = (id: number) => axios.get(`message/${id}`)
export const createMessageRequest = (message: createMsg) => axios.post(`message`, message)

export const getChatByFilterRequest = (filter: string) => axios.get(`user/${filter}`)