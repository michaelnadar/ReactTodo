// src/helpers/authHeader.ts

export const authHeader = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
  
    // Check if token exists, then return Authorization header
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } else {
      return {};
    }
  };
