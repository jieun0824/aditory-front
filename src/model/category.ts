import { CategoryState } from '@/types/types';
import { Link } from '@/model/link';

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryState: CategoryState;
  createdAt: Date;
  lastModifiedAt: Date;
  linkCount: number;
  asCategoryName?: string;
}

export interface CategoryResponse {
  httpStatus: string;
  message: string;
  success: boolean;
  data: { categoryList: Category[] };
}

export interface Links {
  linkId: number;
  title: string;
  summary: number;
  linkState: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface specificCategoryResponse {
  httpStatus: string;
  message: string;
  success: boolean;
  data: {
    categoryId: number;
    categoryName: string;
    linkCount: number;
    categoryState: CategoryState;
    linkList: Links[];
  };
}
