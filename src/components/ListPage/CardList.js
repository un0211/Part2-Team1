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

  const messageProfiles = recentMessages.map((message) => ({
    id: message.id,
    imgURL: message.profileImageURL,
  }));

  const cardStyle = {
    backgroundColor: `var(--${backgroundColor}200)`,
    backgroundImage: `url(${backgroundImageURL})`,
  };

  const backgroundClass = backgroundImageURL ? "bg-url" : 
                      backgroundColor === "purple" ? "bg-purple" :
                      backgroundColor === "beige" ? "bg-yellow" :
                      backgroundColor === "green" ? "bg-green" :
                      "bg-blue";
  return (
    <div className={styles["CardList"]} style={cardStyle}>
      <div className={`${styles["bg-setting"]} ${styles[backgroundClass]}`}>
        <Link to={`/post/${id}`} className={styles["bg-setting"]}>
          <h3 className={`font-24-bold ${styles["name"]}`}>To. {name}</h3>
          <CountMessage
            messageProfiles={messageProfiles}
            messageCount={messageCount}
            page={LIST_PAGE}
          />
          <TopReaction topReactions={topReactions} />
        </Link>
      </div>
    </div>
  );
}

export default CardList;
