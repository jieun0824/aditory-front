import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import queryOptions from '@/service/categories/queries';
import useCategoryStore from '@/lib/useCategoryStore';
import { CategoryState } from '@/types/types';
//get
//get my categories
export function useMyCategories({
  accessToken,
  selectedFn,
}: {
  accessToken: string;
  selectedFn?: (data: any) => any;
}) {
  return useQuery({
    ...queryOptions.my({ accessToken }),
  });
}

export function usePublic({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.public({ accessToken }));
}

export function useSpecific({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  const setCategoryInfo = useCategoryStore(
    (state: any) => state.setCategoryInfo
  );
  return useQuery({
    ...queryOptions.specific({ accessToken, categoryId }),
    select: (data) => {
      setCategoryInfo(data.data);
      return data.data;
    },
  });
}

//post
export function useCreateCategory({
  accessToken,
  categoryName,
}: {
  accessToken: string;
  categoryName: string;
}) {
  return useMutation(queryOptions.newCategory({ accessToken, categoryName }));
}

export function useLike({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  return useMutation(queryOptions.addLike({ accessToken, categoryId }));
}

export function useCopyCategory({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  return useMutation(queryOptions.copyCategory({ accessToken, categoryId }));
}

export function useMoveCategory({
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
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.moveCategory({
      accessToken,
      categoryId,
      linkIdList,
      targetCategoryId,
    }),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['specificCategory', categoryId],
      });
    },
  });
}

//patch method

export function useUpdateCategory({
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
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.updateCategory({
      accessToken,
      categoryId,
      categoryName,
      categoryState,
      asCategoryName,
    }),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['specificCategory', categoryId],
      });
    },
  });
}

//delete method
export function useDeleteCategory({
  accessToken,
  categoryId,
  onSettled,
}: {
  accessToken: string;
  categoryId: number;
  onSettled?: () => void;
}) {
  return useMutation({
    ...queryOptions.deleteCategory({ accessToken, categoryId }),
    onSettled: onSettled,
  });
}

export function useUnLink({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  return useMutation(queryOptions.deleteLike({ accessToken, categoryId }));
}
