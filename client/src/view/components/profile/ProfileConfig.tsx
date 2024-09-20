import { useAuth } from "../../../context/AppContext"
import { AppContextIn } from "../../../interfaces/contextInterfaces"
import ProfileImage from "./ProfileImage"



type Props = {
  profileFormOpen: () => void
}

function ProfileConfig({profileFormOpen}: Props): JSX.Element {
  const { user, userImg, logout } = useAuth() as AppContextIn 

  return (
    <div className="prof-config">
        <h1>Mi perfil</h1>
        <ProfileImage userImg={userImg}/>

        <h1>{user.name}</h1>
        <p>{user.email}</p>

        <div className="prof-btns">
            <button onClick={profileFormOpen}>Editar Perfil</button>
            <button onClick={logout}>Serrar session</button>
        </div>
    </div>
  )
}

export default ProfileConfig