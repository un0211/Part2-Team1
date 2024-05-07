import { Link } from "react-router-dom";
import styles from " .Card_list.module.scss";

function Card_list({summary}){
  const {id, name, backgroundColor, backgroundImageURL, profileImageURL, messageCount, reactionCount, topReactions} = summary

  const cardStyle = {
    backgroundColor: backgroundColor,
    backgroundImage: `url(${backgroundImageURL})`,
  };

  return(
    <div className={styles.Care_list} style={cardStyle}>
      <Link to={`/card/${id}`} className={styles.Card_list}></Link>
      <h3 className={`font-24-bold`}>To. {name}</h3>
      <div className={`profiles`}>
        <img
          className={styles.profile}
          src={profileImageURL}
          alt="프로필 이미지1"
        />
        <img
          className={styles.profile}
          src={profileImageURL}
          alt="프로필 이미지2"
        />
        <img
          className={styles.profile}
          src={profileImageURL}
          alt="프로필 이미지3"
        />
        //FIXME - 작성자 이미지 여러개 받아오는 방법 모르겠습니다!!!
        <div className={styles.reactionCount}>
          + {messageCount - 3}
        </div>
        <div>{messageCount}명이 작성했어요!</div>
        <div className='emptybox'> </div>
        <div className='reactionBox'>
          <div>{topReactions}</div>
          <div>{reactionCount}</div>
        </div>
      </div>
      
    </div>
  );
}

export default Card_list;