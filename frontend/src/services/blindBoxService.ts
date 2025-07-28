//111
import apiClient from '../api/apiClient';

export interface BlindBoxItem {
  name: string;
  imageUrl: string;
  probability: number;
}

export interface BlindBox {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  items: BlindBoxItem[];
}

// 获取盲盒列表
export const getBlindBoxes = async (): Promise<BlindBox[]> => {
  const response = await apiClient.get('/blindboxes');
  return response.data;
};

// 抽取盲盒
export const drawBlindBox = async (blindBoxId: number, userId: number) => {
  const response = await apiClient.post('/blindboxes/draw', { blindBoxId, userId });
  return response.data;
};