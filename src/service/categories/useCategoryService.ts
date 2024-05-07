import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/categories/queries';
//get
export function useMyCategories() {
  return useQuery(queryOptions.my());
}

export function usePublic() {
  return useQuery(queryOptions.public());
}

export function useSpecific({ categoryId }: { categoryId: number }) {
  return useQuery(queryOptions.specific({ categoryId }));
}

//post
export function useCreateCategory({ categoryName }: { categoryName: string }) {
  return useMutation(queryOptions.newCategory({ categoryName }));
}

export function useLike({ categoryId }: { categoryId: number }) {
  return useMutation(queryOptions.addLike({ categoryId }));
}

export function useCopyCategory({ categoryId }: { categoryId: number }) {
  return useMutation(queryOptions.copyCategory({ categoryId }));
}

export function useMoveCategory({
  categoryId,
  linkIdList,
  targetCategoryId,
}: {
  categoryId: number;
  linkIdList: number[];
  targetCategoryId: number;
}) {
  return useMutation(
    queryOptions.moveCategory({ categoryId, linkIdList, targetCategoryId })
  );
}

//patch method

export function useUpdateCategory({
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
  return useMutation(
    queryOptions.updateCategory({
      categoryId,
      categoryName,
      categoryState,
      asCategoryName,
    })
  );
}

//delete method
export function useDeleteCategory({ categoryId }: { categoryId: number }) {
  return useMutation(queryOptions.deleteCategory({ categoryId }));
}

export function useUnLink({ categoryId }: { categoryId: number }) {
  return useMutation(queryOptions.deleteLike({ categoryId }));
}
