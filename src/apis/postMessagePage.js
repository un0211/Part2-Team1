import { TEAM_BASE_URL } from "constants";
const createUrl = (postId) => `${TEAM_BASE_URL}messages/${postId}/`;

/* POST */
// NOTE - 롤링 페이퍼 메세지 보내기
export async function putMessage(postId, data) {
  console.log("createUrl", createUrl(postId));
  const response = await fetch(createUrl(postId), {
    method: "PUT",
    body: (data),
  });
  const body = await response.json();
  return body;
}
