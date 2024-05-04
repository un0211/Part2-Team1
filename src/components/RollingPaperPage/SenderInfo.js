import { RELATIONSHIPS } from "constants/rollingPaperPage";
import style from "./SenderInfo.module.scss";
import { formatDateWithDot } from "utils/rollingPaperPage";

function SenderInfo({ profileImageURL, relationship, sender, createdAt }) {
  return (
    <>
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
      {/* // NOTE - 모달창에서 사용할 수 있도록 조건부 렌더링 createdAt prop이 있는 경우 */}
      {createdAt && (
        <p className={`${style.createdAt} font-14`}>
          {formatDateWithDot(createdAt)}
        </p>
      )}
    </>
  );
}

export default SenderInfo;
