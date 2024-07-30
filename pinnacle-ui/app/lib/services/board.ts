import { BASE_URL } from "./config";
import { formatError, getHeaders, handleResponse } from "./helpers";

export const getProjectBoards = async (
  token: string | null,
  projectId: string | undefined,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/boards/project_id/${projectId}`,
      {
        headers: getHeaders(token),
      },
    );

    return await handleResponse(response);
  } catch (error) {
    const errorMsg = formatError(error);
    throw new Error(errorMsg);
  }
};
