import { CategoryState } from '@/types/types';
import { Link } from '@/types/model/link';
import { ResponseType } from './response';

export interface CategoryPost {
  categoryName: string;
  categoryState: CategoryState;
  categoryId: number;
  asCategoryName: string;
}
export interface Category extends CategoryPost {
  createdAt: Date;
  lastModifiedAt: Date;
  linkCount: number;
  linkeCount?: number;
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

export interface publicCategoryResponse extends ResponseType {
  data: {
    publicCategoryList: Category[];
  };
}
