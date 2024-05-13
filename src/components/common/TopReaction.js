import styles from "./TopReaction.module.scss";

function TopReaction({ topReactions }) {

  return (
    <div className={styles["reaction-box"]}>
      {topReactions && topReactions.length > 0 ?(
        topReactions.map((reaction) => (
          <div key={reaction.id} className="reaction">
            <div className={styles["emoji-box"]}>
              <div className={styles["show-reaction"]}>
                <div className='emoji'>
                  {reaction.emoji}
                </div>
                <div className='count'>
                  {reaction.count}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles["non-reacted"]}>
          관심을 기다리는 중...
        </div>
      )}
    </div>
  );
}

export default TopReaction;
