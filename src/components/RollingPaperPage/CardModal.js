import Modal from "react-modal";
import style from "./CardModal.module.scss";
import SenderInfo from "./SenderInfo";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";

export default function CardModal({ isOpen, message, onModalClose }) {
  const { content, createdAt, profileImageURL, relationship, sender, font } =
    message;

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "10",
    },
    content: {
      height: "476px",
      width: "600px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "16px",
      padding: "40px",
    },
  };
  return (
    <Modal isOpen={isOpen} style={modalStyle} onRequestClose={onModalClose}>
      <header className={style["profile-container"]}>
        <SenderInfo
          profileImageURL={profileImageURL}
          relationship={relationship}
          sender={sender}
          createdAt={createdAt}
        />
      </header>
      <main className={style["content-wrapper"]}>
        <p className={`${style.content} font-18 ${FONT_CLASS_NAME[font]}`}>
          {content}
        </p>
      </main>
      <footer className={style["button-wrapper"]}>
        <button
          onClick={onModalClose}
          className={`${style["close-button"]} button width-120 font-16`}
        >
          확인
        </button>
      </footer>
    </Modal>
  );
}
