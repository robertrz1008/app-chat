import { createContext, useContext, useEffect, useState } from "react"
import { Message, User, contexArg, createMsg } from "../interfaces/contextInterfaces"
import { createMessageRequest, getChatByFilterRequest, getChatsRequest, getMessageRequest } from "../api/chatRequest"
import io from "socket.io-client"
import { SOCKET_SERVER } from "../utils/config"

export const socket = io("http://localhost:5000/")

const ChatContex = createContext({})

export const useChat = () => {
    const context = useContext(ChatContex)
    if(!context){
        throw new Error("context invalid")
    }
    return context
}

export function ChatContextProvider({children}: contexArg) {

  const [chats, setChats] = useState([])
  const [idChat, setIdChat] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])   
  const [msgLoading, setMsgLoading] = useState(false)
  const [userList, setUserList] = useState<User[]>([])

  const selectChatId = (id: number) => setIdChat(id)
  //chat services
  const getChats = async () => {
    try {
      const res = await getChatsRequest()
      setChats(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  //message services
  const getMessages = async (id: number) => {
    setMsgLoading(true);
    try {
      const res = await getMessageRequest(id);
      console.log('Los mensajes no son iguales');
      setMsgLoading(false);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
      setMsgLoading(false);
    }
  };
  const createMessage = async (message: createMsg) => {
    try {
      const response = await createMessageRequest(message)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // users
  const getUserByFilter = async (filter: string)  => {
    try {
      const res = await getChatByFilterRequest(filter)
      setUserList(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const cleanUsersList = () => setUserList([])

  //function for websocket
  function resiveMessage(msg: Message[]){
    setMessages(msg)
    getChats()
  }


  useEffect(() =>{
    socket.on('createMsg', resiveMessage)

    return () => {
      socket.off('createMsg', resiveMessage)
    }
  },[messages])



  return (
    <ChatContex.Provider value={{
      idChat,
      selectChatId,
      chats,
      getChats,
      getMessages,
      messages,
      createMessage,
      cleanUsersList,
      userList,
      getUserByFilter,
      msgLoading
    }}>
        {children}
    </ChatContex.Provider>
  )
}
