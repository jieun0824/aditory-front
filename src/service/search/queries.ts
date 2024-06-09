import { CategoryResponse } from '@/types/model/category';
import { CategoryScope } from './searchService';
import SearchService from './searchService';

const queryKeys = {
  searchCategory: ({ query }: { query: string }) =>
    ['searchCategory', query] as const,
  searchLink: ({ query }: { query: string }) => ['searchLink', query] as const,
};

const SearchQueryOptions = {
  searchCategory: ({
    accessToken,
    query,
    categoryScope,
  }: {
    accessToken: string;
    query: string;
    categoryScope: CategoryScope;
  }) => ({
    queryKey: queryKeys.searchCategory({ query }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      SearchService.searchByCategory({
        accessToken: accessToken,
        query: query,
        categoryScope: categoryScope,
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
  searchLink: ({
    accessToken,
    query,
    categoryScope,
  }: {
    accessToken: string;
    query: string;
    categoryScope: CategoryScope;
  }) => ({
    queryKey: queryKeys.searchLink({ query }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      SearchService.searchByCategory({
        accessToken: accessToken,
        query: query,
        categoryScope: categoryScope,
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
};

export default SearchQueryOptions;
