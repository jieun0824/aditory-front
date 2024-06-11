'use client';

import ResultComponent from '@/app/(after-login)/(with-logo)/ideas/_component/result-component';
import SearchBar from '@/app/(after-login)/(with-logo)/ideas/_component/search-bar';
import { useAccessToken } from '@/lib/useAccessToken';
import { CategoryScope } from '@/service/search/searchService';
import {
  useSearchByCategory,
  useSearchByLink,
} from '@/service/search/useSearchService';
import { InfiniteData } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMyLikes } from '@/service/user/useUserService';

import { useInView } from 'react-intersection-observer';
import CategoryComponent from './_component/category-component';
import LinkComponent from './_component/link-search';
import Loading from '@/app/loading';

export default function IdeasPage() {
  const params = useSearchParams();
  const { accessToken } = useAccessToken();
  const { data: myLikes } = useMyLikes({ accessToken: accessToken });

  const query = params.get('query');
  const filter = params.get('filter');

  const searchByCategory = useSearchByCategory({
    accessToken: accessToken,
    query: filter === 'category' ? query || '' : '',
    categoryScope: CategoryScope.IN_PUBLIC,
  });

  const searchByLink = useSearchByLink({
    accessToken: accessToken,
    query: filter === 'link' ? query || '' : '',
    categoryScope: CategoryScope.IN_PUBLIC,
  });

  let data: InfiniteData<any> | undefined = undefined;
  let fetchNextPage: any = undefined;

  if (query && filter) {
    if (filter === 'category') {
      data = searchByCategory.data;
      fetchNextPage = searchByCategory.fetchNextPage;
    } else {
      data = searchByLink.data;
      fetchNextPage = searchByLink.fetchNextPage;
    }
  }

  const ObservationComponent = () => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;
      const pageLastIdx = data.pages.length - 1;
      const isLast =
        data?.pages[pageLastIdx].data.currentPage ===
        data?.pages[pageLastIdx].data.totalPages;
      if (!isLast && inView) fetchNextPage();
    }, [inView]);

    return <div ref={ref} />;
  };

  const renderContent = () => {
    if (!query || !filter) return <ResultComponent />;

    if (!data) return <Loading />;

    if (filter === 'category') {
      return (
        <>
          {myLikes && (
            <CategoryComponent
              data={data}
              accessToken={accessToken}
              myLikes={myLikes}
            />
          )}
          <ObservationComponent />
        </>
      );
    }

    if (filter === 'link') {
      return (
        <div className='h-full w-full'>
          <LinkComponent data={data} />
          <ObservationComponent />
        </div>
      );
    }

    return <Loading />;
  };

  return (
    <>
      <SearchBar />
      {renderContent()}
    </>
  );
}
