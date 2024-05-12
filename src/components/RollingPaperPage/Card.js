import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDateWithDot } from "utils/rollingPaperPage";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";
import CardModal from "./CardModal";
import SenderInfo from "./SenderInfo";
import PlusIcon from "assets/icons/plus.svg";
import styles from "./Card.module.scss";

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
        className={`${styles.card} ${isEdit ? styles.cursor : ""} ${
          isChecked ? styles["checked-card"] : ""
        }`}
        onClick={handleCardClick}
      >
        <header className={styles.header}>
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
                className={styles.checkbox}
                type="checkbox"
                onChange={handleCheckId}
                checked={isChecked}
              />
              <label htmlFor={id} className={styles["checkbox-label"]}></label>
            </div>
          )}
        </header>
        <div className={styles.divider}></div>
        <main className={`font-18-18-15 ${FONT_CLASS_NAME[font]}`}>
          {content}
        </main>
        <footer className="font-12-12-12">
          {formatDateWithDot(createdAt)}
        </footer>
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
    <div className={`${styles.card} ${styles["card-first"]}`}>
      <Link to="message">
        <div className={styles["add-button"]}>
          <img src={PlusIcon} alt="메세지 추가" />
        </div>
      </Link>
    </div>
  );
}

export default Card;
