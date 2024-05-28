import { CategoryState } from '@/types/types';
import { Link } from '@/types/model/link';
import { ResponseType } from './response';

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryState: CategoryState;
  createdAt?: Date;
  lastModifiedAt?: Date;
  linkCount: number;
  asCategoryName?: string;
  linkList?: Link[];
}

export interface CategoryResponse extends ResponseType {
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

export interface specificCategoryResponse extends ResponseType {
  data: {
    categoryId: number;
    categoryName: string;
    linkCount: number;
    categoryState: CategoryState;
    linkList: Links[];
  };
}
