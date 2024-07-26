import { BASE_URL } from "./config";
import { formatError, getHeaders, handleResponse } from "./helpers";

export const getSecurityTopics = async (token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/security-topics`, {
      headers: getHeaders(token),
    });

    console.log(response);

    return await handleResponse(response);
  } catch (error) {
    const errorMsg = formatError(error);
    throw new Error(errorMsg);
  }
};
