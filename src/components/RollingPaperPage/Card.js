import { Link } from "react-router-dom";
import PlusIcon from "assets/icons/plus.svg";
import style from "./Card.module.scss";
import { formatDateWithDot } from "utils/rollingPaperPage";
import SenderInfo from "./SenderInfo";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";

function Card({ message }) {
  const { content, createdAt, profileImageURL, relationship, sender, font } =
    message;

  return (
    <article className={style.card}>
      <header>
        <SenderInfo
          profileImageURL={profileImageURL}
          relationship={relationship}
          sender={sender}
        />
      </header>
      <div className={style.divider}></div>
      <main className={`font-18 ${FONT_CLASS_NAME[font]}`}>{content}</main>
      <footer className="font-12">{formatDateWithDot(createdAt)}</footer>
    </article>
  );
}

export function FirstCard() {
  return (
    <div className={`${style.card} ${style["card-first"]}`}>
      <Link to="message">
        <div className={style["add-button"]}>
          <img src={PlusIcon} alt="메세지 추가" />
        </div>
      </Link>
    </div>
  );
}

export default Card;
