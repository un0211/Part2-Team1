import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/PostMessagePage.scss";
import basicProfile from "../assets/images/img_profile_basic.svg";
import CustomDropdown from "../components/CreateMessage/CustomDropdown";
import profile1 from "../assets/images/img_profile_01.svg";
import profile2 from "../assets/images/img_profile_02.svg";
import profile3 from "../assets/images/img_profile_03.svg";
import plus from "../assets/icons/plus.svg";
import ImageUpload from "../components/CreateMessage/ImageUpload";

export default function PostFromPage() {
  const items = [
    { text: 'Noto Sans', id: 1 },
    { text: 'Pretendard', id: 2 },
    { text: '나눔명조', id: 3 },
    { text: '나눔손글씨 손편지체', id: 4 },
  ];

  const members = [
    { text: '지인', id: 1 },
    { text: '친구', id: 2 },
    { text: '동료', id: 3 },
    { text: '가족', id: 4 },
  ];

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedProfile, setSelectedProfile] = useState(basicProfile);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleProfileClick = (profile) => {
    if (profile === plus) {
      setSelectedImage(profile);
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
    plus
  ];

  return (
    <div className='message-form'>
      <div className='message-form__sender'>
        <label htmlFor='nameInput' className='message-form__title'>
          From.
        </label>
        <input
          className='message-form__inputs message-form__name-input'
          id='nameInput'
          placeholder='이름을 입력해 주세요.'
        />
      </div>

      <div className='message-form__profile'>
        <span className='message-form__title'>프로필 이미지</span>
        <div className='message-form__profile-container'>
          <img src={selectedProfile} alt='프로필 이미지 미리보기' />
          <div className='message-form__profile-options'>
            <span className='message-form__profile-options-title'>
              프로필 이미지를 선택해주세요!
            </span>
            <div className='message-form__profile-preview-container'>
              {profiles.map((profile, i) => (
                <img
                  key={i}
                  className='message-form__profile--preview'
                  src={profile}
                  alt={`프로필 이미지 ${i + 1}`}
                  onClick={() => handleProfileClick(profile)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='message-form__relationship'>
        <label htmlFor='select' className='message-form__title'>
          상대와의 관계
        </label>
        <CustomDropdown props={members} />
      </div>

      <div className='message-form__content'>
        <label htmlFor='textarea' className='message-form__title'>
          내용을 입력해 주세요
        </label>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="message-form__text-editor-wrapper"
          editorClassName="message-form__text-editor"
          toolbar={{
            options: ['inline',  'textAlign', 'emoji', 'remove', 'history'],
          }}
        />
      </div>

      <div className='message-form__font'>
        <span className='message-form__title'>폰트 선택</span>
        <CustomDropdown props={items} />
      </div>

      <button className='message-form__submit'>생성하기</button>
    </div>
  );
}
