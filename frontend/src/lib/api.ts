import axios from 'axios';
import { CardQueryParams, CardResponse, AuthResponse } from './types';

// 브라우저 환경에서는 현재 호스트를 기반으로 API URL 설정
const API_BASE_URL = typeof window !== 'undefined'
  ? process.env.NEXT_PUBLIC_API_URL || `${window.location.protocol}//${window.location.hostname}:43000`
  : process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not set');
}

const api = axios.create({
  baseURL: API_BASE_URL,
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