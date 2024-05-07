import React, { useState } from "react";
import ArrowIcon from "../../assets/icons/arrow_down.svg";

export default function CustomDropdown({ props }) {
  // useState를 컴포넌트의 최상위 레벨에서 호출
  const [selected, setSelected] = useState(props && props.length ? props[0].text : "No items available");
  const [active, setActive] = useState(false);

  // props가 없거나 비어있는 경우를 먼저 처리
  if (!props || props.length === 0) {
    return <p>{selected}</p>;
  }

  const handleChange = (e) => {
    const { innerText } = e.target;
    setSelected(innerText);
  };

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div className="message-form__inputs" onClick={handleToggle}>
      {selected}
      <img
        className="message-form__arrow-icon"
        alt="아래 방향 화살표 아이콘"
        src={ArrowIcon}
      />
      <div
        className={`message-form__drop-down-menu-box ${
          active ? "message-form__drop-down-menu-box--active" : ""
        }`}
        onClick={handleChange}
      >
        {props.map((item) => {
          return (
            <div className="message-form__drop-down-menu" key={item.id}>
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
