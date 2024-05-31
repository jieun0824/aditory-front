'use client';

import { Card } from '@/components/ui/card';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  usePublic,
  useUpdateCategory,
} from '@/service/categories/useCategoryService';
import { Suspense } from 'react';
import Loading from '../loading';

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
  return <Card>{category.categoryName}</Card>;
}
