import { Link } from "react-router-dom";
import PlusIcon from "assets/icons/plus.svg";
import style from "./Card.module.scss";
import { formatDateWithDot } from "utils/rollingPaperPage";
import { RELATIONSHIPS } from "constants/rollingPaperPage";

function Card({ message }) {
  const { content, createdAt, profileImageURL, relationship, sender } = message;

  return (
    <article className={style.card}>
      <header>
        <img
          className={style.profile}
          src={profileImageURL}
          alt="프로필 이미지"
        />
        <div>
          <h2 className="font-20">
            From. <span className="font-20-bold">{sender}</span>
          </h2>
          <p
            className={`${style.badge} ${
              style[RELATIONSHIPS[relationship]]
            } font-14`}
          >
            {relationship}
          </p>
        </div>
      </header>
      <div className={style.divider}></div>
      <main className="font-18">{content}</main>
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
