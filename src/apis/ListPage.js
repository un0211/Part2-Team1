import { TEAM_BASE_URL } from "constants";

// const listURL = (cardId) => `${TEAM_BASE_URL}recipients/`;

export async function getList(params = {}) {
  const query = new URLSearchParams(params).toString();

  try{
    const response = await fetch(
      `${TEAM_BASE_URL}recipients/`
    );
    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } catch (error){
    console.error("데이터 로딩에 실패하였습니다.", error);
    throw error;
  }
}
//   const response = await fetch(listURL);
//   if (!response.ok) {
//     throw new Error("데이터를 불러오는데 실패했습니다");
//   }
//   const body = await response.json();
//   return body;
// }
