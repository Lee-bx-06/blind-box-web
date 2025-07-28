//111
import apiClient from '../api/apiClient';

export interface PlayerShow {
  createTime: string | number | Date;
  id: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

// 获取所有玩家展示
export const getPlayerShows = async (): Promise<PlayerShow[]> => {
  const response = await apiClient.get('/playershows');
  return response.data;
};

// 创建玩家展示
export const createPlayerShow = async (data: {
  title: string;
  content: string;
  imageUrl: string;
  userId: number;
}): Promise<PlayerShow> => {
  const response = await apiClient.post('/playershows', data);
  return response.data;
};