import styles from "./Reactions.module.scss";

function Reactions({ reactions }) {
  return (
    <ol className={styles["reaction-box"]}>
      {reactions?.length > 0 &&
        reactions.map((reaction) => (
          <li key={reaction.id} className="reaction">
            <div className={styles["emoji-box"]}>
              <div className="emoji">{reaction.emoji}</div>
              <div className="count">{reaction.count}</div>
            </div>
          </li>
        ))}
    </ol>
  );
}

export default Reactions;
