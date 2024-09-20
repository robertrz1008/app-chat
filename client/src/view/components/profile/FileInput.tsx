import React, { useRef } from 'react';
import "../../css/FileInput.css"

type Props ={
    selectHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FileInputButton({selectHandle}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='fileName-body'>
      <button onClick={handleButtonClick}>Subir Imagen</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={selectHandle}
      />
    </div>
  );
}

export default FileInputButton;