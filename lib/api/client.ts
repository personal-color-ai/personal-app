import axios from 'axios';
import Constants from 'expo-constants';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://168.107.53.130:8080';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 30초 타임아웃
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
