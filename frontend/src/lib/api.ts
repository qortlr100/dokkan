import axios from 'axios';
import { CardQueryParams, CardResponse, AuthResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:43000/api';

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
  const response = await api.get('/cards', { params });
  return response.data;
};

export const getCardById = async (id: number) => {
  const response = await api.get(`/cards/${id}`);
  return response.data;
};

// 카테고리 관련 API
export const getCategories = async () => {
  const response = await api.get('/categories');
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