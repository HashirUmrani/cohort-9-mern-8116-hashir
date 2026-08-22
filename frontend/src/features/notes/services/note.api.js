import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
});

// this was implemented in Note management PR for Dashboard UI
export async function getNotes() {
  try {
    const response = await api.get("/api/notes/get-notes");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "failed to get notes");
  }
}

// implemented in this PR
export async function getNoteById({ id }) {
  try {
    const response = await api.get(`/api/notes/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "failed to get note");
  }
}

// implemented in this PR
export async function createNote({ heading, content }) {
  try {
    const response = await api.post("/api/notes/create-note", {
      heading,
      content,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "failed to create note");
  }
}

// implemented in this PR
export async function updatedNote({ id, heading, content }) {
  try {
    const response = await api.put(`/api/notes/update-note/${id}`, {
      heading,
      content,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "failed to update the note");
  }
}

// implemented in this PR
export async function deleteNote({ id }) {
  try {
    const response = await api.delete(`/api/notes/delete-note/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "deleting the note failed");
  }
}
