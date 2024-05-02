import style from "./Button.module.scss";

export default function Button({ children }) {
  return (
    <button className={`${style.button} font_18_regular`}>{children}</button>
  );
}
