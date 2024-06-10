'use client';

import ResultComponent from '@/app/(after-login)/(with-logo)/ideas/_component/result-component';
import SearchBar from '@/app/(after-login)/(with-logo)/ideas/_component/search-bar';
import CategoryCard from '@/components/category-card';
import { useAccessToken } from '@/lib/useAccessToken';
import { CategoryScope } from '@/service/search/searchService';
import {
  useSearchByCategory,
  useSearchByLink,
} from '@/service/search/useSearchService';
import { InfiniteResponse } from '@/types/model/category';
import { InfiniteData } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OptionButton } from '@/app/(after-login)/(with-logo)/ideas/_component/default-component';
import { useMyLikes } from '@/service/user/useUserService';
import Loading from '@/app/(after-login)/(without-logo)/category/[categoryId]/loading';
import { useInView } from 'react-intersection-observer';
import { InfiniteLinkResponse } from '@/types/model/link';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function IdeasPage() {
  const params = useSearchParams();
  const { accessToken } = useAccessToken();
  const { data: myLikes } = useMyLikes({ accessToken: accessToken });

  const query = params.get('query');
  const filter = params.get('filter');

  const searchByCategory = useSearchByCategory({
    accessToken: accessToken,
    query: query || '',
    categoryScope: CategoryScope.IN_PUBLIC,
  });

  const searchByLink = useSearchByLink({
    accessToken: accessToken,
    query: query || '',
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

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const renderContent = () => {
    if (!query || !filter) return <ResultComponent />;

    if (!data) return <Loading />;

    if (filter === 'category') {
      return (
        <div className='grid h-full w-full grid-cols-2 gap-2'>
          {myLikes && (
            <CategoryComponent
              data={data}
              accessToken={accessToken}
              myLikes={myLikes}
            />
          )}
          <ObservationComponent data={data} fetchNextPage={fetchNextPage} />
        </div>
      );
    }

    if (filter === 'link') {
      return (
        <div className='h-full w-full'>
          <LinkComponent data={data} />
          <ObservationComponent data={data} fetchNextPage={fetchNextPage} />
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

interface LinkComponentProps {
  data: InfiniteLinkResponse;
}

function LinkComponent({ data }: LinkComponentProps) {
  return (
    <>
      {data.pages[0].data.linkList.length > 0 ? (
        data.pages.map((page) => {
          return page.data.linkList.map((link) => (
            <div className='relative w-full' key={link.linkId}>
              <Link href={`/link/${link.linkId}`} draggable={false}>
                <Card
                  draggable={false}
                  className='flex w-full cursor-pointer justify-between overflow-hidden transition hover:scale-105 dark:border-zinc-700'
                >
                  <CardHeader>
                    <CardTitle className='text-md'>{link.title}</CardTitle>
                    <CardDescription className='text-xs'>
                      {link.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
          ));
        })
      ) : (
        <p>nothing</p>
      )}
    </>
  );
}

interface CategoryComponentProps {
  data: InfiniteResponse;
  accessToken: string;
  myLikes: string[];
}

function CategoryComponent({
  data,
  accessToken,
  myLikes,
}: CategoryComponentProps) {
  return (
    <>
      {data.pages[0].data.categoryList.length > 0 ? (
        data.pages.map((page) => {
          return page.data.categoryList.map((category) => (
            <CategoryCard category={category} key={category.categoryId}>
              <OptionButton
                accessToken={accessToken}
                likeCount={category.likeCount!}
                categoryId={category.categoryId}
                isMyLike={myLikes.includes(category.categoryId)}
              />
            </CategoryCard>
          ));
        })
      ) : (
        <p>nothing</p>
      )}
    </>
  );
}
