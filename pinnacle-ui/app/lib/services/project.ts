import { BASE_URL } from "./config";
import { formatError, getHeaders, handleResponse } from "./helpers";
import {
  ProjectCreateRequest,
  ProjectPartialUpdateRequest,
} from "../types/requests";

export const createProject = async (
  token: string | null,
  requestBody: ProjectCreateRequest,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/projects`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(requestBody),
    });

    return await handleResponse(response);
  } catch (error) {
    const errorMsg = formatError(error);
    console.error("Error requesting project update:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const updateProject = async (
  token: string | null,
  projectId: string,
  requestBody: ProjectPartialUpdateRequest,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/projects/${projectId}`, {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify(requestBody),
    });

    return await handleResponse(response);
  } catch (error) {
    const errorMsg = formatError(error);
    throw new Error(errorMsg);
  }
};

export const deleteProject = async (
  token: string | null,
  projectId: string | undefined,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/projects/${projectId}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    return await handleResponse(response);
  } catch (error) {
    const errorMsg = formatError(error);
    throw new Error(errorMsg);
  }
};
