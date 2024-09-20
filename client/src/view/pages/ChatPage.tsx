import { useParams } from "react-router-dom"
import Header from "../components/conversation/Header"
import MessageList from "../components/conversation/MessageList"
import Form from "../components/conversation/Form" 

function ChatPage(): JSX.Element {

  let {id, name, imgId} = useParams<{id: string, name: string, imgId: string}>()

  if (id === undefined || name === undefined || imgId === undefined) {
    return <div>Error: missing parameters</div>;
  }

  const vId = Number(id)
  return ( 
    <div className="chat-body">
      <Header
          name={name}
          imgId={imgId}
      />
      <MessageList 
            vId={vId}
      /> 
      <Form
          vId={vId}
      />
    </div>
  )
}

export default ChatPage