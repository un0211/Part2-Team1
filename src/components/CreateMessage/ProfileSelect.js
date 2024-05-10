import React, { useState, forwardRef } from "react";
import "./ProfileSelect.scss";
import { PROFILES } from "constants/postMessagePage";

const ProfileSelect = forwardRef((_, profileOptionsRef) => {
  const [selectedImg, setSelectedImg] = useState(PROFILES[0].src);

  const handleProfileClick = (e) => {
    const profile = e.target.src;
    if (profile) {
      profileOptionsRef.current.value = profile;
      setSelectedImg(profile);
    }
  };

  return (
    <div className="message-form-profile">
      <span className="message-form-title">프로필 이미지</span>
      <div className="message-form-profile-container">
        <img
          className="message-form-profile-selected"
          src={selectedImg}
          alt="선택된 프로필 이미지"
        />
        <div className="message-form-profile-options">
          <p className="message-form-profile-options-title">
            프로필 이미지를 선택해주세요!
          </p>
          <div
            className="message-form-profile-preview-container"
            onClick={handleProfileClick}
          >
            {PROFILES.map((profile, i) => (
              <img
                key={i}
                className="message-form-profile-preview"
                src={profile.src}
                alt={profile.alt}
                ref={profileOptionsRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileSelect;