import { CategoryResponse, InfiniteResponse } from '@/types/model/category';
import { CategoryScope } from './searchService';
import SearchService from './searchService';
import { InfiniteData } from '@tanstack/react-query';
import { LinkListResponse, LinkResponse } from '@/types/model/link';

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
    getNextPageParam: (
      lastPage: CategoryResponse,
      allPages: CategoryResponse[]
    ) => {
      // console.log(lastPage);
      return lastPage.data.currentPage != lastPage.data.totalPages //if not last page
        ? lastPage.data.currentPage + 1
        : undefined;
    },
    initialPageParam: 0,
    enabled: !!accessToken && !!query,
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
      SearchService.searchByLink({
        accessToken: accessToken,
        query: query,
        categoryScope: categoryScope,
        page: pageParam,
      }),
    getNextPageParam: (
      lastPage: LinkListResponse,
      allPages: LinkListResponse[]
    ) => {
      return lastPage.data.currentPage != lastPage.data.totalPages //if not last page
        ? lastPage.data.currentPage! + 1
        : undefined;
    },
    initialPageParam: 0,
    enabled: !!accessToken && !!query,
  }),
};

export default SearchQueryOptions;
