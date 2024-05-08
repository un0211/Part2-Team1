import { TEAM_BASE_URL } from "constants";
import { POST_INFO_TYPE, MESSAGE, REACTION } from "constants/rollingPaperPage";

const postURL = (postId) => `${TEAM_BASE_URL}recipients/${postId}/`;

export async function getPost(postId) {
  const response = await fetch(`${postURL(postId)}`);
  if (!response.ok) {
    throw new Error("롤링 페이퍼를 불러오는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

async function getPostInfo(postId, type, offset = 0, limit = 12) {
  const query = `?offset=${offset}&limit=${limit}`;
  const base_url = `${postURL(postId)}${type}/`;
  const response = await fetch(`${base_url}${query}`);
  if (!response.ok) {
    throw new Error(`${POST_INFO_TYPE[type]} 불러오는 데 실패했습니다.`);
  }
  const body = await response.json();
  return body;
}

export async function getMessage(postId, offset = 0, limit = 12) {
  return await getPostInfo(postId, MESSAGE, offset, limit);
}

export async function getReaction(postId, offset = 0, limit = 3) {
  return await getPostInfo(postId, REACTION, offset, limit);
}

// NOTE - 메세지 삭제
export async function delMessage(messageId) {
  const response = fetch(`${TEAM_BASE_URL}/message/${messageId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("데이터를 삭제하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
