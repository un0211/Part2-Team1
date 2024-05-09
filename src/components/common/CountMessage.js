import { TEAM_BASE_URL } from "constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './CountMessage.module.scss';

const getCountURL = (cardId) => `${TEAM_BASE_URL}recipients/${cardId}`;

function CountMessage() {
  const { cardId } = useParams();
  const [recentMessages, setRecentMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await fetch(getCountURL(cardId));
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecentMessages(data.recentMessages);
        setMessageCount(data.messageCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCount();
  }, [cardId]);

  return (
    <div>
      <div className={`profiles`}>
        {recentMessages && recentMessages.length > 0 ? (
          recentMessages.map((message, index) => (
            <img
              key={index}
              className={styles.profile}
              src={message.profileImageURL}
              alt={`프로필 이미지${index + 1}`}
            />
          ))
        ) : (
          <div>No recent messages</div>
        )}
      <div className={styles.reactionCount}>+ {messageCount - 3}</div>
      </div>
      <div>{messageCount}명이 작성했어요!</div>
    </div>
  );
}

export default CountMessage;
