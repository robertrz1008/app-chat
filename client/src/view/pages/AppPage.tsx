import {  Outlet } from "react-router-dom"
import ChatsPanel from "./ChatsPanel"
import "../css/AppPage.css"

function AppPage() {
  return (
    <div className="app-body">
      <ChatsPanel/>
      <div className="app-chat">
        <Outlet/>
      </div>
    </div>
  )
}

export default AppPage

