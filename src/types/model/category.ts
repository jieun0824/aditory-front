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
  likeCount?: number | null;
  linkList?: Link[];
  prevLinks?: string[];
}

export interface CategoryResponse extends ResponseType {
  data: {
    categoryList: Category[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
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

export interface InfiniteResponse {
  pages: CategoryResponse[];
  pagesParams: number[];
}
