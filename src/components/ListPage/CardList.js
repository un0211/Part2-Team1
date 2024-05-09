import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardList.module.scss';
import CountMessage from 'components/common/CountMessage';
import TopReaction from 'components/common/TopReaction';


function CardList({ slideItems }) {

  if (!slideItems || !slideItems.recentMessages || slideItems.recentMessages.length === 0) return null;

  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    reactionCount,
    topReactions,
    messageCount,
    recentMessages,
  } = slideItems;

  const cardStyle = {
    backgroundColor: `var(--${backgroundColor}200)`,
    backgroundImage: `url(${backgroundImageURL})`,
  };
  console.log(slideItems);
  return (
    <div className={styles.CardList} style={cardStyle}>
      <Link to={`/post/${id}`} className={styles.CardList}>
        <h3 className={`font-24-bold`}>To. {name}</h3>
        <CountMessage
        id={id}
        recentMessages={recentMessages}
        reactionCount={reactionCount}
        messageCount={messageCount}
        />
        <TopReaction topReactions={topReactions} />
      </Link>
    </div>
  );
}

export default CardList;
