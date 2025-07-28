//111
import apiClient from '../api/apiClient';

export interface OrderItem {
  name: string;
  imageUrl: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export interface Order {
  id: number;
  userId: number;
  blindBoxId: number;
  blindBoxName: string;
  item: OrderItem;
  status: OrderStatus;
  createdAt: string;
}

// 获取用户订单
export const getUserOrders = async (userId: number): Promise<Order[]> => {
  const response = await apiClient.get(`/orders/user/${userId}`);
  return response.data;
};