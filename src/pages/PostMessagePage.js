import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "pages/PostMessagePage.module.scss";
import CustomDropdown from "components/CreateMessage/CustomDropdown";
import ProfileSelect from "components/CreateMessage/ProfileSelect";
import {
  FONT_CLASS_NAME,
  MEMBER_CLASS_NAME,
  PROFILES,
  DEFUALT_PROFILE,
} from "constants/postMessagePage";
import { useParams, useNavigate } from "react-router-dom";
import { postMessage } from "apis/recipients";
import { useEffect } from "react";

export default function PostMessageForm() {
  const [senderValue, setSenderValue] = useState("");
  const [senderError, setSenderError] = useState(false);
  const [relationship, setRelationship] = useState("지인");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [editorError, setEditorError] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Noto Sans");
  const [selectedProfile, setSelectedProfile] = useState(DEFUALT_PROFILE);
  const [editorContent, setEditorContent] = useState("");

  // NOTE - id 받아오는 작업
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const name = e.target.value.trim(); //NOTE 공백을 제거하여 입력값 확인
    setSenderValue(name);
    // NOTE - 1글자 이상 입력 중 에러 메세지 사라지도록 처리
    if (name.length > 0) {
      setSenderError(false);
    }
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    setEditorContent(html);

    const isEmpty = !state.getCurrentContent().hasText();
    setEditorError(isEmpty);
  };

  const handleSenderFocusOut = () => {
    if (senderValue.trim() === "") {
      setSenderError(true);
    }
  };

  const handleProfileSelect = (src) => {
    setSelectedProfile(src);
  };

  const isButtonDisabled =
    !editorContent || !senderValue || senderError || editorError;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      team: "6-1",
      recipientId: postId,
      sender: senderValue,
      relationship: relationship,
      content: editorContent,
      font: selectedFont,
      profileImageURL: selectedProfile,
    };

    try {
      await postMessage(postId, formData);
      navigate(`/post/${postId}`); // NOTE 페이지 이동
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${styles["message-form"]} ${senderError ? "error" : ""}`}
      >
        <div className={styles["message-form-sender"]}>
          <label
            htmlFor="nameInput"
            className={`${styles["message-form-title"]}`}
          >
            From.
          </label>
          <input
            onChange={handleNameChange}
            onBlur={handleSenderFocusOut}
            className={`${styles["message-form-inputs"]} ${
              styles["message-form-name-input"]
            } ${senderError ? styles.error : ""}`}
            id="nameInput"
            placeholder="이름을 입력해 주세요."
          />
          {senderError && (
            <p className={styles["form-error"]}>값을 입력해주세요.</p>
          )}{" "}
        </div>

        <ProfileSelect
          onProfileSelect={handleProfileSelect}
          selectedProfile={selectedProfile}
        />

        <div className={styles["message-form-relationship"]}>
          <label htmlFor="select" className={styles["message-form-title"]}>
            상대와의 관계
          </label>
          <CustomDropdown
            props={Object.keys(MEMBER_CLASS_NAME)}
            onSelect={(value) => setRelationship(value)}
          />
        </div>

        <div
          className={`${styles["message-form-content"]} ${
            editorError ? styles.error : ""
          }`}
        >
          <label htmlFor="textarea" className={styles["message-form-title"]}>
            내용을 입력해 주세요
          </label>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName={styles["message-form-text-editor-wrapper"]}
            editorClassName={`${styles["message-form-text-editor"]} ${
              editorError ? styles.error : ""
            }`}
            toolbar={{
              options: ["inline", "textAlign", "history"],
            }}
          />
          {editorError && (
            <p className={styles["form-error"]}>값을 입력해주세요.</p>
          )}
        </div>

        <div className={styles["message-form-font"]}>
          <span className={styles["message-form-title"]}>폰트 선택</span>
          <CustomDropdown
            props={Object.keys(FONT_CLASS_NAME)}
            onSelect={(value) => setSelectedFont(value)}
          />
        </div>
        <button
          className={`${styles["message-form-submit"]}`}
          type="submit"
          disabled={isButtonDisabled}
        >
          생성하기
        </button>
      </div>
    </form>
  );
}
