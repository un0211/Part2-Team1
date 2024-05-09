import React, { useState } from 'react';

const ImageUpload = ({ setSelectedImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0])); // 선택된 이미지 URL 설정
  };

  return (
    <div className="image-upload-container">
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" />}
    </div>
  );
};

export default ImageUpload;