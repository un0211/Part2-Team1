import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "styles/PostMessagePage.module.scss";
import basicProfile from "assets/images/profile_basic.svg";
import CustomDropdown from "components/CreateMessage/CustomDropdown";
import profile1 from "assets/images/profile_01.svg";
import profile2 from "assets/images/profile_02.svg";
import profile3 from "assets/images/profile_03.svg";
import plus from "assets/icons/plus.svg";
import { MEMBER_CLASS_NAME, FONT_CLASS_NAME } from "constants/postMessagePage";

export default function PostFromPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedProfile, setSelectedProfile] = useState(basicProfile);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleProfileClick = (profile) => {
    if (profile === plus) {
      document.getElementById("fileInput").click();
    } else {
      setSelectedProfile(profile);
    }
  };

  const profiles = [
    profile1,
    profile2,
    profile3,
    profile1,
    profile2,
    profile3,
    profile1,
    profile2,
    profile3,
  ];

  return (
    <div className={styles["message-form"]}>
      <div className={styles["message-form-sender"]}>
        <label htmlFor="nameInput" className={styles["message-form-title"]}>
          From.
        </label>
        <input
          className={`${styles["message-form-inputs"]} ${styles["message-form-name-input"]}`}
          id="nameInput"
          placeholder="이름을 입력해 주세요."
        />
      </div>

      <div className={styles["message-form-profile"]}>
        <span className={styles["message-form-title"]}>프로필 이미지</span>
        <div className={styles["message-form-profile-container"]}>
          <img src={selectedProfile} alt="프로필 이미지 미리보기" />
          <div className={styles["message-form-profile-options"]}>
            <span className={styles["message-form-profile-options-title"]}>
              프로필 이미지를 선택해주세요!
            </span>
            <div className={styles["message-form-profile-preview-container"]}>
              {profiles.map((profile, i) => (
                <img
                  key={i}
                  className={styles["message-form-profile-preview"]}
                  src={profile}
                  alt={`프로필 이미지 ${i + 1}`}
                  onClick={() => handleProfileClick(profile)}
                />
              ))}
              <img
                className={styles["message-form-profile-preview"]}
                src={plus}
                alt="프로필 이미지 추가"
                onClick={() => handleProfileClick(plus)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles["message-form-relationship"]}>
        <label htmlFor="select" className={styles["message-form-title"]}>
          상대와의 관계
        </label>
        <CustomDropdown props={Object.keys(MEMBER_CLASS_NAME)} />
      </div>

      <div className={styles["message-form-content"]}>
        <label htmlFor="textarea" className={styles["message-form-title"]}>
          내용을 입력해 주세요
        </label>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName={styles["message-form-text-editor-wrapper"]}
          editorClassName={styles["message-form-text-editor"]}
          toolbar={{
            options: ["inline", "textAlign", "emoji", "remove", "history"],
          }}
        />
      </div>
      <div className={styles["message-form-font"]}>
        <span className={styles["message-form-title"]}>폰트 선택</span>
        <CustomDropdown props={Object.keys(FONT_CLASS_NAME)} />
      </div>
      <button className={styles["message-form-submit"]}>생성하기</button>
    </div>
  );
}
