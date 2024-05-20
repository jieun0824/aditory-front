import CategoryService from '@/service/categories/categoryService';
//create unique key
const queryKeys = {
  //get method
  my: ({ accessToken }: { accessToken: string }) =>
    [accessToken, 'myCategory'] as const,
  public: ['publicCategory'] as const,
  specific: ({ categoryId }: { categoryId: number }) => {
    return ['specificCategory', categoryId] as const;
  },
  //post method
  newCategory: ['newCategory'] as const,
  addLike: ({ categoryId }: { categoryId: number }) => {
    return ['addLike', categoryId] as const;
  },
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

const queryOptions = {
  //get method
  my: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.my({ accessToken }),
    queryFn: async () => await CategoryService.getMyCategories({ accessToken }),
    onSuccess: async (data: any) => {
      return data;
    },
    onError: errorHandler,
    enabled: !!accessToken,
  }),
  public: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.public,
    queryFn: () => CategoryService.getPublicCategories({ accessToken }),
    onError: errorHandler,
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
  }),
  //post method
  newCategory: ({
    accessToken,
    categoryName,
  }: {
    accessToken: string;
    categoryName: string;
  }) => ({
    queryKey: queryKeys.newCategory,
    queryFn: () => CategoryService.postCategory({ accessToken, categoryName }),
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
    queryFn: () => CategoryService.postLike({ accessToken, categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  copyCategory: ({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.copyCategory({ categoryId }),
    queryFn: () => CategoryService.copyCategory({ accessToken, categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
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
    queryFn: () =>
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
    categoryState: boolean;
    asCategoryName: string;
  }) => ({
    queryKey: queryKeys.updateCategory({ categoryId }),
    queryFn: () =>
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
    queryFn: () => CategoryService.deleteCategory({ accessToken, categoryId }),
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
    queryFn: () => CategoryService.deleteLike({ accessToken, categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
};

export default queryOptions;
