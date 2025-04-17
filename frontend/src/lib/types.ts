export interface Card {
  id: number;
  name: string;
  rarity: string;
  type: string;
  category: string[];
  linkSkills: string[];
  passive: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
  image_url: string;
}

export interface CardQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  rarity?: string;
  type?: string;
  category?: string;
  search?: string;
}

export interface CardResponse {
  cards: Card[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
} 