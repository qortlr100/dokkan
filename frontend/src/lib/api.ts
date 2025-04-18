import axios from 'axios';
import { CardQueryParams, CardResponse, AuthResponse } from './types';

// API URL 설정
const getApiBaseUrl = () => {
  // 브라우저 환경
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || window.location.origin;
  }
  // 서버 사이드 렌더링 환경
  return process.env.NEXT_PUBLIC_API_URL || 'http://backend:3000';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 카드 관련 API
export const getCards = async (params: CardQueryParams): Promise<CardResponse> => {
  const response = await api.get('/api/cards', { params });
  return response.data;
};

export const getCardById = async (id: number) => {
  const response = await api.get(`/api/cards/${id}`);
  return response.data;
};

// 카테고리 관련 API
export const getCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

// 인증 관련 API
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
}; 