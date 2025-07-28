import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, message, Spin, Input } from 'antd';
import { getBlindBoxes, drawBlindBox, BlindBox } from '../services/blindBoxService'; // 导入 BlindBox 类型
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const BlindBoxListPage = () => {
  const [blindBoxes, setBlindBoxes] = useState<BlindBox[]>([]); 
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchBlindBoxes();
  }, []);

  const fetchBlindBoxes = async () => {
    try {
      setLoading(true);
      const data = await getBlindBoxes();
      setBlindBoxes(data); 
    } catch (error) {
      message.error('获取盲盒失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDraw = async (blindBoxId: number) => {
    if (!user) {
      message.warning('请先登录');
      navigate('/login');
      return;
    }
    try {
      const result = await drawBlindBox(blindBoxId, user.id);
      message.success(`恭喜抽到: ${result.item.name}`);
      navigate('/orders');
    } catch (error) {
      message.error('抽取失败');
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredBlindBoxes = blindBoxes.filter(box => 
    box.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleBoxClick = (id: number) => {
    // 修正导航路径拼接
    navigate(`/blind-boxes/${id}`); 
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '20px', paddingTop: '60px' }}>
      <Search 
        placeholder="搜索盲盒"
        onSearch={handleSearch}
        style={{ margin: '20px 0' }}
      />
      <h2 style={{ margin: '20px 0' }}>盲盒列表</h2>
      {filteredBlindBoxes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>暂无符合条件的盲盒数据</div>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredBlindBoxes.map(box => (
            <Col span={6} key={box.id}>
              <Card
                hoverable
                cover={<img alt={box.name} src={box.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
                onClick={() => handleBoxClick(box.id)} // 绑定点击事件
              >
                <Card.Meta title={box.name} description={box.description} />
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 16, color: '#f50' }}>¥{box.price}</span>
                  <Button 
                    type="primary" 
                    onClick={() => handleDraw(box.id)}
                  >
                    立即抽取
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BlindBoxListPage;