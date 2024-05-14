import React, { useState } from "react";
import "./ProfileSelect.scss";
import { DEFUALT_PROFILE, PROFILES } from "constants/postMessagePage";

const ProfileSelect = ({ onProfileSelect, selectedProfile }) => {
  
  return (
    <div className="message-form-profile">
      <span className="message-form-title">프로필 이미지</span>
      <div className="message-form-profile-container">
        <img
          className="message-form-profile-selected"
          src={selectedProfile} 
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
                onClick={() => onProfileSelect(profile.src)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelect;
