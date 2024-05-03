import style from "./MainPage.module.scss";
import rollingExample from "assets/images/rolling_example.png";
import reactionExample from "assets/images/reaction_example.png";
import LinkButton from "components/common/LinkButton";

function Section({
  imgSrc,
  point,
  title,
  rowReverse,
  controlMargin,
  controlFlex,
}) {
  return (
    <section className={`${style.section}`}>
      <div
        className={`${style["img-content-container"]} ${
          style[rowReverse] ? style[rowReverse] : ""
        } ${style[controlFlex] ? style[controlFlex] : ""}`}
      >
        {/* 여기 너비 주기 */}
        <div
          className={`${style["content-container"]} ${
            style[controlMargin] ? style[controlMargin] : ""
          }`}
        >
          <div className={style.emphasis}>{point}</div>
          <h2 className={style.title}>{title}</h2>
          <p className={style.description}>로그인 없이 자유롭게 만들어요.</p>
        </div>
        <div className={style.imgWrapper}>
          <img
            src={imgSrc}
            alt="롤링페이퍼 예시"
            className={style.exampleImg}
          />
        </div>
      </div>
    </section>
  );
}

export default function MainPage() {
  return (
    <main className={style.main}>
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
      <LinkButton text={"구경해보기"} url={"/link"} />
    </main>
  );
}
