'use client';
import Loading from '../loading';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types/model/category';
import { Button } from '@/components/ui/button';
import { useMyLikes } from '@/service/user/useUserService';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import CategoryCard from '@/components/category-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import {
  useCopyCategory,
  useLike,
  usePublic,
  useUnLike,
} from '@/service/categories/useCategoryService';
import { Separator } from '@/components/ui/separator';

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
  console.log(allCategories);

  return (
    <>
      {/* random component */}
      <h1 className='my-6 text-2xl font-extrabold'>TODAY's LINKS</h1>
      <ScrollArea className='h-full w-[410px] whitespace-nowrap rounded-md border'>
        <div className='grid w-full auto-cols-[200px] grid-flow-col gap-2 overflow-scroll'>
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
        <Loading />
      ) : (
        <div className='grid h-full w-full grid-cols-2 gap-2'>
          {allCategories && myLikes ? (
            allCategories.pages[0].data.categoryList.map((category: any) => (
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
