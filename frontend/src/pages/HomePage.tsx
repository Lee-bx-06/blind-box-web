import React from 'react';
import { Carousel, Button, Typography, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom'; // 导入 Link
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const { Title, Paragraph, Text } = Typography;

// 轮播图数据
const carouselItems = [
  {
    image: 'https://picsum.photos/seed/banner1/1200/400',
    title: '全新盲盒系列上线',
    description: '限量款手办等你来抽',
  },
  {
    image: 'https://picsum.photos/seed/banner2/1200/400',
    title: '新手福利',
    description: '注册即送首次免费抽取机会',
  },
  {
    image: 'https://picsum.photos/seed/banner3/1200/400',
    title: '玩家秀征集',
    description: '分享你的抽盒成果，赢取奖励',
  },
];

// 特色功能数据
const features = [
  {
    title: '海量盲盒',
    description: '多种主题盲盒不断更新，总有一款适合你',
    icon: '🎁',
  },
  {
    title: '公平抽取',
    description: '基于概率的随机抽取，保证公平公正',
    icon: '🎲',
  },
  {
    title: '社区分享',
    description: '展示你的收藏，与其他玩家交流心得',
    icon: '📱',
  },
];

const HomePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="home-page">
      {/* 轮播图 */}
      <Carousel autoplay style={{ marginBottom: 40 }}>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div 
              style={{ 
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                padding: '0 50px',
              }}
            >
              <div style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                <Title level={2} style={{ marginBottom: 20 }}>{item.title}</Title>
                <Paragraph style={{ fontSize: 18, marginBottom: 30 }}>
                  {item.description}
                </Paragraph>
                {/* 修复：使用 Link 包裹 Button，而非 component 属性 */}
                <Link to={user ? '/blind-boxes' : '/login'}>
                  <Button type="primary" size="large">
                    {user ? '立即抽取' : '登录参与'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 欢迎信息 */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}> {/* 修复：center 改为 'center' */}
        <Title level={2}>
          {user ? `欢迎回来，${user.username}！` : '欢迎来到盲盒世界'}
        </Title>
        <Paragraph style={{ maxWidth: 800, margin: '0 auto' }}>
          在这里，你可以抽取各种主题的盲盒，收集稀有的物品，与其他玩家分享你的收藏和抽盒心得。
          每一次抽取都有惊喜，快来试试你的运气吧！
        </Paragraph>
      </div>

      {/* 特色功能 */}
      <div style={{ marginBottom: 60 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 40 }}>
          为什么选择我们
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col span={8} key={index}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center', 
                  padding: 30,
                  height: '100%'
                }}
              >
                <div style={{ fontSize: 50, marginBottom: 20 }}>{feature.icon}</div>
                <Title level={4} style={{ marginBottom: 15 }}>{feature.title}</Title>
                <Text>{feature.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 行动召唤 */}
      <div 
        style={{ 
          background: '#f5f5f5', 
          padding: 60, 
          textAlign: 'center',
          borderRadius: 8
        }}
      >
        <Title level={3} style={{ marginBottom: 20 }}>准备好开始你的盲盒之旅了吗？</Title>
        {/* 修复：使用 Link 包裹 Button */}
        <Link to={user ? '/blind-boxes' : '/register'} style={{ marginRight: 20 }}>
          <Button type="primary" size="large">
            {user ? '浏览盲盒' : '免费注册'}
          </Button>
        </Link>
        <Link to="/player">
          <Button size="large">
            查看玩家展示
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;