import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { loginSuccess } from '../store/authSlice';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const user = await register(values.username, values.password);
      dispatch(loginSuccess(user));
      message.success('注册成功');
      navigate('/');
    } catch (error) {
      message.error('注册失败，请稍后再试');
    }
  };

  return (
    <Card title="用户注册" style={{ maxWidth: 400, margin: '100px auto' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>注册</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterPage;