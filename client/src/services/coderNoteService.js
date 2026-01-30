import API from "./api";

export const getCoderNotes = async () => {
  return (await API.get("/codernotes")).data;
};

export const getCoderNoteById = async (id) => {
  return (await API.get(`/codernotes/${id}`)).data;
};

export const createCoderNote = async (note) => {
  return (await API.post("/codernotes", note)).data;
};

export const updateCoderNote = async (id, note) => {
  return (await API.put(`/codernotes/${id}`, note)).data;
};

export const deleteCoderNote = async (id) => {
  return (await API.delete(`/codernotes/${id}`)).data;
};

export const toggleRevision = async (id) => {
  return (await API.patch(`/codernotes/${id}/revision`)).data;
};
