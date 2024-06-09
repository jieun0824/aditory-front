import { useInfiniteQuery } from '@tanstack/react-query';
import SearchQueryOptions from './queries';
import { CategoryScope } from './searchService';

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
