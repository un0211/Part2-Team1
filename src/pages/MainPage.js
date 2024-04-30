import style from "./MainPage.module.scss";
import rollingExample from "assets/images/rolling_example.svg";

function Section() {
  return (
    <section className={style.section}>
      <div className={style["content-container"]}>
        <div className={style.emphasis}>Point. 01</div>
        <h2 className={style.title}>
          {`누구나 손쉽게, 온라인
           롤링 페이퍼를 만들 수 있어요`}
        </h2>
        <p className={style.description}>로그인 없이 자유롭게 만들어요.</p>
      </div>
      <img src={rollingExample} alt="롤링페이퍼 예시" />
    </section>
  );
}

export default function MainPage() {
  return (
    <main className={style.main}>
      <Section />
    </main>
  );
}
