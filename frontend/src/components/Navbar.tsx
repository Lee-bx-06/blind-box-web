//111
import React from 'react';
import { Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Menu mode="horizontal" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
      <Menu.Item key="home">
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="blind-boxes">
        <Link to="/blind-boxes">盲盒列表</Link>
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item key="orders">
            <Link to="/orders">我的订单</Link>
          </Menu.Item>
          <Menu.Item key="player">
            <Link to="/player">玩家展示</Link>
          </Menu.Item>
          <Menu.Item key="logout" style={{ float: 'right' }}>
            <Button type="link" onClick={handleLogout}>退出登录</Button>
          </Menu.Item>
          <Menu.Item key="username" style={{ float: 'right' }}>
            欢迎, {user.username}
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" style={{ float: 'right' }}>
            <Link to="/login">登录</Link>
          </Menu.Item>
          <Menu.Item key="register" style={{ float: 'right' }}>
            <Link to="/register">注册</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;