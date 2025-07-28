//111
import apiClient from '../api/apiClient';

export interface User {
  id: number;
  username: string;
  token: string;
}

// 注册
export const register = async (username: string, password: string): Promise<User> => {
  const response = await apiClient.post('/users/register', { username, password });
  return response.data;
};

// 登录
export const login = async (username: string, password: string): Promise<User> => {
  const response = await apiClient.post('/users/login', { username, password });
  return response.data;
};