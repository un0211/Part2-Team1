import React from "react";
import Carousel from "../../components/ListPage/Carousel";
import "./ListPage.module.scss";
import styles from "./ListPage.module.scss";
import "styles/global.css";
import "styles/button.scss";
import LinkButton from "components/common/LinkButton";

function ListPage() {
  return (
    <div className={styles.wrapper}>
      <Carousel title="인기 롤링 페이퍼🔥" />
      <Carousel title="최근에 만든 롤링 페이퍼⭐" />
      <div className={styles.buttonWrapper}>
        <LinkButton className={styles.customButton}text="나도 만들어 보기" url="/Create"></LinkButton>
      </div>
    </div>
  );
}

export default ListPage;