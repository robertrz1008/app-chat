import { Message } from "./contextInterfaces";

export interface Props{
    name: string,
    id: number,
    data: Message
}

export const socketMsg = {
    post: "createMsg",
    delete: "deleteMsg",
    put: "updateMsg",
}