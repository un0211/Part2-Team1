import logo from 'assets/icons/logo.svg';
import style from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className={style.header}>
      <div className={style['logo-button-container']}>
        <Link to="/" className={style['logo-container']}>
          <img src={logo} className={style.logo} alt="로고" />
          <h1 className={style['logo-text']}>Rol1ing</h1>
        </Link>
        {(location.pathname === '/' || location.pathname === '/list') && (
          <Link to="/post">
            <button className={style['post-button']}>롤링 페이퍼 만들기</button>
          </Link>
        )}
      </div>
    </header>
  );
}
