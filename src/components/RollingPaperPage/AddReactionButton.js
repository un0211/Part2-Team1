import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import addEmojiIcon from "assets/icons/add_emoji.svg";
import styles from "./AddReactionButton.module.scss";

function AddEmojiButton() {
  const [isPickerHidden, setIsPickerHidden] = useState(true);

  const handleButtonClick = () => {
    setIsPickerHidden((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={styles["add-emoji-container"]}>
      <button
        type="button"
        className={styles["add-emoji"]}
        onClick={handleButtonClick}
      >
        <img src={addEmojiIcon} alt="반응 추가" />
        <p>추가</p>
      </button>
      <div className={isPickerHidden ? styles.hidden : ""}>
        <Picker
          data={data}
          theme="light"
          set="native"
          searchPosition="sticky"
          skinTonePosition="search"
          onEmojiSelect={console.log}
        />
      </div>
    </div>
  );
}

export default AddEmojiButton;
