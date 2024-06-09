'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import CategoryCard from '@/components/category-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RotateLoader from 'react-spinners/RotateLoader';

import {
  useCopyCategory,
  useLike,
  usePublic,
  useUnLike,
} from '@/service/categories/useCategoryService';
import { Separator } from '@/components/ui/separator';
import { useInView } from 'react-intersection-observer';
import Loading from '@/app/loading';

export default function DefaultComponent({
  myLikes,
  randomPublic,
  accessToken,
}: {
  myLikes: any;
  randomPublic: any;
  accessToken: string;
}) {
  const {
    data: allCategories,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = usePublic({ accessToken: accessToken });

  const ObservationComponent = () => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!allCategories) return;

      const pageLastIdx = allCategories.pages.length - 1;
      const isLast =
        allCategories?.pages[pageLastIdx].data.currentPage ===
        allCategories?.pages[pageLastIdx].data.totalPages;
      if (!isLast && inView) fetchNextPage();
    }, [inView]);

    return <div ref={ref} />;
  };

  return (
    <>
      {/* random component */}
      <h1 className='my-6 text-2xl font-extrabold'>TODAY's LINKS</h1>
      <ScrollArea className='h-full w-[410px] whitespace-nowrap rounded-md border'>
        <div className='grid w-full auto-cols-[200px] grid-flow-col gap-4 overflow-scroll'>
          {randomPublic && myLikes ? (
            randomPublic.data.categoryList.map((category: any) => (
              <CategoryCard category={category} key={category.categoryId}>
                <OptionButton
                  accessToken={accessToken}
                  likeCount={category.likeCount!}
                  categoryId={category.categoryId}
                  isMyLike={myLikes.includes(category.categoryId)}
                />
              </CategoryCard>
            ))
          ) : (
            <Loading />
          )}
        </div>
        <ScrollBar orientation='horizontal' className='' />
      </ScrollArea>

      {/* all component */}
      <Separator className='mt-8 bg-foreground/15' />
      <h1 className='my-6 text-2xl font-extrabold'>ALL LINKS</h1>
      {status === 'pending' ? (
        <RotateLoader
          className='animate-pulse'
          loading={status === 'pending'}
          size={20}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <>
          <div className='grid h-full w-full grid-cols-2 gap-2'>
            {allCategories && myLikes ? (
              allCategories.pages.map((page: any) => {
                return page.data.categoryList.map((category: any) => (
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
              <Loading />
            )}
            <ObservationComponent />
          </div>
        </>
      )}
    </>
  );
}

function OptionButton({
  likeCount,
  accessToken,
  categoryId,
  isMyLike,
}: {
  likeCount: number;
  accessToken: string;
  categoryId: number;
  isMyLike: boolean;
}) {
  const queryClient = useQueryClient();
  const [isLike, setIsLike] = useState(isMyLike);
  const { mutate: copyMutate } = useCopyCategory({
    accessToken: accessToken,
    categoryId: categoryId,
  });
  const { mutate: likeMutate } = useLike({
    accessToken: accessToken,
    categoryId: categoryId,
    selectedFn: (data) => {
      setIsLike(true);
    },
  });
  const { mutate: deleteMutate } = useUnLike({
    accessToken: accessToken,
    categoryId: categoryId,
    selectedFn: (data) => {
      setIsLike(false);
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['publicCategory'],
    });
  }, [isLike]);

  return (
    <>
      <Button
        variant='outline'
        className='h-7 text-xs'
        onClick={() => {
          copyMutate();
        }}
      >
        Copy
      </Button>
      <Badge
        variant={'outline'}
        className='gap-1 border-none p-0'
        onClick={() => {
          console.log(categoryId, isMyLike);
          isLike ? deleteMutate() : likeMutate();
        }}
      >
        {isLike ? (
          <FaHeart className='text-xs' />
        ) : (
          <FaRegHeart className='text-xs' />
        )}
        {likeCount}
      </Badge>
    </>
  );
}
