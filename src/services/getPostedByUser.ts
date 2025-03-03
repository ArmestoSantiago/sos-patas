import { API_URL } from '@/config';

export const getPostedByUser = async (userId: string) => {

  const response = await fetch(`${API_URL}/users?userid=${userId}`);
  const postedByUser = await response.json();
  return postedByUser;
};