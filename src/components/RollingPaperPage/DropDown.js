import { useState } from "react";
import styles from "./DropDown.module.scss";
import shareIcon from "assets/icons/share.svg";

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownClick = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["drop-down"]}>
      <button type="button" onClick={handleDropDownClick}>
        <img src={shareIcon} alt="공유" />
      </button>
      {isOpen && (
        <ul className={`${styles.menus} font-16-16-16`}>
          <li className={styles.menu} onClick={() => handleMenuClick()}>
            카카오톡 공유
          </li>
          <li className={styles.menu} onClick={() => handleMenuClick()}>
            URL 공유
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropDown;
