import { RELATIONSHIPS } from "constants/rollingPaperPage";
import styles from "./SenderInfo.module.scss";

function SenderInfo({ profileImageURL, relationship, sender }) {
  return (
    <div className={styles["sender-info"]}>
      <img
        className={styles["profile-image"]}
        src={profileImageURL}
        alt="프로필 이미지"
      />
      <div>
        <h2 className={`font-20 ${styles["media-18"]}`}>
          From.{" "}
          <span className={`font-20-bold ${styles["media-16"]}`}>{sender}</span>
        </h2>
        <p
          className={`${styles.badge} ${
            styles[RELATIONSHIPS[relationship]]
          } font-14`}
        >
          {relationship}
        </p>
      </div>
    </div>
  );
}

export default SenderInfo;
