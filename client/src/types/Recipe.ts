import type { User } from './User';

export interface Recipe {
  _id: string;
  user: User;
  name: string;
  ingredients: Ingredient[];
  description: string;
  instructions: string;
  picturePath: string;
  userAvatarPath: string;
  likesCount: number;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Comment {
  author: User;
  text: string;
}
