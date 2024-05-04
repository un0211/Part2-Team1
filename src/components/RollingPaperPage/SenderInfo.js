import { RELATIONSHIPS } from "constants/rollingPaperPage";
import style from "./SenderInfo.module.scss";

function SenderInfo({ profileImageURL, relationship, sender }) {
  return (
    <div className={style["sender-info"]}>
      <img
        className={style["profile-image"]}
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
    </div>
  );
}

export default SenderInfo;
