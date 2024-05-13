import styles from "./Reactions.module.scss";

function Reactions({ reactions, page }) {
  return (
    <ol className={`${styles["reaction-box"]} ${styles[page]}`}>
      {reactions?.length > 0 &&
        reactions.map((reaction) => (
          <li key={reaction.id} className="reaction font-16-16-14">
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
