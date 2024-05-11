import copy from "copy-to-clipboard";
import { useCallback, useEffect, useState } from "react";
import { getKakaoShareSettings } from "utils/rollingPaperPage";
import { KAKAO_JAVASCRIPT_KEY, SHARE_IMAGE_URL } from "constants";
import shareIcon from "assets/icons/share.svg";
import styles from "./ShareDropDown.module.scss";

const KAKAO_BUTTON_NAME = "kakaotalk-sharing-btn";

function ShareDropDown({ name, onURLClick }) {
  const domainURL = window.location.origin;
  const currentURL = window.location.href;
  const [isHidden, setIsHidden] = useState(true);

  const handleDropDownClick = useCallback(() => {
    setIsHidden((isHidden) => !isHidden);
  }, []);

  const handleURLClick = useCallback(() => {
    copy(currentURL);
    onURLClick();
    setIsHidden(true);
  }, [currentURL, onURLClick]);

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

  return (
    <div className={styles["drop-down"]}>
      <button type="button" onClick={handleDropDownClick}>
        <img src={shareIcon} alt="공유" />
      </button>
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
    </div>
  );
}

export default ShareDropDown;
