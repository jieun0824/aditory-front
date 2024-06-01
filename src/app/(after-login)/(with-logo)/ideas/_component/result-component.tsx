'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  useCopyCategory,
  useLike,
  usePublic,
  useUnLike,
} from '@/service/categories/useCategoryService';
import Loading from '../loading';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types/model/category';
import { FcLike } from 'react-icons/fc';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useMyLikes } from '@/service/user/useUserService';
import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data } = usePublic({ accessToken: accessToken });
  const { data: myLikes } = useMyLikes({ accessToken: accessToken });
  return (
    <>
      {data && myLikes ? (
        data.data.publicCategoryList.map((category: any) => (
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
    </>
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
    <div className='flex w-full flex-col'>
      <Link href={`/category/${category.categoryId}`} className='w-full'>
        <Card className='h-full min-h-28 border-none'>
          <CardHeader></CardHeader>
        </Card>
      </Link>
      <div className='flex p-2'>
        <Link href={`/category/${category.categoryId}`} className='w-full'>
          <Label htmlFor='category' className='font-medium'>
            {category.categoryName}
          </Label>
          <Badge className='text-xs' variant={'outline'}>
            {category.linkCount} links
          </Badge>
        </Link>
        <OptionButton
          accessToken={accessToken}
          likeCount={category.likeCount!}
          categoryId={category.categoryId}
          isMyLike={isMyLike}
        />
      </div>
    </div>
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
    <div className='flex w-full justify-end'>
      <button
        className='flex flex-col items-center'
        onClick={() => {
          console.log(categoryId, isMyLike);
          isLike ? deleteMutate() : likeMutate();
        }}
      >
        {isLike ? <FaHeart /> : <FaRegHeart />}

        <Badge variant={'outline'}>{likeCount}</Badge>
      </button>
      <Button
        variant='outline'
        onClick={() => {
          copyMutate();
        }}
      >
        Copy
      </Button>
    </div>
  );
}
