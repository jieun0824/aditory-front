import { CategoryState } from '@/types/types';
import { Link } from '@/model/link';

export interface Category {
  categoryId: number;
  categoryName: string;
  linkCount: number;
  categoryState: CategoryState;
  linkList?: Link[];
  createdAt: Date;
  lastModifiedAt: Date;
  asCategoryName?: string;
}
