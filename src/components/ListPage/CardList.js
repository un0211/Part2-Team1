import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";
import CountMessage from "components/common/CountMessage";
import TopReaction from "components/common/TopReaction";
import { LIST_PAGE } from "constants";

function CardList({ slideItems }) {
  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    topReactions,
    messageCount,
    recentMessages,
  } = slideItems;

  const messageProfiles = recentMessages.map(
    (message) => message.profileImageURL
  );

  const cardStyle = {
    backgroundColor: `var(--${backgroundColor}200)`,
    backgroundImage: `url(${backgroundImageURL})`,
  };

  return (
    <div className={styles.CardList} style={cardStyle}>
      <Link to={`/post/${id}`} className={styles.CardList}>
        <h3 className={`font-24-bold`}>To. {name}</h3>
        <CountMessage
          messageProfiles={messageProfiles}
          messageCount={messageCount}
          page={LIST_PAGE}
        />
        <TopReaction
        topReactions={topReactions}
        />
      </Link>
    </div>
  );
}

export default CardList;
