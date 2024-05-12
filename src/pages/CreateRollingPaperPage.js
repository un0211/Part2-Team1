import { useState } from "react";
import styles from "./CreateRollingPaperPage.module.scss";
import { BACKGROUND_COLOR } from "constants/createRollingPaper";

export default function CreateRollingPaPer() {
  const [selectBg, setSelectBg] = useState("color");
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
        <div className={styles["select-bg-container"]}>
          <input type="radio" id="bgColor" name="select" />
          <label htmlFor="bgColor" className={`font-16-16-16`}>
            컬러
          </label>
          <input type="radio" id="bgImg" name="select" />
          <label htmlFor="bgImg" className={`font-16-16-16`}>
            이미지
          </label>
        </div>
        <div className={styles["select-bg-input-container"]}>
          {BACKGROUND_COLOR.map((color) => (
            <>
              <input
                type="radio"
                name="color"
                id={color}
                className={styles["select-bg-input"]}
              />
              <label htmlFor={color} className={styles[color]}></label>
            </>
          ))}
        </div>
      </section>
      <button className="button full" type="submit">
        생성하기
      </button>
    </form>
  );
}
