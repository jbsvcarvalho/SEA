import axios from 'axios';

const BASE_URL = 'http://localhost:5000/users';

export const fetchUsersFromApi = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addUserToApi = async (user) => {
  const response = await axios.post(BASE_URL, user);
  return response.data;
};

export const deleteUserFromApi = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
