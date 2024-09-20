import { ChangeEvent, useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import "../../css/ModalSearch.css"
import { useChat } from '../../../context/ChatContext';
import { ChatContextIn, User } from '../../../interfaces/contextInterfaces';
import UsersList from './usersList';
import { useNavigate } from 'react-router-dom';
import { createChatsRequest, verifyChatRequest } from '../../../api/chatRequest';

type ModalProp = {
    handleCloseSM: () => void;
    openSearchModal: boolean;
    modalClose: boolean
}

function ModalSearch({handleCloseSM, openSearchModal, modalClose}: ModalProp): JSX.Element {
  
  const {userList, getUserByFilter, cleanUsersList} = useChat() as ChatContextIn
  const [isDisabled, setIsDesabled] = useState(true)
  const [userSelect, setUserSelect] = useState<User>()
  const [btnText, setBtnText] = useState("")
  const navigate = useNavigate()

  const buttonOff = () => setIsDesabled(true)
  const buttonOn = () => setIsDesabled(false)

  function handleSubmit(e: ChangeEvent<HTMLInputElement>){
    const input = e.target.value
    const rg = /[\s*]$/

    if(input.length == 0){
      return cleanUsersList()
    }
    if(rg.test(input)){
      getUserByFilter(input)
      return
    }
    getUserByFilter(input)
  }

  function hanldeSelect(u: User){
    setUserSelect(u)
    setBtnText(u.name)
    buttonOn()
  }

  const getOrCreateChat = async (id: number) => {

    type chatUserparam = {
      user_name: string,
      id_image: number,
      chat_id: Number
  }

    try {
      const res: any = await verifyChatRequest(id)
      let userChat: chatUserparam = res.data[0];
      if(res.data.length == 0){
        await createChatsRequest({userId: id})
        const res: any = await verifyChatRequest(id)
        userChat = res.data[0]
      }
      handleCloseSM()
      navigate(`/chat/conversation/${userChat.chat_id}/${userChat.user_name}/${userChat.id_image}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(modalClose){
      buttonOff()
      setBtnText("")
    }
  }, [modalClose])

  return (
    <Modal
      open={openSearchModal}
      onClose={handleCloseSM}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
         <div style={{  position: 'absolute',   top: '50%',  left: '50%',  transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '10px' , borderRadius: "10px"
        }}>
            <div className='modal-users-con'>
              <center><h3>Habla con otras personas</h3></center>
              <div 
                onClick={handleCloseSM} 
                style={{cursor:"pointer"}}
                className='modal-users-exit'>
                  <h2>x</h2>
              </div>
                  <input 
                  onChange={handleSubmit}
                  className='modal-users-textfiel' 
                  type="text" 
                  placeholder='Busca'
                  />
              <UsersList usersList={userList} hanldeSelect={hanldeSelect}/>
                <center>
                    <button 
                        onClick={() => getOrCreateChat(userSelect?.id as number)} 
                        disabled={isDisabled}
                        className={isDisabled? "buttonOff" : 'button'}
                    >
                      Chat {btnText}
                    </button>
                </center>
            </div>
      </div>
    </Modal>
  );
}

export default ModalSearch;