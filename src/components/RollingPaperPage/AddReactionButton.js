import { useState } from "react";
import { useParams } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { postReaction } from "apis/rollingPaperPage";
import addEmojiIcon from "assets/icons/add_emoji.svg";
import styles from "./AddReactionButton.module.scss";

function AddEmojiButton() {
  const { postId } = useParams();
  const [isPickerHidden, setIsPickerHidden] = useState(true);

  const handleButtonClick = () => {
    setIsPickerHidden((prevIsOpen) => !prevIsOpen);
  };

  const handleEmojiClick = ({ native }) => {
    postReaction(postId, {
      emoji: native,
      type: "increase",
    });
  };

  return (
    <div className={styles["add-emoji-container"]}>
      <button
        type="button"
        className={styles["add-emoji"]}
        onClick={handleButtonClick}
      >
        <img src={addEmojiIcon} alt="반응 추가" />
        <p>{isPickerHidden ? "추가" : "닫기"}</p>
      </button>
      <div className={isPickerHidden ? styles.hidden : ""}>
        <Picker
          data={data}
          theme="light"
          set="native"
          searchPosition="sticky"
          skinTonePosition="search"
          onEmojiSelect={handleEmojiClick}
        />
      </div>
    </div>
  );
}

export default AddEmojiButton;
