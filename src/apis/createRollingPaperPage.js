import { TEAM_BASE_URL } from "constants";

export async function createPaper(data) {
  const response = await fetch(`${TEAM_BASE_URL}recipients/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("롤링페이퍼를 생성하는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
