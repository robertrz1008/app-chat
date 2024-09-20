import { useState } from 'react';
import Modal from '@mui/material/Modal';
import ProfileConfig from '../profile/ProfileConfig';
import ProfileForm from '../profile/ProfileForm';
import "../../css/Modal.css"

type ModalProp = {
  handleClose: () => void;
  openModal: boolean;
}

function ModalProfile({ handleClose, openModal }: ModalProp): JSX.Element {

  const [isForm, setIsForm] = useState(false)

  
   const profileFormOpen = () => setIsForm(true)
   const profileFormClose = () => setIsForm(false)
  

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '10px', borderRadius: "10px" }}>
          <div className='modal-con'>
              {
                !isForm? ( <ProfileConfig profileFormOpen= {profileFormOpen}/> )
                        : (<ProfileForm  profileFormClose={profileFormClose}/>)
              }
          </div>
      </div>
    </Modal>
  );
}

export default ModalProfile;