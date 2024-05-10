import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import addEmojiIcon from "assets/icons/add_emoji.svg";
import styles from "./AddReactionButton.module.scss";

function AddEmojiButton() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPickerOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <button
        type="button"
        className={styles["add-emoji"]}
        onClick={handleButtonClick}
      >
        <img src={addEmojiIcon} alt="반응 추가" />
        <p>추가</p>
      </button>
      {isPickerOpen && <Picker data={data} />}
    </>
  );
}

export default AddEmojiButton;
