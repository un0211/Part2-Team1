import styles from "./CountMessage.module.scss";

function CountMessage({ messageProfiles, messageCount, page }) {
  return (
    <div className={styles[page]}>
      <div className={styles.profiles}>
        {messageProfiles &&
          messageProfiles.map((profileImageURL) => (
            <img
              className={styles.profile}
              src={profileImageURL}
              alt={`프로필 이미지`}
            />
          ))}
        {messageCount > 3 && (
          <div className={`${styles["extra-profile"]} font-12-12-12`}>
            {" "}
            +{messageCount - 3}
          </div>
        )}
      </div>
      <div className={`${styles["message-count"]} font-16-16-14`}>
        <span className={styles.bold}>{messageCount}</span>명이 작성했어요!
      </div>
    </div>
  );
}

export default CountMessage;
