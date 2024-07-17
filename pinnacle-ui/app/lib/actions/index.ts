import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { logout, selectToken } from "../stores/authSlice";

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

export const getGithubAuthorizationUrl = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/github/authorize`);
    const data = await response.json();
    return data.authorization_url;
  } catch (error) {
    throw error;
  }
};

export const getUserProjects = () => {};
