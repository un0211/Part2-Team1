import { TEAM_BASE_URL } from "constants";
const createUrl = (postId) => `${TEAM_BASE_URL}recipients/${postId}/messages/`;

/* GET */
export async function getList() {
  try {
    const response = await fetch(`${TEAM_BASE_URL}recipients/`);
    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("데이터 로딩에 실패하였습니다.", error);
    throw error;
  }
}

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

/* DELETE */
// NOTE - 메세지 삭제
export async function delMessage(messageId) {
  const response = await fetch(`${TEAM_BASE_URL}messages/${messageId}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("메세지를 삭제하는 데 실패했습니다");
  }
  // TODO - 리팩토링
}
