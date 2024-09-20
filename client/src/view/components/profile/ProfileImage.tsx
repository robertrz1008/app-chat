
type Props = {
  userImg: String
}

function ProfileImage({userImg}: Props): JSX.Element {


  return (
    <div className='profile-img-con'>
        <div className='img-surraw'>
            <img src={"http://localhost:5000/"+ userImg} width= "300px" height= "auto" className='profile-img'/>
        </div>
    </div>
  )
}


export default ProfileImage