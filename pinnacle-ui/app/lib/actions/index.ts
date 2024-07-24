import { ProjectMethodology } from "../types/enums";
import { PartialIssueUpdate } from "../types/partials";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
  fullname: string,
  email: string,
  password: string,
) => {
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
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
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
    throw error;
  }
};

export const logoutUser = async (token: string) => {
  try {
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

export const getProjectByNameKey = async (
  token: string | null,
  nameKey: string,
) => {
  const response = await fetch(`${BASE_URL}/api/v1/projects/${nameKey}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok)
    throw new Error(
      `HTTP error! status ${response.status} - ${response.statusText}`,
    );

  const data = await response.json();
  return data;
};

export const getProjectWithActiveWorkflow = async (
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

export const getStatesForWorkflow = async (
  token: string | null,
  workflowId: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/states/${workflowId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error(`HTTP error!`);

    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createIssue = async (
  token: string | null,
  title: string | undefined,
  projectId: string,
  workflowId: string,
  stateId?: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        project_id: projectId,
        workflow_id: workflowId,
        state_id: stateId,
      }),
    });

    if (!response.ok)
      throw new Error(
        `HTTP error! status ${response.status} - ${response.statusText}`,
      );
  } catch (error) {
    throw error;
  }
};

export const getIssue = async (token: string | null, id: string) => {
  const response = await fetch(`${BASE_URL}/api/v1/issues/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok)
    throw new Error(
      `HTTP error! status ${response.status} - ${response.statusText}`,
    );
  const data = await response.json();
  return data;
};

export const updateIssue = async (
  token: string | null,
  issueId: string | undefined,
  data: PartialIssueUpdate,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/issues/${issueId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status ${response.status} - ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addAssigneeToIssue = async (
  token: string | null,
  user_id: string,
  issue_id: string | undefined,
) => {
  const response = await fetch(
    `${BASE_URL}/api/v1/issues/${issue_id}/update/assignee`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add assignee to issue");
  }

  return response.json();
};

export const deleteIssue = async (token: string | null, issueId: string) => {
  try {
    await fetch(`${BASE_URL}/api/v1/issues/${issueId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const createState = async (
  token: string | null,
  createData: Partial<{
    name: string;
    description: string;
    limit: number;
    color_id: string;
    workflow_id: string;
    is_final_state: boolean;
  }>,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/states`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error!`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateState = async (
  token: string | null,
  id: string,
  updateData: Partial<{
    name: string;
    description: string;
    limit: number;
    color_id: string;
  }>,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/states/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error!`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteState = async (token: string | null, id: string) => {
  try {
    await fetch(`${BASE_URL}/api/v1/states/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const getColors = async (token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/colors`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error(`HTTP error!`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
