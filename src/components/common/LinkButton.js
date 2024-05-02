import { Link } from "react-router-dom";
import style from "./LinkButton.module.scss";

export default function LinkButton({ text, url }) {
  return (
    <Link to={url} className={`${style.button} font-18`}>
      {text}
    </Link>
  );
}
