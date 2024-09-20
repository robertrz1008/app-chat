import ChatsList from "../components/ChatPanel/ChatsList"
import Profile from "../components/ChatPanel/Profile"

function ChatsPanel() {
  return (
    <div className="chat-panel">
        <Profile/> 
        <ChatsList/>
    </div>
  )
}

export default ChatsPanel