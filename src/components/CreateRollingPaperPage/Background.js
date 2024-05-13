export default function Background({
  backgrounds,
  name,
  onBackgroundSelect,
  checkedValue,
}) {
  return (
    <>
      {backgrounds.map((background, index) => (
        <>
          <input
            type="radio"
            name={name}
            id={background}
            value={name === "color" ? background : BACKGROUND_IMAGE[background]}
            className={styles["select-bg-input"]}
            onChange={onBackgroundSelect}
            key={index}
          />
          <label
            htmlFor={background}
            className={`${styles[background]} ${styles["select-bg-label"]}`}
          >
            <div
              className={`${styles["checked-container"]} ${
                checkedValue ===
                (name === "color" ? background : BACKGROUND_IMAGE[background])
                  ? styles["checked-background-opacity"]
                  : ""
              }`}
            >
              <img
                src={selected}
                alt="선택 아이콘"
                className={`${
                  checkedValue ===
                  (name === "color" ? background : BACKGROUND_IMAGE[background])
                    ? ""
                    : styles["none-checked-background"]
                }`}
              />
            </div>
          </label>
        </>
      ))}
    </>
  );
}
