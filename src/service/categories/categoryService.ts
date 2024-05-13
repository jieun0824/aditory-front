import Service from '@/service/service';
import { Category } from '@/model/category';
import { headers } from 'next/headers';

// let authorization = { headers: {} };
// if (typeof window !== 'undefined') {
//   if (localStorage.getItem('userInfo')) {
//     const accessToken = JSON.parse(
//       localStorage.getItem('userInfo')!
//     ).accessToken;
//     authorization = { headers: { Authorization: `Bearer ${accessToken}` } };
//   }
// }

class CategoryService extends Service {
  //get my categories
  getMyCategories({ accessToken }: { accessToken: string }) {
    return this.http.get<Category[]>(`/categories/my`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  //get specific category (linklist)
  getCategory({ categoryId }: { categoryId: number }) {
    return this.http.get<Category>(`/categories/${categoryId}`, authorization);
  }

  //add new category
  postCategory({ categoryName }: { categoryName: string }) {
    return this.http.post<Category>(
      `/categories`,
      {
        categoryName,
      },
      authorization
    );
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
    return this.http.patch<Category>(
      `/categories/${categoryId}`,
      {
        categoryName,
        categoryState,
        asCategoryName,
      },
      authorization
    );
  }

  //delete category
  deleteCategory({ categoryId }: { categoryId: number }) {
    return this.http.delete<Category>(
      `/categories/${categoryId}`,
      authorization
    );
  }

  //get public category lists
  getPublicCategories() {
    return this.http.get<Category[]>(`/categories/public`, authorization);
  }

  //add like to public category
  postLike({ categoryId }: { categoryId: number }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/like`,
      authorization
    );
  }

  //remove like from public category
  deleteLike({ categoryId }: { categoryId: number }) {
    return this.http.delete<Category>(
      `/categories/${categoryId}/like`,
      authorization
    );
  }

  //copy public category to my category
  copyCategory({ categoryId }: { categoryId: number }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/copy`,
      authorization
    );
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
    return this.http.post<Category>(
      `/categories/${categoryId}/move`,
      {
        linkIdList,
        targetCategoryId,
      },
      authorization
    );
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
