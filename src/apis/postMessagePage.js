import { TEAM_BASE_URL } from "constants";
const createUrl = (postId) => `${TEAM_BASE_URL}recipients/${postId}/messages/`;

/* POST */
// NOTE - 롤링 페이퍼 메세지 보내기
export async function putMessage(postId, data) {
  console.log("createUrl", createUrl(postId));
  const response = await fetch(createUrl(postId), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();
  return body;
}
