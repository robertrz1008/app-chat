import { FC } from 'react'
import "../../css/profileImgMin.css"

type Props={
  file:string
}
const ProfileImg: FC<Props> = ({file}) =>  {


  return (
    <div className='chatPanel-img-con'>
        <div className='panel-img-surraw'>
            { file && <img src={"http://localhost:5000/" + file} alt="..." width= "180%" height= "auto" />}
        </div>
        
    </div>
  )
}

export default ProfileImg