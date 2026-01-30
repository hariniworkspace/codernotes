const API = "http://localhost:5000/api/oops-notes";

const getToken = () => localStorage.getItem("token");

const safeFetch = async (url, options = {}) => {
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) return null;
  if (!res.ok) return null;

  return res.json();
};

export const getOopsNotes = async () => {
  const data = await safeFetch(API);
  return Array.isArray(data) ? data : [];
};

export const createOopsNote = async (title) => {
  return await safeFetch(API, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
};

export const getOopsNoteById = async (id) => {
  return await safeFetch(`${API}/${id}`);
};

export const updateOopsNote = async (id, data) => {
  return await safeFetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteOopsNote = async (id) => {
  await safeFetch(`${API}/${id}`, { method: "DELETE" });
};
export const getSimilarOopsNotes = async (id) => {
  return await safeFetch(`${API}/similar/${id}`);
};
