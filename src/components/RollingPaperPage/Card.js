import { Link } from "react-router-dom";
import PlusIcon from "assets/icons/plus.svg";
import style from "./Card.module.scss";
import { formatDateWithDot } from "utils/rollingPaperPage";
import SenderInfo from "./SenderInfo";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";
import CardModal from "./CardModal";
import { useState } from "react";

function Card({ message }) {
  const { content, createdAt, profileImageURL, relationship, sender, font } =
    message;
  const [isOpenModal, setIsOpenModal] = useState(false);

  // NOTE - 모달창 띄우는 함수
  const handleCardClick = () => {
    setIsOpenModal(true);
  };

  // NOTE - 모달창 닫는 함수
  const handleCloseClick = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <article className={style.card} onClick={handleCardClick}>
        <header className={style.header}>
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
      {isOpenModal && (
        <CardModal
          message={message}
          isOpen={isOpenModal}
          onModalClose={handleCloseClick}
        />
      )}
    </>
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
