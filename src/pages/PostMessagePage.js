import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "styles/PostMessagePage.module.scss";
import CustomDropdown from "components/CreateMessage/CustomDropdown";
import ProfileOptions from "components/CreateMessage/ProfileSelect";
import { MEMBER_CLASS_NAME, FONT_CLASS_NAME } from "constants/postMessagePage";

export default function PostMessageForm() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const [nameInputError, setNameInputError] = useState(false);
  const profileOptionsRef = useRef(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleFileChange = (event) => {
    let fileArr = event.target.files;
    setPostImg(Array.from(fileArr));

    let fileRead = new FileReader();
    fileRead.onload = function () {
      setPreviewImg(fileRead.result);
    };

    fileRead.readAsDataURL(fileArr[0]);
  };

  const handleSubmit = () => {
    // NOTE 추가된 부분: 'From.' Input 에러 상태 처리
    const nameInputValue = document.getElementById("nameInput").value;
    if (!nameInputValue.trim()) {
      setNameInputError(true);
      return;
    }
    setNameInputError(false);
   
  };

  return (
    <div className={styles["message-form"]}>
      <div className={styles["message-form-sender"]}>
        <label htmlFor="nameInput" className={styles["message-form-title"]}>
          From.
        </label>
        <input
          className={`${styles["message-form-inputs"]} ${styles["message-form-name-input"]} ${nameInputError ? styles["error"] : ""}`} // 변경된 부분
          id="nameInput"
          placeholder="이름을 입력해 주세요."
        />
        {nameInputError && <p className={styles["error-message"]}>값을 입력해 주세요.</p>}
      </div>

      <ProfileOptions ref={profileOptionsRef} /> 

      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {previewImg && (
        <div className="image-upload-container">
          <img src={previewImg} alt="Preview" />
        </div>
      )}

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
      <button className={styles["message-form-submit"]} onClick={handleSubmit}>생성하기</button>
    </div>
  );
}
