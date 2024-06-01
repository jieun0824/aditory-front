'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  useCopyCategory,
  useLike,
  usePublic,
} from '@/service/categories/useCategoryService';
import Loading from '../loading';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types/model/category';
import { FcLike } from 'react-icons/fc';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data } = usePublic({ accessToken: accessToken });

  return (
    <>
      {data ? (
        data.data.publicCategoryList.map((category: any) => (
          <PublicCategoryCard
            category={category}
            accessToken={accessToken}
            key={category.categoryId}
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
}: {
  category: Category;
  accessToken: string;
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
        />
      </div>
    </div>
  );
}

function OptionButton({
  likeCount,
  accessToken,
  categoryId,
}: {
  likeCount: number;
  accessToken: string;
  categoryId: number;
}) {
  const { toast } = useToast();
  const { mutate: copyMutate } = useCopyCategory({
    accessToken: accessToken,
    categoryId: categoryId,
  });
  const { mutate: likeMutate } = useLike({
    accessToken: accessToken,
    categoryId: categoryId,
  });

  return (
    <div className='flex w-full justify-end'>
      <button
        className='flex flex-col items-center'
        onClick={() => likeMutate()}
      >
        <FcLike size={20} />
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
