import { forwardRef } from "react";
import CustomDropdown from "./CustomDropdown";
import { FONTS } from "apis/postMessagePage";

function FontOptions(_, fontOptionsRef) {
  return (
    <div className="message-form__font">
      <span className="message-form__title">폰트 선택</span>
      <CustomDropdown props={FONTS} ref={fontOptionsRef} />
    </div>
  );
}

export default forwardRef(FontOptions);
