import CategoryService from '@/service/categories/categoryService';

//create unique key
const queryKeys = {
  //get method
  my: ['myCategory'] as const,
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
  my: () => ({
    queryKey: queryKeys.my,
    queryFn: async () => await CategoryService.getMyCategories(),
    onSuccess: async (data: any) => {
      return data;
    },
  }),
  public: () => ({
    queryKey: queryKeys.public,
    queryFn: () => CategoryService.getPublicCategories(),
    onError: errorHandler,
  }),

  specific: ({ categoryId }: { categoryId: number }) => ({
    queryKey: queryKeys.specific({ categoryId }),
    queryFn: () => CategoryService.getCategory({ categoryId }),
    onError: errorHandler,
  }),
  //post method
  newCategory: ({ categoryName }: { categoryName: string }) => ({
    queryKey: queryKeys.newCategory,
    queryFn: () => CategoryService.postCategory({ categoryName }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  addLike: ({ categoryId }: { categoryId: number }) => ({
    queryKey: queryKeys.addLike({ categoryId }),
    queryFn: () => CategoryService.postLike({ categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  copyCategory: ({ categoryId }: { categoryId: number }) => ({
    queryKey: queryKeys.copyCategory({ categoryId }),
    queryFn: () => CategoryService.copyCategory({ categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  moveCategory: ({ categoryId, linkIdList, targetCategoryId }: any) => ({
    queryKey: queryKeys.moveCategory({
      categoryId,
      linkIdList,
      targetCategoryId,
    }),
    queryFn: () =>
      CategoryService.moveCategory({
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
    categoryId,
    categoryName,
    categoryState,
    asCategoryName,
  }: {
    categoryId: number;
    categoryName: string;
    categoryState: boolean;
    asCategoryName: string;
  }) => ({
    queryKey: queryKeys.updateCategory({ categoryId }),
    queryFn: () =>
      CategoryService.updateCategory({
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
  deleteCategory: ({ categoryId }: { categoryId: number }) => ({
    queryKey: queryKeys.deleteCategory({ categoryId }),
    queryFn: () => CategoryService.deleteCategory({ categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
  deleteLike: ({ categoryId }: { categoryId: number }) => ({
    queryKey: queryKeys.deleteLike({ categoryId }),
    queryFn: () => CategoryService.deleteLike({ categoryId }),
    onSuccess: async (data: any) => {
      console.log(data);
    },
    onError: errorHandler,
  }),
};

export default queryOptions;
