import { TEAM_BASE_URL } from "constants";

export async function getList() {
  const response = await fetch(TEAM_BASE_URL);
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const body = await response.json();
  return body;
}
