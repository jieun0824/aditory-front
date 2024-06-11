import CategoryService from '@/service/categories/categoryService';
import { CategoryResponse, InfiniteResponse } from '@/types/model/category';
import { CategoryState } from '@/types/types';
import { useQueryClient } from '@tanstack/react-query';
//create unique key
const queryKeys = {
  //get method
  my: ['myCategory'] as const,
  public: ({ page }: { page: number }) => ['page', page] as const,
  randomPublic: ['randomPublicCategory'] as const,
  specific: ({ categoryId }: { categoryId: number }) => {
    return ['specificCategory', categoryId] as const;
  },
  //post method
  newCategory: ({ categoryName }: { categoryName: string }) =>
    ['newCategory', categoryName] as const,
  copyCategory: ({ categoryId }: { categoryId: number }) => {
    return ['copyCategory', categoryId] as const;
  },
  moveCategory: ({ categoryId, linkIdList, targetCategoryId }: any) => {
    return ['moveCategory', categoryId, linkIdList, targetCategoryId] as const;
  },
  //patch method
  updateCategory: ({ categoryId }: { categoryId: number }) => {
    return ['updateCategory', categoryId] as const;
  },
  //delete method
  deleteCategory: ({ categoryId }: { categoryId: number }) => {
    return ['deleteCategory', categoryId] as const;
  },
  addLike: ({ categoryId }: { categoryId: number }) => {
    return ['addLike', categoryId] as const;
  },
  deleteLike: ({ categoryId }: { categoryId: number }) => {
    return ['deleteLike', categoryId] as const;
  },
};

const errorHandler = (error: any) => {
  if (error.status === 401) {
    window.location.href = '/login';
  } else {
    alert('something went wrong');
  }
  console.error(error);
};

const CategoryQueryOptions = {
  //get method
  my: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.my,
    queryFn: async () =>
      accessToken
        ? await CategoryService.getMyCategories({ accessToken })
        : null,
    onSuccess: async (data: any) => {
      return data;
    },
    onError: errorHandler,
    enabled: !!accessToken,
  }),

  public: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.public({ page: 0 }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      CategoryService.getPublicCategories({
        accessToken: accessToken,
        page: pageParam,
      }),
    getNextPageParam: (lastPage: CategoryResponse, allPages: unknown) => {
      return lastPage.data.currentPage != lastPage.data.totalPages //if not last page
        ? lastPage.data.currentPage + 1
        : undefined;
    },
    initialPageParam: 0,
    enabled: !!accessToken,
  }),

  random: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.randomPublic,
    queryFn: () => CategoryService.getRandomPublicCategories({ accessToken }),
    onError: errorHandler,
    enabled: !!accessToken,
    staleTime: Infinity,
  }),

  specific: ({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.specific({ categoryId }),
    queryFn: () => CategoryService.getCategory({ accessToken, categoryId }),
    onError: errorHandler,
    enabled: !!accessToken,
  }),
  //post method
  newCategory: ({
    accessToken,
    categoryName,
  }: {
    accessToken: string;
    categoryName: string;
  }) => ({
    queryKey: queryKeys.newCategory({
      categoryName,
    }),
    mutationFn: () =>
      CategoryService.postCategory({ accessToken, categoryName }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      if (error.status === 401) {
        window.location.href = '/login';
      } else if (error.httpStatus === 'CONFLICT') {
        alert('already exists');
      }
    },
  }),

  copyCategory: ({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.copyCategory({ categoryId }),
    mutationFn: () => CategoryService.copyCategory({ accessToken, categoryId }),
  }),
  moveCategory: ({
    accessToken,
    categoryId,
    linkIdList,
    targetCategoryId,
  }: any) => ({
    queryKey: queryKeys.moveCategory({
      categoryId,
      linkIdList,
      targetCategoryId,
    }),
    mutationFn: () =>
      CategoryService.moveCategory({
        accessToken,
        categoryId,
        linkIdList,
        targetCategoryId,
      }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  //patch method
  updateCategory: ({
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
  }) => ({
    queryKey: queryKeys.updateCategory({ categoryId }),
    mutationFn: () =>
      CategoryService.updateCategory({
        accessToken,
        categoryId,
        categoryName,
        categoryState,
        asCategoryName,
      }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  //delete method
  deleteCategory: ({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.deleteCategory({ categoryId }),
    mutationFn: () =>
      CategoryService.deleteCategory({ accessToken, categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  addLike: ({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.addLike({ categoryId }),
    mutationFn: () => CategoryService.postLike({ accessToken, categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  deleteLike: ({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.deleteLike({ categoryId }),
    mutationFn: () => CategoryService.deleteLike({ accessToken, categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
};

export default CategoryQueryOptions;
