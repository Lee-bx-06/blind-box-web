import React, { useState, useEffect } from 'react';
import { Table, Tag, Spin, message } from 'antd';
import { getUserOrders, Order, OrderStatus } from '../services/orderService'; // 导入 Order 类型
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const STATUS_MAP: Record<OrderStatus, { color: string; text: string }> = {
  pending: { color: 'orange', text: '待处理' },
  processing: { color: 'blue', text: '处理中' },
  completed: { color: 'green', text: '已完成' },
  canceled: { color: 'gray', text: '已取消' }
};

const UserOrdersPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // 关键修复1：显式指定状态类型为 Order[]
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchUserOrders();
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      // 关键修复2：添加非空断言（!），确保 user 存在（因 useEffect 已判断）
      const data = await getUserOrders(user!.id); 
      setOrders(data); // 现在类型匹配，不会报错
    } catch (error) {
      message.error('获取订单失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '盲盒名称',
      dataIndex: 'blindBoxName',
      key: 'blindBoxName',
    },
    {
      title: '获得物品',
      dataIndex: 'item',
      key: 'item',
      render: (item: { name: string; imageUrl: string }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={item.imageUrl} alt={item.name} style={{ width: 30, marginRight: 10 }} />
          {item.name}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <Tag color={STATUS_MAP[status].color}>{STATUS_MAP[status].text}</Tag>
      ),
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (time: string) => new Date(time).toLocaleString(),
    },
  ];

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  if (!user) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>请先登录查看订单</div>;
  }

  return (
    <div>
      <h2 style={{ margin: '20px 0' }}>我的抽取记录</h2>
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>暂无抽取记录</div>
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default UserOrdersPage;