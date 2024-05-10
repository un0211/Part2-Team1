import {
  PROFILES,
  MEMBER_CLASS_NAME,
  FONT_CLASS_NAME,
} from "./postMessagePage";

export const getFormData = ({
  id,
  senderInputRef,
  profileImageURL,
  relationship,
  contentTextareaRef,
  font,
}) => {
  const defaultProfileImageURL = PROFILES[0].src;
  const defaultRelationship = Object.keys(MEMBER_CLASS_NAME)[0];
  const defaultFont = Object.keys(FONT_CLASS_NAME)[0];

  const selectedProfileImageURL = profileImageURL || defaultProfileImageURL;
  const selectedRelationship = relationship || defaultRelationship;
  const selectedFont = font || defaultFont;

  return {
    recipientId: id,
    sender: senderInputRef?.current,
    profileImageURL: selectedProfileImageURL,
    relationship: selectedRelationship,
    content: contentTextareaRef?.current,
    font: selectedFont,
  };
};
