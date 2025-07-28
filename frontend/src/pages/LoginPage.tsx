import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { loginSuccess } from '../store/authSlice';

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const user = await login(values.username, values.password);
      dispatch(loginSuccess(user));
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    }
  };

  return (
    <Card title="用户登录" style={{ maxWidth: 400, margin: '100px auto' }}>
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
          <Button type="primary" htmlType="submit" block>登录</Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          还没有账号? <Link to="/register">去注册</Link>
        </div>
      </Form>
    </Card>
  );
};

export default LoginPage;