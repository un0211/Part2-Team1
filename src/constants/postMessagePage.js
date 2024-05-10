import {
  ACQUAINTANCE,
  FRIEND,
  COWORKER,
  FAMILY,
  NOTO_SANS,
  PRETENDARD,
  NANUM_MYEONGJO,
  NANUM_HANDLETTER,
} from "constants";

export const MEMBER_CLASS_NAME = {
  [ACQUAINTANCE]: 1,
  [FRIEND]: 2,
  [COWORKER]: 3,
  [FAMILY]: 4,
};

export const FONT_CLASS_NAME = {
  [NOTO_SANS]: 1,
  [PRETENDARD]: 2,
  [NANUM_MYEONGJO]: 3,
  [NANUM_HANDLETTER]: 4,
};

export const PROFILES = [
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-4-avatar-2754580_120522.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-11-avatar-2754576_120520.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-10-avatar-2754575_120521.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-1-avatar-2754574_120513.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-9-avatar-2754584_120518.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-2-avatar-2754578_120514.png",
    alt: "프로필 이미지",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-12-avatar-2754577_120517.png",
    alt: "프로필 이미지",
  },
];

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
