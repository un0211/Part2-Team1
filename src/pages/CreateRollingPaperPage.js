import { useState } from "react";
import styles from "./CreateRollingPaperPage.module.scss";
import {
  BACKGROUND_COLOR,
  BACKGROUND_IMAGE,
  BACKGROUND_IMAGE_NAME,
} from "constants/createRollingPaper";
import { createPaper } from "apis/createRollingPaperPage";

export default function CreateRollingPaPer() {
  const [selectedBg, setSelectedBg] = useState("color");
  const [backgroundColor, setBackgroundColor] = useState("beige");
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [name, setName] = useState("");

  // NOTE - 배경 컬러, 이미지 중 선택하는 함수
  const handleBgSelect = (type) => {
    setSelectedBg(type);

    // NOTE - 배경 컬러인 경우 첫 번째 배경 색상으로 설정
    if (type === "color") {
      setBackgroundColor(BACKGROUND_COLOR[0]);
    }
    // NOTE - 배경 이미지인 경우 첫 번째 배경 이미지로 설정
    else if (type === "image") {
      setBackgroundImg(BACKGROUND_IMAGE.first);
    }
  };

  // NOTE - 배경 선택하는 함수
  const handleBackgroundSelect = (e) => {
    if (selectedBg === "color") {
      setBackgroundColor(e.target.value);
    } else {
      setBackgroundImg(e.target.value);
    }
  };

  // NOTE - name Input
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      team: "6-1",
      name: name,
      backgroundColor: backgroundColor,
      backgroundImageURL: backgroundImg,
    };
    try {
      await createPaper(data);
    } catch (e) {
      return;
    }

    console.log("넘어가는 데이터 확인 : " + data.name);
    console.log("넘어가는 데이터 확인 : " + data.backgroundColor);
    console.log("넘어가는 데이터 확인 : " + data.backgroundImageURL);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles["sender-container"]}>
        <label htmlFor="sender" className="font-24-24-24-bold">
          To.
        </label>
        <input
          id="sender"
          name="sender"
          placeholder="받는 사람 이름을 입력해 주세요."
          className={styles["sender-input"]}
          onChange={handleName}
        />
      </section>
      <section className={styles["select-bg-section"]}>
        <div className={styles["select-bg-title"]}>
          <p className="font-24-24-24-bold">배경화면을 선택해주세요.</p>
          <span className={`${styles["select-bg-description"]} font-16-16-16`}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </span>
        </div>
        <BackgroundButton onBgSelect={handleBgSelect} selectedBg={selectedBg} />
        <div className={styles["select-bg-input-container"]}>
          {selectedBg === "color" ? (
            <Background
              backgrounds={BACKGROUND_COLOR}
              name="color"
              onBackgroundSelect={handleBackgroundSelect}
            />
          ) : (
            <Background
              backgrounds={BACKGROUND_IMAGE_NAME}
              name="image"
              onBackgroundSelect={handleBackgroundSelect}
            />
          )}
        </div>
      </section>
      <button className="button full" type="submit">
        생성하기
      </button>
    </form>
  );
}

function BackgroundButton({ onBgSelect, selectedBg }) {
  return (
    <div className={styles["select-bg-container"]}>
      <input
        type="radio"
        id="bgColor"
        name="select"
        checked={selectedBg === "color"}
        onChange={() => onBgSelect("color")}
      />
      <label htmlFor="bgColor" className={`font-16-16-16`}>
        컬러
      </label>
      <input
        type="radio"
        id="bgImg"
        name="select"
        checked={selectedBg === "image"}
        onChange={() => onBgSelect("image")}
      />
      <label htmlFor="bgImg" className={`font-16-16-16`}>
        이미지
      </label>
    </div>
  );
}

function Background({ backgrounds, name, onBackgroundSelect }) {
  return (
    <>
      {backgrounds.map((background, index) => (
        <>
          <input
            type="radio"
            name={name}
            id={background}
            value={name === "color" ? background : BACKGROUND_IMAGE[background]}
            className={styles["select-bg-input"]}
            onChange={onBackgroundSelect}
            key={index}
          />
          <label
            htmlFor={background}
            className={`${styles[background]} ${styles["select-bg-label"]}`}
          ></label>
        </>
      ))}
    </>
  );
}
