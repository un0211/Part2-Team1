// ProfileSelect.js
import React, { useState } from "react";
import "./ProfileSelect.scss";
import { PROFILES } from "constants/postMessagePage";

const ProfileSelect = ({ onProfileSelect }) => {
  const [selectedImg, setSelectedImg] = useState(PROFILES[0]);

  const handleProfileClick = (profile) => {
    setSelectedImg(profile);
    onProfileSelect(profile);
  };

  return (
    <div className="message-form-profile">
      <span className="message-form-title">프로필 이미지</span>
      <div className="message-form-profile-container">
        <img
          className="message-form-profile-selected"
          src={selectedImg.src}
          alt="선택된 프로필 이미지"
        />
        <div className="message-form-profile-options">
          <p className="message-form-profile-options-title">
            프로필 이미지를 선택해주세요!
          </p>
          <div className="message-form-profile-preview-container">
            {PROFILES.map((profile, i) => (
              <img
                key={i}
                className="message-form-profile-preview"
                src={profile.src}
                alt={profile.alt}
                onClick={() => handleProfileClick(profile)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelect;
