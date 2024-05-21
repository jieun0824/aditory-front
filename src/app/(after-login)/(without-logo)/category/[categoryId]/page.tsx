'use client';

import { Label } from '@/components/ui/label';
import { useAccessToken } from '@/lib/useAccessToken';
import { useSpecific } from '@/service/categories/useCategoryService';
import { Suspense, useEffect, useState } from 'react';
import LinkCard from '../../_component/link-card';

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data && (
        <div className='flex h-full min-h-dvh w-full flex-col items-center gap-4'>
          <Label htmlFor='categoryName' className='text-2xl font-semibold'>
            {data.data.categoryName}
          </Label>
          <LinkCard linkList={data.data.linkList} />
        </div>
      )}
    </Suspense>
  );
}
