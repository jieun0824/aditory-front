import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/categories/queries';
//get
export function useMyCategories({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.my({ accessToken }));
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
  return useQuery(queryOptions.specific({ accessToken, categoryId }));
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
  return useMutation(
    queryOptions.moveCategory({
      accessToken,
      categoryId,
      linkIdList,
      targetCategoryId,
    })
  );
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
  categoryState: boolean;
  asCategoryName: string;
}) {
  return useMutation(
    queryOptions.updateCategory({
      accessToken,
      categoryId,
      categoryName,
      categoryState,
      asCategoryName,
    })
  );
}

//delete method
export function useDeleteCategory({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  return useMutation(queryOptions.deleteCategory({ accessToken, categoryId }));
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
