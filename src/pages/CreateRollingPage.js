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
  const [selectedImage, setSelectedImage] = useState("image1");
  const [selectedColor, setSelectedColor] = useState("beige");
  const [imageData, setImageData] = useState("");
  const [toValue, setToValue] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
            }}
          >
            이미지
            <input
              className={styles.imageUpload}
              onChange={handleImageInputChange}
            />
          </button>
        </div>

        {selectOption === "color" ? (
          <form className={styles.colorRollingSection}>
            <button
              type="button"
              className={`${styles.firstColor} ${selectedColor === "beige" ? styles.active : ""}`}
              onClick={() => setSelectedColor("beige")}
            ></button>
            <button
              type="button"
              className={`${styles.secondColor} ${selectedColor === "blue" ? styles.active : ""}`}
              onClick={() => setSelectedColor("blue")}
            ></button>
            <button
              type="button"
              className={`${styles.thirdColor} ${selectedColor === "purple" ? styles.active : ""}`}
              onClick={() => setSelectedColor("purple")}
            ></button>
            <button
              type="button"
              className={`${styles.fourColor} ${selectedColor === "green" ? styles.active : ""}`}
              onClick={() => setSelectedColor("green")}
            ></button>
          </form>
        ) : (
          <form className={styles.imageRollingSection}>
            <button
              type="button"
              className={`${styles.firstImage} ${selectedImage === "image1.jpg" ? styles.active : ""}`}
              onClick={() => setSelectedImage("image1.jpg")}
              style={{
                backgroundImage: `url(${require("../assets/images/image1.png")})`,
              }}
            ></button>
            <button
              type="button"
              className={`${styles.secondImage} ${selectedImage === "image2.jpg" ? styles.active : ""}`}
              onClick={() => setSelectedImage("image2.jpg")}
              style={{
                backgroundImage: `url(${require("../assets/images/image2.png")})`,
              }}
            ></button>
            <button
              type="button"
              className={`${styles.thirdImage} ${selectedImage === "image3.jpg" ? styles.active : ""}`}
              onClick={() => setSelectedImage("image3.jpg")}
              style={{
                backgroundImage: `url(${require("../assets/images/image3.png")})`,
              }}
            ></button>
            <button
              type="button"
              className={`${styles.fourImage} ${selectedImage === "image4.jpg" ? styles.active : ""}`}
              onClick={() => setSelectedImage("image4.jpg")}
              style={{
                backgroundImage: `url(${require("../assets/images/image4.png")})`,
              }}
            ></button>
          </form>
        )}
      </section>

      <section className={styles.createRollingPage}>
        <form onSubmit={handleSubmit} className={styles.createRollingPage}>
          <button type="submit" className={styles.createRollingPageButton}>
            생성하기
          </button>
        </form>
      </section>
    </main>
  );
}

export default CreateRollingPage;
