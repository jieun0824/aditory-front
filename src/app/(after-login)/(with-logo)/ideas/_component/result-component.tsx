'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { useAccessToken } from '@/lib/useAccessToken';
import { usePublic } from '@/service/categories/useCategoryService';
import Loading from '../loading';
import Link from 'next/link';
import LinkPreview from '../../mypage/_component/link-preview';
import { Label } from '@/components/ui/label';
import LikeButton from './like-button';
import CopyButton from './copy-button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data } = usePublic({ accessToken: accessToken });

  return (
    <>
      {data ? (
        data.data.publicCategoryList.map((category: any) => (
          <PublicCategoryCard category={category} />
        ))
      ) : (
        <Loading />
      )}
    </>
  );
}

function PublicCategoryCard({ category }: any) {
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
        <OptionButton likeCount={category.likeCount} />
      </div>
    </div>
  );
}

function OptionButton({ likeCount }: { likeCount: number }) {
  return (
    <div className='flex w-full justify-end'>
      <LikeButton likeCount={likeCount} />
      <CopyButton />
    </div>
  );
}
