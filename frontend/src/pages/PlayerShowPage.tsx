import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Upload, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getPlayerShows, createPlayerShow, PlayerShow } from '../services/playerShowService';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import axios from 'axios';
const { Meta } = Card;

// 定义SafeImage组件的属性类型
interface SafeImageProps {
  src?: string;
  alt: string;
  placeholderText?: string;
  [key: string]: any; // 允许传递其他属性
}

// 安全图片组件 - 处理src为空的情况
const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  placeholderText = '暂无图片', 
  ...props 
}) => {
  if (!src) {
    return (
      <div 
        style={{ 
          height: 200, 
          backgroundColor: '#f5f5f5', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        {placeholderText}
      </div>
    );
  }
  return <img src={src} alt={alt} {...props} />;
};
const formatDate = (dateString: string) => {
  if (!dateString) return '未知时间';
  const date = dayjs(dateString);
  if (!date.isValid()) {
    console.warn('无效的日期格式:', dateString);
    return '日期格式错误';
  }
  return date.format('YYYY年MM月DD日 HH:mm');
};
const PlayerShowPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [shows, setShows] = useState<PlayerShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const data = await getPlayerShows();
      console.log('完整数据结构:', data);
      setShows(data);
    } catch (error) {
      message.error('获取展示失败');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpload = async (file: UploadFile) => {
    try {
      setLoading(true);
    
      // 创建FormData对象
      const formData = new FormData();
      formData.append('image', file.originFileObj as Blob);
    
      // 上传到服务器（替换为你的API地址）
      const response = await axios.post('/api/player/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      // 假设服务器返回格式：{ url: 'http://example.com/image.jpg' }
      setImageUrl(response.data.url);
      message.success('图片上传成功');
    } catch (error) {
      message.error('图片上传失败');
      console.error('上传错误:', error);
    } finally {
      setLoading(false);
    }
    return false; // 阻止antd自动上传
  };

  const handleSubmit = async () => {
    if (!user) return;
    try {
      const values = await form.validateFields();
      await createPlayerShow({
        title: values.title,
        content: values.content,
        imageUrl,
        userId: user.id
      });
      message.success('发布成功');
      setVisible(false);
      form.resetFields();
      setImageUrl('');
      fetchShows();
    } catch (error) {
      message.error('发布失败');
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div>
      <h2 style={{ margin: '20px 0' }}>玩家展示</h2>
      
      {user && (
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setVisible(true)}
          style={{ marginBottom: 20 }}
        >
          发布我的展示
        </Button>
      )}

      {shows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>暂无展示内容</div>
      ) : (
        <Row gutter={[24, 24]}>
          {shows.map(show => (
            <Col span={6} key={show.id}>
              <Card
                hoverable
                cover={
                  <SafeImage 
                    src={show.imageUrl} 
                    alt={show.title} 
                    style={{ height: 200, objectFit: 'cover' }} 
                  />
                }
              >
                <Meta title={show.title} description={show.content} />
                <div style={{ marginTop: 10 }}>
                  <span>{show.username}</span>
                  <span style={{ float: 'right' }}>
                    {formatDate(String(show.createdAt))}
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="发布展示"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label="图片"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={handleUpload}
              showUploadList={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="preview" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlayerShowPage;