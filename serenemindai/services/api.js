const API_URL = "http://localhost:5000/api"; // Your backend URL

/**
 * A helper function for making authenticated API requests.
 * @param {string} endpoint The API endpoint to call (e.g., '/journal').
 * @param {string} method The HTTP method (e.g., 'GET', 'POST').
 * @param {object} [body] The request body for POST/PUT requests.
 * @returns {Promise<any>} The JSON response from the server.
 */
export const fetchApi = async (endpoint, method = "GET", body) => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    // Handle cases where the user is logged out but an API call is attempted
    console.error("No user found in localStorage.");
    // Optional: redirect to login
    // window.location.href = '/login';
    return;
  }

  const user = JSON.parse(userString);
  const token = user?.token;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid or expired, log the user out
        localStorage.removeItem("user");
        window.location.href = "#/login";
      }
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    // Handle responses with no content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
