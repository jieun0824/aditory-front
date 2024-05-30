'use client';

import { Card } from '@/components/ui/card';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  usePublic,
  useUpdateCategory,
} from '@/service/categories/useCategoryService';

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data } = usePublic({ accessToken: accessToken });
  return (
    <>
      {data &&
        data.data.publicCategoryList.map((category: any) => (
          <PublicCategoryCard category={category} />
        ))}
    </>
  );
}

function PublicCategoryCard({ category }: any) {
  return <Card>{category.categoryName}</Card>;
}
