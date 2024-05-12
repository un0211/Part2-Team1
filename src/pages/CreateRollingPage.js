import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateRollingPage.module.scss";
import { getBackgroundImage } from "../apis/CreateRollingPage";

function CreateRollingPage() {
  // api 서버에서 백그라운드 이미지 정보 받아오기
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [selectedColor, setSelectedColor] = useState("first");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBackgroundImage();
        setBackgroundImage(response.imageUrls);
      } catch (error) {
        console.error("Error fetching slide items:", error);
      }
    };

    fetchData();
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const renderBackgroundImage = () => {
    return (
      <div>
        {backgroundImage.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        ))}
      </div>
    );
  };

  const inputRef = useRef(null);
  useEffect(() => {
    // 초기 렌더링 시, input에 캐럿 위치하기 위헤 포커스
    inputRef.current.focus();
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectOption, setSelectOption] = useState("color");

  const handleSelectOption = (option) => {
    setSelectOption(option);
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    // 입력된 텍스트가 있는 경우 에러 상태를 false로 변경
    if (inputValue.trim() !== "") {
      setError(false);
    }
  };

  const handleBlur = () => {
    setIsFocused(false); // 포커스 뻐져나갔으므로 상태 변경

    // 값이 비어있으면 에러 상태 변경
    if (inputValue.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

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

  useEffect(
    (error) => {
      renderInput(error);
    },
    [error, isFocused]
  );

  const errorInputRef = useRef(null);
  useEffect(() => {
    // 에러 발생할 경우, 에러 input에 캐럿 위치하기 위해 포커스
    if (error) {
      errorInputRef.current.focus();
    }
  }, [error]);

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
            onClick={() => handleSelectOption("image")}
          >
            이미지
          </button>
        </div>

        {selectOption === "color" ? (
          <div className={styles.colorRollingSection}>
            <div
              className={`${styles.firstColor} ${selectedColor === "first" ? styles.active : ""}`}
            ></div>
            <div
              className={`${styles.secondColor} ${selectedColor === "second" ? styles.active : ""}`}
            ></div>
            <div
              className={`${styles.thirdColor} ${selectedColor === "third" ? styles.active : ""}`}
            ></div>
            <div
              className={`${styles.fourColor} ${selectedColor === "four" ? styles.active : ""}`}
            ></div>
          </div>
        ) : (
          <div className={styles.imageRollingSection}>
            {renderBackgroundImage()}
          </div>
        )}
      </section>

      <section className={styles.createRollingPage}>
        <button className={styles.createRollingPageButton}>생성하기</button>
      </section>
    </main>
  );
}

export default CreateRollingPage;
