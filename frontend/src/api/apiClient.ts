//111
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // 对应后端端口
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器：添加 token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;