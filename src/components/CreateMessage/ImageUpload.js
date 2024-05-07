import React, { useState } from 'react';
import styled from 'styled-components';

const ImageUpload = ({ title, setSelectedImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedImage(null); // 이미지를 선택하면 ImageUpload 컴포넌트를 다시 숨깁니다.
  };

  return (
    <Container>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" />}
    </Container>
  );
};

const Container = styled.div`
  /* Your styles for ImageUpload container */
`;

export default ImageUpload;
