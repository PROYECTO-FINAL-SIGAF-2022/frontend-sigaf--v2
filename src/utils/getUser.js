import { URL } from "../utils/getUrl";

export const getUserFromToken = async (token) => {
  const request = await fetch(`${URL}/data-user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  const response = await request.json();
  return response;
};
