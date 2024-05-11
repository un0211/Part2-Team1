<<<<<<< HEAD
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

=======
import copy from "copy-to-clipboard";
import { useCallback, useEffect, useState } from "react";
import { getKakaoShareSettings } from "utils/rollingPaperPage";
import { KAKAO_JAVASCRIPT_KEY, SHARE_IMAGE_URL } from "constants";
import shareIcon from "assets/icons/share.svg";
import styles from "./DropDown.module.scss";

const KAKAO_BUTTON_NAME = "kakaotalk-sharing-btn";

function DropDown({ name, onURLClick }) {
  const domainURL = window.location.origin;
  const currentURL = window.location.href;
  const [isHidden, setIsHidden] = useState(true);

  const handleDropDownClick = (e) => {
    setIsHidden((isHidden) => !isHidden);
  };

  const handleURLClick = () => {
    copy(currentURL);
    onURLClick();
    setIsHidden(true);
  };

  const createKakaoButton = useCallback(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_JAVASCRIPT_KEY);
      }

      kakao.Share.createDefaultButton(
        getKakaoShareSettings({
          buttonName: `#${KAKAO_BUTTON_NAME}`,
          name,
          imgURL: SHARE_IMAGE_URL,
          domainURL,
          currentURL,
        })
      );
    }
  }, [name, domainURL, currentURL]);

  useEffect(() => {
    createKakaoButton();
  }, [createKakaoButton]);

  useEffect(() => {
    const kakaoButton = document.querySelector(`#${KAKAO_BUTTON_NAME}`);
    kakaoButton.addEventListener("click", () => {
      setIsHidden(true);
    });
  }, []);

>>>>>>> develop
  return (
    <div className={styles["drop-down"]}>
      <button type="button" onClick={handleDropDownClick}>
        <img src={shareIcon} alt="공유" />
      </button>
<<<<<<< HEAD
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
=======
      <ul
        className={`${styles.menus} font-16-16-16 ${
          isHidden ? styles.hidden : ""
        } `}
      >
        <li id={KAKAO_BUTTON_NAME} className={styles.menu}>
          카카오톡 공유
        </li>
        <li className={styles.menu} onClick={() => handleURLClick()}>
          URL 공유
        </li>
      </ul>
>>>>>>> develop
    </div>
  );
}

export default DropDown;
