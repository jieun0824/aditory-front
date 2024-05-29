'use client';

import { Label } from '@/components/ui/label';
import { useAccessToken } from '@/lib/useAccessToken';
import { useSpecific } from '@/service/categories/useCategoryService';
import { Suspense, useCallback, useEffect, useState } from 'react';
import LinkCard from '../../link/[linkId]/_component/link-card';
import useCategoryStore from '@/lib/useCategoryStore';
import { Button } from '@/components/ui/button';

export default function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, isLoading, refetch } = useSpecific({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
  });
  const [moveCategory, setMoveCategory] = useState<number[]>([]);
  const selectMoveCategory = useCallback(
    (categoryId: number) => {
      if (moveCategory.includes(categoryId)) {
        setMoveCategory(moveCategory.filter((id) => id !== categoryId));
      } else {
        setMoveCategory([...moveCategory, categoryId]);
      }
    },
    [moveCategory]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data && (
        <div className='flex h-full min-h-dvh w-full flex-col items-center gap-4'>
          <Label htmlFor='categoryName' className='text-2xl font-semibold'>
            {data.categoryName}
          </Label>
          <LinkCard linkList={data.linkList} />
        </div>
      )}
    </Suspense>
  );
}

function SaveMoveBtn() {
  return (
    <>
      <Button>Save</Button>
    </>
  );
}
