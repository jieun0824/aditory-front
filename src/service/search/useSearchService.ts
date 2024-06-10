import { useInfiniteQuery } from '@tanstack/react-query';
import SearchQueryOptions from './queries';
import { CategoryScope } from './searchService';
import { CategoryResponse, InfiniteResponse } from '@/types/model/category';

export function useSearchByCategory({
  accessToken,
  query,
  categoryScope,
}: {
  accessToken: string;
  query: string;
  categoryScope: CategoryScope;
}) {
  return useInfiniteQuery(
    SearchQueryOptions.searchCategory({ accessToken, query, categoryScope })
  );
}

// ({ pageParam }: {    pageParam: number;}) => Promise<InfiniteResponse>' 형식은 '
// unique symbol | QueryFunction<CategoryResponse, readonly ["searchCategory", string], number> | undefined' 형식에 할당할 수 없습니다.
export function useSearchByLink({
  accessToken,
  query,
  categoryScope,
}: {
  accessToken: string;
  query: string;
  categoryScope: CategoryScope;
}) {
  return useInfiniteQuery(
    SearchQueryOptions.searchLink({ accessToken, query, categoryScope })
  );
}
