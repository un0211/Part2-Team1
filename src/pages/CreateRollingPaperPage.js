import { useState } from "react";
import styles from "./CreateRollingPaperPage.module.scss";
import { BACKGROUND_COLOR } from "constants/createRollingPaper";

export default function CreateRollingPaPer() {
  const [selectedBg, setSelectedBg] = useState("color");

  // NOTE - 배경 컬러, 이미지 중 선택하는 함수
  const handleBgSelect = (type) => {
    setSelectedBg(type);
  };

  return (
    <form className={styles.form}>
      <section className={styles["sender-container"]}>
        <label htmlFor="sender" className="font-24-24-24-bold">
          To.
        </label>
        <input
          id="sender"
          name="sender"
          placeholder="받는 사람 이름을 입력해 주세요."
          className={styles["sender-input"]}
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
          <BackgroundColor backgrounds={BACKGROUND_COLOR} name="color" />
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

function BackgroundColor({ backgrounds, name }) {
  return (
    <>
      {backgrounds.map((background) => (
        <>
          <input
            type="radio"
            name={name}
            id={background}
            className={styles["select-bg-input"]}
          />
          <label htmlFor={background} className={styles[background]}></label>
        </>
      ))}
    </>
  );
}
