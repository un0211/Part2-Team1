import AddEmojiButton from "./AddReactionButton";
import CountMessage from "components/common/CountMessage";
import Reactions from "components/common/Reactions";
import ShareDropDown from "./ShareDropDown";
import { POST_PAGE } from "constants";
import arrowDownIcon from "assets/icons/arrow_down.svg";
import styles from "./Nav.module.scss";

function Nav({
  postInfo,
  isPickerHidden,
  isDropDownHidden,
  onEmojiButtonClick,
  onShareButtonClick,
  onKakaoClick,
  onURLClick,
}) {
  const { name, messageCount, messageProfiles, topReactions } = postInfo;

  return (
    <nav className={styles.nav}>
      <div className={styles.contents}>
        <div className={`${styles.name} font-28-28-18-bold`}>To. {name}</div>
        <div className={styles["post-info"]}>
          <div className={styles["PC-only"]}>
            <CountMessage
              messageCount={messageCount}
              messageProfiles={messageProfiles}
              page={POST_PAGE}
            />
          </div>
          <div className={`${styles.divider} ${styles["PC-only"]}`}></div>
          <div className={styles.tools}>
            <Emojis topReactions={topReactions} />
            <Buttons
              name={name}
              isPickerHidden={isPickerHidden}
              isDropDownHidden={isDropDownHidden}
              onEmojiButtonClick={onEmojiButtonClick}
              onShareButtonClick={onShareButtonClick}
              onKakaoClick={onKakaoClick}
              onURLClick={onURLClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function Emojis({ topReactions }) {
  return (
    <div className={styles.emojis}>
      <Reactions reactions={topReactions} />
      <button type="button" className={styles["more-emoji-button"]}>
        <img src={arrowDownIcon} alt="반응 더보기" />
      </button>
    </div>
  );
}

function Buttons({
  name,
  isPickerHidden,
  isDropDownHidden,
  onEmojiButtonClick,
  onShareButtonClick,
  onKakaoClick,
  onURLClick,
}) {
  return (
    <div className={styles.buttons}>
      <AddEmojiButton
        isPickerHidden={isPickerHidden}
        onAddButtonClick={onEmojiButtonClick}
      />
      <div className={styles.divider}></div>
      <ShareDropDown
        name={name}
        isDropDownHidden={isDropDownHidden}
        onShareButtonClick={onShareButtonClick}
        onKakaoClick={onKakaoClick}
        onURLClick={onURLClick}
      />
    </div>
  );
}

export default Nav;
