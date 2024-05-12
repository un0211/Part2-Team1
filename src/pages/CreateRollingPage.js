import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateRollingPage.module.scss";

function CreateRollingPage() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectOption, setSelectOption] = useState("color");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("first");
  const [imageData, setImageData] = useState("");

  const handleSelectOption = (option) => {
    setSelectOption(option);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    if (inputValue.trim() !== "") {
      setError(false);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (inputValue.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleImageUpload = (imageName) => {
    setSelectedImage(imageName);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleImageInputChange = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setImageData(reader.result);
      console.log(imageData);
    };
  };

  useEffect(() => {
    console.log(imageData);
  }, [imageData]);

  const renderInput = (error) => {
    if (error) {
      return (
        <input
          className={styles.inputToNameError}
          placeholder="값을 입력해 주세요"
          ref={errorInputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
        />
      );
    } else {
      return (
        <input
          className={styles.inputToName}
          placeholder="받는 사람 이름을 입력해주세요"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
        />
      );
    }
  };

  useEffect((error) => {
    renderInput(error);
  }, []);

  const errorInputRef = useRef(null);
  useEffect(() => {
    if (error) {
      errorInputRef.current.focus();
    }
  }, [error]);

  const uploadeInputRef = useRef(null);
  const onhandleClickInput = () => {
    uploadeInputRef.current.click();
  };

  return (
    <main className={styles.main}>
      <section className={styles.inputSection}>
        <span className={styles.inputTitle}>To.</span>
        {renderInput(error)}
      </section>

      <section className={styles.backgroundImageSection}>
        <span className={styles.backgroundImageTitle}>
          배경화면을 선택해주세요.
        </span>
        <span className={styles.backgroundImageSubTitle}>
          컬러를 선택하거나,이미지를 선택할 수 있습니다.
        </span>
        <div className={styles.buttonSection}>
          <button
            className={`${styles.optionButton} ${selectOption === "color" ? styles.color : ""}`}
            onClick={() => handleSelectOption("color")}
          >
            컬러
          </button>
          <button
            className={`${styles.optionButton} ${selectOption === "image" ? styles.image : ""}`}
            onClick={() => {
              handleSelectOption("image");
              onhandleClickInput();
            }}
          >
            이미지
            <input
              type="file"
              accept="image/*"
              className={styles.imageUpload}
              ref={uploadeInputRef}
              onChange={handleImageInputChange}
            />
          </button>
        </div>

        {selectOption === "color" ? (
          <div className={styles.colorRollingSection}>
            <button
              type="button"
              className={`${styles.firstColor} ${selectedColor === "first" ? styles.active : ""}`}
              onClick={() => handleColorSelect("first")}
            ></button>

            <button
              type="button"
              className={`${styles.secondColor} ${selectedColor === "second" ? styles.active : ""}`}
              onClick={() => handleColorSelect("second")}
            ></button>

            <button
              type="button"
              className={`${styles.thirdColor} ${selectedColor === "third" ? styles.active : ""}`}
              onClick={() => handleColorSelect("third")}
            ></button>

            <button
              type="button"
              className={`${styles.fourColor} ${selectedColor === "fourth" ? styles.active : ""}`}
              onClick={() => handleColorSelect("fourth")}
            ></button>
          </div>
        ) : (
          <div className={styles.imageRollingSection}>
            <button
              className={`${styles.firstImage} ${selectedImage === "image1.jpg" ? styles.active : ""}`}
              type="button"
              onClick={() => handleImageUpload("image1.jpg")}
            >
              이미지1
            </button>
            <button
              className={`${styles.secondImage} ${selectedImage === "image2.jpg" ? styles.active : ""}`}
              type="button"
              onClick={() => handleImageUpload("image2.jpg")}
            >
              이미지2
            </button>
            <button
              className={`${styles.thirdImage} ${selectedImage === "image3.jpg" ? styles.active : ""}`}
              type="button"
              onClick={() => handleImageUpload("image3.jpg")}
            >
              이미지3
            </button>
            <div className={styles.fourImage}>
              <img src={imageData} alt="이미지4" />
            </div>
          </div>
        )}
      </section>

      <section className={styles.createRollingPage}>
        <button type="button" className={styles.createRollingPageButton}>
          생성하기
        </button>
      </section>
    </main>
  );
}

export default CreateRollingPage;
