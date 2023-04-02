import type { User } from './User';

export interface Recipe {
  _id: string;
  user: User;
  name: string;
  likedByUser: boolean;
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
  user: User;
  text: string;
  createdAt: string;
}
