import { ProjectMethodology } from "../types/enums";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
  fullname: string,
  email: string,
  password: string,
) => {
  console.info(`fullname: ${fullname}, email: ${email}, password: ${password}`);
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  console.info(`username: ${username}`);
  try {
    const response = await fetch(`${BASE_URL}/auth/jwt/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username,
        password,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data; // response returns access_token and token_type (bearer)
  } catch (error) {
    console.error("Error trying to login user: ", error);
    throw error;
  }
};

export const logoutUser = async (token: string) => {
  try {
    console.info("Trying to logout...");
    await fetch(`${BASE_URL}/auth/jwt/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(`failed to logout ${error}`);
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    console.info("Trying to get current user...");
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok)
      throw new Error(
        `HTTP error! status ${response.status} - ${response.statusText}`,
      );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`failed to get current user ${error}`);
  }
};

export const getGithubAuthorizationUrl = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/github/authorize`);
    const data = await response.json();
    return data.authorization_url;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (
  token: string | null,
  name: string,
  methodology: ProjectMethodology,
  description?: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, methodology }),
    });

    if (!response.ok)
      throw new Error(
        `HTTP error! status ${response.status} - ${response.statusText}`,
      );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async (token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok)
      throw new Error(
        `HTTP error! status ${response.status} - ${response.statusText}`,
      );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getActiveWorkflow = async (
  token: string | null,
  projectNameKey: string,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/projects/active-workflow/${projectNameKey}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok)
      throw new Error(
        `HTTP error! status ${response.status} - ${response.statusText}`,
      );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
