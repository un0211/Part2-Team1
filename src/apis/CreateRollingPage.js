import { BACKGROUND_IMAGE_URL } from "constants";

export async function getBackgroundImage(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${BACKGROUND_IMAGE_URL}background-images/`);
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
