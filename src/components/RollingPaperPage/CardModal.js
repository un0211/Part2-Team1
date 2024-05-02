import Modal from "react-modal";
import style from "./CardModal.module.scss";

export default function CardModal({ isOpen, message }) {
  const { content, createdAt, profileImageURL, relationship, sender } = message;

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
    },
  };
  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div className={style["profile-container"]}>
        <img src={profileImageURL} className={style.profile} />
        <div>
          <h3>From. {sender}</h3>
          <p>{relationship}</p>
        </div>
        <p>{createdAt}</p>
      </div>
      <p>{content}</p>
    </Modal>
  );
}
