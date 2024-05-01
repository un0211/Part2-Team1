import style from "./MainPage.module.scss";
import rollingExample from "assets/images/rolling_example.svg";
import reactionExample from "assets/images/reaction_example.png";

function Section({ imgSrc, point, title, className, imgClassName }) {
  return (
    <section className={style.section}>
      <div className={`${style["content-container"]} ${className}`}>
        <div className={style.emphasis}>{point}</div>
        <h2 className={style.title}>{title}</h2>
        <p className={style.description}>로그인 없이 자유롭게 만들어요.</p>
      </div>
      <img
        src={imgSrc}
        alt="롤링페이퍼 예시"
        className={`${style[imgClassName]}`}
      />
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
      />
      <Section
        imgSrc={reactionExample}
        point={"Point. 02"}
        title={`서로에게 이모지로 감정을
           표현해보세요`}
        className={"second"}
        imgClassName={"order"}
      />
    </main>
  );
}
