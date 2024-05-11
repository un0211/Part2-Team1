import styles from "./TopReaction.module.scss";

function TopReaction({topReactions, reactionCount }) {

  return (
    <div className={styles[`reaction-box`]}>
      {reactionCount && reactionCount.length > 0 ?(
        topReactions.map((id) => (
          <div key={topReactions} className="reaction">
            <span>
            {topReactions.emoji} {topReactions.count}
            </span>
          </div>
        ))
      ) : (
        <div className="reaction"><span>❌ 00</span> <span>❌ 00</span> </div>
      )}
    </div>
  );
}

export default TopReaction;
