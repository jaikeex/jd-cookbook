import type { User } from './user';

export interface Recipe {
  _id: string;
  user: User;
  name: string;
  likedByUser: boolean;
  ingredients: Ingredient[];
  description: string;
  instructions: string;
  picturePath: string;
  likesCount: number;
  likes: string[];
  comments: Comment[];
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
}

export interface Ingredient {
  name: string;
  amount?: string;
  unit?: string;
}

export interface Comment {
  user: User;
  text: string;
  createdAt: string;
}
