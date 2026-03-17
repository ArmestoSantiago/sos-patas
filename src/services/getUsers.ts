import { API_URL } from '@/config';

export const getUserById = async (id: string) => {
  const data = await fetch(`${API_URL}/users/${id}`);
  const user = await data.json();

  return user;
};

export const getAllUser = async () => {
  const data = await fetch(`${API_URL}/users/`);
  const users = await data.json();

  return users;
};