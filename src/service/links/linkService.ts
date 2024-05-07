import Service from '@/service/service';
import { Category } from '@/model/category';

class CategoryService extends Service {
  //get my categories
  getMyCategories() {
    return this.http.get<Category[]>(`/categories/my`);
  }

  //get specific category (linklist)
  getCategory({ categoryId }: { categoryId: number }) {
    return this.http.get<Category>(`/categories/${categoryId}`);
  }

  //add new category
  postCategory({ categoryName }: { categoryName: string }) {
    return this.http.post<Category>(`/categories`, {
      categoryName,
    });
  }

  //update category
  updateCategory({
    categoryId,
    categoryName,
    categoryState,
    asCategoryName,
  }: {
    categoryId: number;
    categoryName: string;
    categoryState: boolean;
    asCategoryName: string;
  }) {
    return this.http.patch<Category>(`/categories/${categoryId}`, {
      categoryName,
      categoryState,
      asCategoryName,
    });
  }

  //delete category
  deleteCategory({ categoryId }: { categoryId: number }) {
    return this.http.delete<Category>(`/categories/${categoryId}`);
  }

  //get public category lists
  getPublicCategories() {
    return this.http.get<Category[]>(`/categories/public`);
  }

  //add like to public category
  postLike({ categoryId }: { categoryId: number }) {
    return this.http.post<Category>(`/categories/${categoryId}/like`);
  }

  //remove like from public category
  deleteLike({ categoryId }: { categoryId: number }) {
    return this.http.delete<Category>(`/categories/${categoryId}/like`);
  }

  //copy public category to my category
  copyCategory({ categoryId }: { categoryId: number }) {
    return this.http.post<Category>(`/categories/${categoryId}/copy`);
  }

  //링크 목록의 카테고리 이동 ??
  moveCategory({
    categoryId,
    linkIdList,
    targetCategoryId,
  }: {
    categoryId: number;
    linkIdList: number[];
    targetCategoryId: number;
  }) {
    return this.http.post<Category>(`/categories/${categoryId}/move`, {
      linkIdList,
      targetCategoryId,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
