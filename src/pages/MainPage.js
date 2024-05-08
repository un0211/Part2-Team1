import styles from "./MainPage.module.scss";
import rollingExample from "assets/images/rolling_example.png";
import reactionExample from "assets/images/reaction_example.png";
import { Link } from "react-router-dom";

function Section({
  imgSrc,
  point,
  title,
  rowReverse,
  controlMargin,
  controlFlex,
}) {
  return (
    <section className={`${styles.section}`}>
      <div
        className={`${styles["img-content-container"]} ${
          styles[rowReverse] ? styles[rowReverse] : ""
        } ${styles[controlFlex] ? styles[controlFlex] : ""}`}
      >
        {/* 여기 너비 주기 */}
        <div
          className={`${styles["content-container"]} ${
            styles[controlMargin] ? styles[controlMargin] : ""
          }`}
        >
          <div className={styles.emphasis}>{point}</div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>로그인 없이 자유롭게 만들어요.</p>
        </div>
        <img src={imgSrc} alt="롤링페이퍼 예시" className={styles.exampleImg} />
      </div>
    </section>
  );
}

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Section
        imgSrc={rollingExample}
        point={"Point. 01"}
        title={`누구나 손쉽게, 온라인
           롤링 페이퍼를 만들 수 있어요`}
        controlMargin={"marginLeft"}
      />
      <Section
        imgSrc={reactionExample}
        point={"Point. 02"}
        title={`서로에게 이모지로 감정을
           표현해보세요`}
        rowReverse={"rowReverse"}
        controlFlex={"flexEnd"}
      />
      <Link to="/list" className="button width-280 align-center font-18">
        구경해보기
      </Link>
    </main>
  );
}
