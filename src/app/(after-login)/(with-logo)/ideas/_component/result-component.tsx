'use client';

import { useAccessToken } from '@/lib/useAccessToken';
import {
  useCopyCategory,
  useLike,
  usePublic,
  useUnLike,
} from '@/service/categories/useCategoryService';
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

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data } = usePublic({ accessToken: accessToken });
  const { data: myLikes } = useMyLikes({ accessToken: accessToken });
  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      {data && myLikes ? (
        data.data.categoryList.map((category: any) => (
          <PublicCategoryCard
            category={category}
            accessToken={accessToken}
            key={category.categoryId}
            isMyLike={myLikes.includes(category.categoryId)}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

function PublicCategoryCard({
  category,
  accessToken,
  isMyLike,
}: {
  category: Category;
  accessToken: string;
  isMyLike: boolean;
}) {
  return (
    <>
      <CategoryCard category={category}>
        <OptionButton
          accessToken={accessToken}
          likeCount={category.likeCount!}
          categoryId={category.categoryId}
          isMyLike={isMyLike}
        />
      </CategoryCard>
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
