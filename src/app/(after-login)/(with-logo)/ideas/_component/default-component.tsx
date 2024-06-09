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

import {
  useCopyCategory,
  useLike,
  useUnLike,
} from '@/service/categories/useCategoryService';

export default function DefaultComponent({
  allCategories,
  myLikes,
  randomPublic,
  accessToken,
}: {
  allCategories: any;
  myLikes: any;
  randomPublic: any;
  accessToken: string;
}) {
  return (
    <>
      {/* random component */}
      <h1>TODAY's LINKS</h1>
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

      {/* all component */}
      <h1>ALL LINKS</h1>
      {allCategories && myLikes ? (
        allCategories.data.categoryList.map((category: any) => (
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
