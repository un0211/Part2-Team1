import { TEAM_BASE_URL } from "constants";

const listURL = (cardId) => `${TEAM_BASE_URL}recipients/`;

export async function getList() {
  const response = await fetch(listURL);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
