import { Link } from 'react-router-dom';
import styles from './CardList.module.scss';
import CountMessage from 'components/common/CountMessage';

function CardList({ slideItems }) {

  if (!slideItems || !slideItems.recentMessages || slideItems.recentMessages.length === 0) return null;

  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    reactionCount,
    topReactions,
  } = slideItems;

  const cardStyle = {
    backgroundColor: backgroundColor,
    backgroundImage: `url(${backgroundImageURL})`,
  };

  return (
    <div className={styles.CardList} style={cardStyle}>
      <Link to={`/post/${id}`} className={styles.CardList}>
        <h3 className={`font-24-bold`}>To. {name}</h3>
        <CountMessage> </CountMessage>

        <div className="emptybox"> </div>
        <div className="reactionBox">
          {topReactions.map((reaction, index) => (
            <div key={index}>
              {reaction.emoji} {reaction.count}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default CardList;
