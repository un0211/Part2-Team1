import { Link } from "react-router-dom";
import styles from " .Card_list.module.scss";

function Card_list({ summary }) {
  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    profileImageURL,
    messageCount,
    reactionCount,
    topReactions,
    recentMessages,
  } = summary;

  const cardStyle = {
    backgroundColor: backgroundColor,
    backgroundImage: `url(${backgroundImageURL})`,
  };

  return (
    <div className={styles.Card_list} style={cardStyle}>
      <Link to={`/card/${id}`} className={styles.Card_list}></Link>
      <h3 className={`font-24-bold`}>To. {name}</h3>
      <div className={`profiles`}>
        {recentMessages.map((message, index) => (
          <img
            key={index}
            className={styles.profile}
            src={message.profileImageURL}
            alt={`프로필 이미지${index + 1}`}
          />
        ))}
      </div>
      <div className={styles.reactionCount}>+ {messageCount - 3}</div>
      <div>{messageCount}명이 작성했어요!</div>
      <div className="emptybox"> </div>
      <div className="reactionBox">
        {topReactions.map((reaction, index) => (
          <div key={index}>
            {reaction.emoji} {reaction.count}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card_list;
