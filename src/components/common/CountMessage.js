import styles from "./CountMessage.module.scss";

function CountMessage({ messageProfiles, messageCount, page }) {
  return (
    <div className={styles[page]}>
      {messageCount === 0 ? (
        <div className={`${styles["no-message"]} font-16-16-14`}>
          첫 메시지를 남겨주세요!
        </div>
        
      ) : (
        <>
          <ol className={styles.profiles}>
            {messageProfiles &&
              messageProfiles.map((profile) => (
                <li key={profile.id} className={styles.profile}>
                  <img src={profile.imgURL} alt={`프로필 이미지`} />
                </li>
              ))}
            {messageCount > 3 && (
              <div className={`${styles["extra-profile"]} font-12-12-12`}>
                {" "}
                +{messageCount - 3}
              </div>
            )}
          </ol>
          <div className={`${styles["message-count"]} font-16-16-14`}>
            <span className={styles.bold}>{messageCount}</span>명이 작성했어요!
          </div>
        </>
      )}
    </div>
  );
}

export default CountMessage;
