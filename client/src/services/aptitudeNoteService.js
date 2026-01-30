const API = "http://localhost:5000/api/aptitude-notes";

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

  // If unauthorized → stop here
  if (res.status === 401) {
    console.error("Unauthorized. Token missing/expired.");
    return null;
  }

  // If server error
  if (!res.ok) {
    console.error("API error:", res.status);
    return null;
  }

  return res.json();
};

/* ================= GET ALL ================= */
export const getAptitudeNotes = async () => {
  const data = await safeFetch(API);
  return Array.isArray(data) ? data : [];
};

/* ================= CREATE ================= */
export const createAptitudeNote = async (title) => {
  return await safeFetch(API, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
};

/* ================= GET ONE ================= */
export const getAptitudeNoteById = async (id) => {
  return await safeFetch(`${API}/${id}`);
};

/* ================= UPDATE ================= */
export const updateAptitudeNote = async (id, data) => {
  return await safeFetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/* ================= DELETE ================= */
export const deleteAptitudeNote = async (id) => {
  await safeFetch(`${API}/${id}`, {
    method: "DELETE",
  });
};
