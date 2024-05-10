import DropDown from "./DropDown";
import arrowDownIcon from "assets/icons/arrow_down.svg";
import addEmojiIcon from "assets/icons/add_emoji.svg";
import styles from "./Nav.module.scss";

function Nav({ postInfo, onURLClick }) {
  const { name, messageCount, messageProfiles } = postInfo;

  return (
    <nav className={styles.nav}>
      <div className={styles.contents}>
        <div className={`${styles.name} font-28-28-18-bold`}>To. {name}</div>
        <div className={styles["post-info"]}>
          <>{messageCount}명이 작성했어요</>
          <div className={styles.divider}></div>
          <div className={styles.tools}>
            <Emojis />
            <Buttons name={name} onURLClick={onURLClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function Emojis() {
  return (
    <div className={styles.emojis}>
      <>이모지 목록</>
      <button type="button" className={styles["more-emoji-button"]}>
        <img src={arrowDownIcon} alt="반응 더보기" />
      </button>
    </div>
  );
}

function Buttons({ name, onURLClick }) {
  return (
    <div className={styles.buttons}>
      <button type="button" className={styles["add-emoji"]}>
        <img src={addEmojiIcon} alt="반응 추가" />
        <p>추가</p>
      </button>
      <div className={styles.divider}></div>
      <DropDown name={name} onURLClick={onURLClick} />
    </div>
  );
}

export default Nav;
