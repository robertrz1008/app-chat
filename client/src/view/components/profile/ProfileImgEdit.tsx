
type Props = {
  userImg: String
}

function ProfileImgForm({userImg}: Props): JSX.Element {


  return (
    <div className='profile-img-con'>
        <div className='img-surraw'>
            <img src={""+ userImg} width= "300px" height= "auto" className='profile-img'/>
        </div>
    </div>
  )
}


export default ProfileImgForm