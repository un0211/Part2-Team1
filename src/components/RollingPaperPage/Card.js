import { Link } from "react-router-dom";
import PlusIcon from "assets/icons/plus.svg";
import style from "./Card.module.scss";
import { formatDateWithDot } from "utils/rollingPaperPage";
import SenderInfo from "./SenderInfo";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";
import CardModal from "./CardModal";
import { useState } from "react";

function Card({ message, isEdit, onCheck, isChecked }) {
  const {
    content,
    createdAt,
    profileImageURL,
    relationship,
    sender,
    font,
    id,
  } = message;
  const [isOpenModal, setIsOpenModal] = useState(false);

  //console.log(">>>>>>>>>>>>>> " + typeof id);

  // NOTE - 모달창 띄우는 함수
  const handleCardClick = () => {
    // NOTE - /edit 에서는 클릭하지 못하도록 처리
    if (!isEdit) {
      setIsOpenModal(true);
    }
  };

  // NOTE - 모달창 닫는 함수
  const handleCloseClick = () => {
    setIsOpenModal(false);
  };

  // NOTE -
  const handleCheckId = (e) => {
    onCheck(e.target.id, e.target.checked);
  };

  return (
    <>
      <article
        className={`${style.card} ${isEdit ? style.cursor : ""} ${
          isChecked ? style["checked-card"] : ""
        }`}
        onClick={handleCardClick}
      >
        <header className={style.header}>
          <SenderInfo
            profileImageURL={profileImageURL}
            relationship={relationship}
            sender={sender}
          />
          {/* // NOTE - checkbox */}
          {isEdit && (
            <div>
              <input
                id={id}
                className={style.checkbox}
                type="checkbox"
                onChange={handleCheckId}
                checked={isChecked}
              />
              <label htmlFor={id} className={style["checkbox-label"]}></label>
            </div>
          )}
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
