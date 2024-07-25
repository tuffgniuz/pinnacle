import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

export const getHeaders = (
  token: string | null,
  contentType: string = "application/json",
) => {
  const headers: HeadersInit = {
    "Content-Type": contentType,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const handleResponse = async (response: Response) => {
  switch (response.status) {
    case 200:
    case 201:
      return await response.json();
    case 400:
      throw new Error(
        "400 Bad Request: Oops! Something went wrong with the request. Check your input and try again.",
      );
    case 401:
      throw new Error(
        "401 Unauthorized: Ah, ah, ah! You didn’t say the magic word! (Remember to check your credentials)",
      );
    case 403:
      throw new Error(
        "403 Forbidden: Stop right there! You don’t have permission to access this resource.",
      );
    case 404:
      throw new Error(
        "404 Not Found: Uh-oh! We couldn’t find what you’re looking for. Maybe try a different endpoint?",
      );
    case 500:
      throw new Error(
        "500 Internal Server Error: Looks like something broke on the server. Time to wake up the devops team!",
      );
    default:
      throw new Error(
        `Unexpected status: ${response.status}. Something weird happened.`,
      );
  }
};

export const formatError = (error: any) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "An unknown error occured";
  }
};
