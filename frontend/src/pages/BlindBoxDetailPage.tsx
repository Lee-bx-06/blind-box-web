import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Typography, message, Skeleton } from 'antd';
import { getBlindBoxes, BlindBox } from '../services/blindBoxService'; // 导入BlindBox类型
import { drawBlindBox } from '../services/blindBoxService';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const { Title, Paragraph } = Typography;

const BlindBoxDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 显式指定状态类型为 BlindBox | null
  const [blindBox, setBlindBox] = useState<BlindBox | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchBlindBoxDetail();
  }, [id]);

  const fetchBlindBoxDetail = async () => {
    try {
      setLoading(true);
      const allBoxes = await getBlindBoxes();
      const box = allBoxes.find(box => box.id.toString() === id);
      if (!box) {
        message.error('盲盒不存在');
        navigate('/blind-boxes');
        return;
      }
      setBlindBox(box); // 类型现在兼容
    } catch (error) {
      message.error('获取盲盒详情失败');
      navigate('/blind-boxes');
    } finally {
      setLoading(false);
    }
  };

  const handleDraw = async () => {
    if (!user) {
      message.warning('请先登录');
      navigate('/login');
      return;
    }
    try {
      const result = await drawBlindBox(Number(id), user.id);
      message.success(`恭喜抽到: ${result.item.name}`);
      navigate('/orders');
    } catch (error) {
      message.error('抽取失败');
    }
  };

  if (loading || !blindBox) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  return (
    <div className="blind-box-detail">
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Card
            cover={<img alt={blindBox.name} src={blindBox.imageUrl} style={{ height: 800, objectFit: 'cover' }} />}
          />
        </Col>
        <Col span={12}>
          <Title level={2}>{blindBox.name}</Title>
          <Paragraph>{blindBox.description}</Paragraph>
          
          <div style={{ margin: '20px 0' }}>
            <Title level={3} style={{ color: '#f50' }}>¥{blindBox.price}</Title>
          </div>
          
          <Title level={4}>可能获得的物品</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
            {blindBox.items.map((item, index) => (
              <Col span={8} key={index}>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
                >
                  <Card.Meta title={item.name} description={`概率: ${item.probability}%`} />
                </Card>
              </Col>
            ))}
          </Row>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={handleDraw}
            style={{ width: '100%' }}
          >
            立即抽取
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BlindBoxDetailPage;