import { FC, useEffect, useState } from 'react'
import "../../css/profileImgMin.css"
import { getImageByIdRequest } from '../../../api/profileRequest'

type Props={
  userId: number
}

const ChatUserImg: FC<Props> = ({userId}) =>  {

  const [file, setFile] = useState(String)

  let id = userId

  const getUserImg = async(id: number) => {
    try {
        const file = await getImageByIdRequest(id)
        setFile(file.data)
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    if(id){
      getUserImg(id)
    }
  }, [id])

  return (
    <div className='user-img-con'>
        <div className='user-img-surraw'>
            { file && <img src={"http://localhost:5000/" + file} alt="..." width= "180%" height= "auto" />}
        </div>
    </div>
  )
}

export default ChatUserImg