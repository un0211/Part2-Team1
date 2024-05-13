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
import { useParams, useNavigate } from "react-router-dom";
import { putMessage } from "apis/messages";

export default function PostMessageForm() {
  const [senderValue, setSenderValue] = useState("");
  const [relationship, setRelationship] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // NOTE - id 받아오는 작업
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setSenderValue(e.target.value);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    console.log(state.getCurrentContent().getPlainText("\n"));
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const removePTags = (html) => {
    return html.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      team: "6-1",
      recipientId: postId,
      sender: senderValue,
      relationship: relationship,
      content: removePTags(stateToHTML(editorState.getCurrentContent())),
      font: selectedFont,
      profileImageURL: selectedProfile.src,
    };

    try {
      await putMessage(postId, formData);
      navigate(`/post/${postId}`); // NOTE 페이지 이동
    } catch (error) {
      console.error(error);
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
