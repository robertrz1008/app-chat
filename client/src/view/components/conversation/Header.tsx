
import ChatUserImg from "../ChatPanel/ChatUserImg"

type Props={
  name: string ,
  imgId: string 
}

const  Header: React.FC<Props> = ({name, imgId})  => {
 
  return (
    <header className="chat-header">
          <div style={{width:"52px", height:"52px", }}>
            <ChatUserImg
                  userId={parseInt(imgId)}/>
          </div>
          <h2>{name}</h2>
    </header>
  )
}

export default Header