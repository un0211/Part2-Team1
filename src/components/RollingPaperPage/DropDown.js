import { useCallback, useEffect, useState } from "react";
import { getKakaoShareSettings } from "utils/rollingPaperPage";
import { KAKAO_JAVASCRIPT_KEY } from "constants";
import styles from "./DropDown.module.scss";
import shareIcon from "assets/icons/share.svg";

const KAKAO_BUTTON_NAME = "kakaotalk-sharing-btn";

function DropDown({ name }) {
  const [isHidden, setIsHidden] = useState(true);

  const handleDropDownClick = (e) => {
    setIsHidden((isHidden) => !isHidden);
  };

  const handleMenuClick = () => {
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
          imgURL: "https://ifh.cc/g/k8zYH3.jpg",
          domainURL: window.location.origin,
          currentURL: window.location.href,
        })
      );
    }
  }, [name]);

  useEffect(() => {
    createKakaoButton();
  }, [createKakaoButton]);

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
        <li className={styles.menu} onClick={() => handleMenuClick()}>
          URL 공유
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
