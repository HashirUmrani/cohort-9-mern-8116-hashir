import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
});

export async function signUp({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Sign up failed");
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Logout failed");
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch user");
  }
}
