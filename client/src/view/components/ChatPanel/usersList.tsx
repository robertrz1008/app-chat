import { User } from '../../../interfaces/contextInterfaces'
import ChatUserImg from './ChatUserImg'

type Props  ={
  usersList: User[]
  hanldeSelect: (u: User) => void
}

function UsersList({usersList, hanldeSelect}: Props): JSX.Element {

  if(!usersList){
    return <></>
  }else{
    return (
      <div style={{widows:"100px", height:"70%"}} className="chat-list">
        {
          usersList.map((user) => (
                <div 
                    key={user.id} 
                    onClick={() =>{
                      hanldeSelect({...user})
                    }}
                    className='chat-target'
                >
                    <div style={{width: "47px", height: "47px"}}> 
                      <ChatUserImg
                              userId = {user.id_image}
                      />
                    </div>
                    <div  style={{marginLeft: "10px", widows:"60%", height: "80%", fontWeight:"lighter"}}>
                        <h4>{user.name}</h4>
                        <h5>{user.email}</h5>
                    </div>
                </div>
          ))
        }
      </div>
    )
  }
  }

export default UsersList