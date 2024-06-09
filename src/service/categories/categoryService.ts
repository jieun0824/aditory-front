import Service from '@/service/service';
import {
  Category,
  CategoryResponse,
  InfiniteResponse,
  specificCategoryResponse,
} from '@/types/model/category';
import { CategoryState } from '@/types/types';

class CategoryService extends Service {
  authorization = (accessToken: string) => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };
  //get my categories
  getMyCategories({ accessToken }: { accessToken: string }) {
    return this.http.get<CategoryResponse>(
      `/categories/my`,
      this.authorization(accessToken)
    );
  }

  //get specific category (linklist)
  getCategory({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.get<specificCategoryResponse>(
      `/categories/${categoryId}`,
      this.authorization(accessToken)
    );
  }

  //add new category
  postCategory({
    accessToken,
    categoryName,
  }: {
    accessToken: string;
    categoryName: string;
  }) {
    return this.http.post<CategoryResponse>(
      `/categories`,
      {
        categoryName,
      },
      this.authorization(accessToken)
    );
  }

  //update category
  updateCategory({
    accessToken,
    categoryId,
    categoryName,
    categoryState,
    asCategoryName,
  }: {
    accessToken: string;
    categoryId: number;
    categoryName: string;
    categoryState: CategoryState;
    asCategoryName: string;
  }) {
    return this.http.patch<Category>(
      `/categories/${categoryId}`,
      {
        categoryName,
        categoryState,
        asCategoryName,
      },
      this.authorization(accessToken)
    );
  }

  //delete category
  deleteCategory({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.delete<Category>(
      `/categories/${categoryId}`,
      this.authorization(accessToken)
    );
  }

  //get public category lists
  getPublicCategories({
    accessToken,
    page,
  }: {
    accessToken: string;
    page: number;
  }) {
    return this.http.get<CategoryResponse>(
      `/categories/public/all?page=${page}&size=8`,
      this.authorization(accessToken)
    );
  }

  getRandomPublicCategories({ accessToken }: { accessToken: string }) {
    return this.http.get<InfiniteResponse>(
      `/categories/public/today`,
      this.authorization(accessToken)
    );
  }

  //add like to public category
  postLike({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/like`,
      undefined,
      this.authorization(accessToken)
    );
  }

  //remove like from public category
  deleteLike({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.delete<Category>(
      `/categories/${categoryId}/like`,
      this.authorization(accessToken)
    );
  }

  //copy public category to my category
  copyCategory({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/copy`,
      undefined,
      this.authorization(accessToken)
    );
  }

  //링크 목록의 카테고리 이동 ??
  moveCategory({
    accessToken,
    categoryId,
    linkIdList,
    targetCategoryId,
  }: {
    accessToken: string;
    categoryId: number;
    linkIdList: number[];
    targetCategoryId: number;
  }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/move`,
      {
        linkIdList,
        targetCategoryId,
      },
      this.authorization(accessToken)
    );
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
