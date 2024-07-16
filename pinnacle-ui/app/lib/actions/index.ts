const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
  fullname: string,
  email: string,
  password: string,
) => {
  console.info(`fullname: ${fullname}, email: ${email}, password: ${password}`);
  // try {
  //   const response = await fetch(`${BASE_URL}/auth/register`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       fullname,
  //       email,
  //       password,
  //     }),
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error registering user:", error);
  //   throw error;
  // }
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
