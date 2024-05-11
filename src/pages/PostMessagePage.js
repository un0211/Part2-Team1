// PostMessageForm.js
import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "styles/PostMessagePage.module.scss";
import CustomDropdown from "components/CreateMessage/CustomDropdown";
import ProfileSelect from "components/CreateMessage/ProfileSelect";
import { FONT_CLASS_NAME, MEMBER_CLASS_NAME } from "constants/postMessagePage";

export default function PostMessageForm() {
  const [senderValue, setSenderValue] = useState("");
  const [relationship, setRelationship] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleNameChange = (e) => {
    setSenderValue(e.target.value);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sender", senderValue);
    formData.append("relationship", relationship);
    formData.append("content", stateToHTML(editorState.getCurrentContent()));
    formData.append("font", selectedFont);

    if (selectedProfile) {
      formData.append("profileImage", selectedProfile.src);
      formData.append("profileImageName", selectedProfile.filename);
    }

    for (var entries of formData.entries()) {
      console.log("key: " + entries[0]);
      console.log("value: " + entries[1]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["message-form"]}>
        <div className={styles["message-form-sender"]}>
          <label htmlFor="nameInput" className={styles["message-form-title"]}>
            From.
          </label>
          <input
            onChange={handleNameChange}
            className={`${styles["message-form-inputs"]} ${styles["message-form-name-input"]}`}
            id="nameInput"
            placeholder="이름을 입력해 주세요."
          />
        </div>

        <ProfileSelect onProfileSelect={handleProfileSelect} />

        <div className={styles["message-form-relationship"]}>
          <label htmlFor="select" className={styles["message-form-title"]}>
            상대와의 관계
          </label>
          <CustomDropdown
            props={Object.keys(MEMBER_CLASS_NAME)}
            onSelect={(value) => setRelationship(value)}
          />
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
          <CustomDropdown
            props={Object.keys(FONT_CLASS_NAME)}
            onSelect={(value) => setSelectedFont(value)}
          />
        </div>
      </div>
      <button className={styles["message-form-submit"]} type="submit">
        생성하기
      </button>
    </form>
  );
}
