import logo from "assets/icons/logo.svg";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles["logo-button-container"]}>
        <Link to="/" className={styles["logo-container"]}>
          <img src={logo} className={styles.logo} alt="로고" />
          <h1 className={styles["logo-text"]}>Ro1ling</h1>
        </Link>
        {(location.pathname === "/" || location.pathname === "/list") && (

          <Link to="/post">
            <button className={styles["post-button"]}>
              롤링 페이퍼 만들기
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
