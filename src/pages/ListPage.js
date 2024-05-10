import React from "react";
import CarouselBest from "../components/ListPage/CarouselBest";
import CarouselRecent from "../components/ListPage/CarouselRecent";
import "./ListPage.module.scss";
import styles from "./ListPage.module.scss";
import "styles/global.css";
import "styles/button.scss";
import LinkButton from "components/common/LinkButton";

function ListPage() {
  return (
    <div className={styles.wrapper}>
      <CarouselBest title="인기 롤링 페이퍼🔥" />
      <CarouselRecent title="최근에 만든 롤링 페이퍼⭐" />
      <div className={styles[`button-wrapper`]}>
        <LinkButton className={styles.custom}text="나도 만들어 보기" url="/post"></LinkButton>
      </div>
    </div>
  );
}

export default ListPage;
