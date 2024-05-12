import { useEffect, useState } from "react";
import AddEmojiButton from "./AddReactionButton";
import CountMessage from "components/common/CountMessage";
import Reactions from "components/common/Reactions";
import ShareDropDown from "./ShareDropDown";
import { getReaction } from "apis/rollingPaperPage";
import { POST_PAGE } from "constants";
import arrowDownIcon from "assets/icons/arrow_down.svg";
import styles from "./Nav.module.scss";

function Nav({
  postInfo,
  isReactionHidden,
  isPickerHidden,
  isDropDownHidden,
  onMoreReactionClick,
  onEmojiButtonClick,
  onShareButtonClick,
  onKakaoClick,
  onURLClick,
}) {
  const { postId, name, messageCount, messageProfiles, topReactions } =
    postInfo;

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
            <Emojis
              postId={postId}
              topReactions={topReactions}
              isReactionHidden={isReactionHidden}
              onMoreReactionClick={onMoreReactionClick}
            />
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

function Emojis({
  postId,
  topReactions,
  isReactionHidden,
  onMoreReactionClick,
}) {
  const [reactions, setReactions] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const handleLoad = async () => {
      let reactionResult;
      try {
        setLoadingError(null);
        reactionResult = await getReaction(postId);
      } catch (e) {
        setLoadingError(e);
        return;
      }

      const { results: newReactions } = reactionResult;
      setReactions(newReactions);
    };

    handleLoad();
  }, [postId]);

  return (
    <div className={styles.reactions}>
      <Reactions reactions={topReactions} />
      <button
        type="button"
        className={styles["more-reaction-button"]}
        onClick={onMoreReactionClick}
      >
        <img src={arrowDownIcon} alt="반응 더보기" />
      </button>
      {!isReactionHidden && (
        <div className={styles["reaction-box"]}>
          {reactions.length <= 4 ? (
            <Reactions reactions={reactions} />
          ) : (
            <>
              <Reactions reactions={reactions.slice(0, 4)} />
              <Reactions reactions={reactions.slice(4)} />
            </>
          )}
        </div>
      )}
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
