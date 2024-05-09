import styles from './CountMessage.module.scss';

function CountMessage({ id, recentMessages, reactionCount, messageCount }) {


  return (
    <div>
      <div className={styles.profiles}>
        {recentMessages && recentMessages.length > 0 ? (
          recentMessages.map((message) => (
            <img
              key={message.id}
              className={styles.profile}
              src={message.profileImageURL}
              alt={`프로필 이미지`}
            />
          ))
        ) : (
          <div>No recent messages</div>
        )}
      {messageCount > 3 && <div className={styles['extra-profile']}> +{messageCount - 3}</div>}
      </div>
      <div className={styles['message-count']}>{messageCount}명이 작성했어요!</div>
    </div>
  );
}

export default CountMessage;
