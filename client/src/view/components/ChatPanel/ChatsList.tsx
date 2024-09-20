import {useEffect} from 'react'
import { useChat } from '../../../context/ChatContext'
import { useNavigate } from 'react-router-dom'
import { AppContextIn, ChatContextIn } from '../../../interfaces/contextInterfaces'
import ChatUserImg from './ChatUserImg'
import getDate from '../../../utils/date'
import msgText from '../../../utils/messageText'
import { useAuth } from '../../../context/AppContext'

function ChatsList() {

  const {chats, getChats, idChat} = useChat() as ChatContextIn
  const {user} = useAuth() as AppContextIn
  const navigate = useNavigate()

  useEffect(() => { 
    if(chats.length == 0){
      getChats()
    }
  }, [])

  useEffect(() => { 
    getChats()
  }, [user])

  function isChatSelected(id: number){
    if(id == idChat){
      return "chat-target-selected"
    }else{
      return "chat-target"
    }
  }
  //si ele mensaje es mio
  function isMyMsg(id: number){
    if(id == user.id){
      return true
    }
    return false
  }

  if(!chats || chats.length == 0){

      return <div className='chat-list'></div>

  }else{
    return (
        <div className='chat-list'>
          {
            chats.map((chat) => (
                  
                  <div 
                    onClick={() => {
                      const id: number = chat.chat_id
                      const name: string = chat.user_name
                      const chatId: number = chat.id_image
                      navigate(`/chat/conversation/${id}/${name}/${chatId}`)
                    }}
                    className={isChatSelected(chat.chat_id)}
                    key={chat.chat_id}>
                      <div style={{width: "47px", height: "47px"}}>
                        <ChatUserImg
                                userId = {chat.id_image}
                        />
                      </div>

                      <div className='chat-target-texts' style={{marginLeft: "10px",}}>
                          <div>
                              <h3>{chat.user_name}</h3>
                              <h5>
                                {isMyMsg(chat.message_user)?"tu:":""}
                                {msgText(chat.latest_message_content, isMyMsg(chat.message_user))}
                              </h5>
                          </div>
                          <div className='timestamp-con'>
                              <h5>{getDate(chat.latest_message_time)}</h5>
                          </div>
                      </div>
                  </div>
            ))
          }
        </div>
      )
  }
  
}

export default ChatsList