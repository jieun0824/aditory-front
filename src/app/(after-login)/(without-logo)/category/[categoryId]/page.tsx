'use client';

import { Label } from '@/components/ui/label';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  useMoveCategory,
  useMyCategories,
  useSpecific,
} from '@/service/categories/useCategoryService';
import { Suspense, useCallback, useState } from 'react';
import LinkCard from '@/app/(after-login)/(without-logo)/link/[linkId]/_component/link-card';
import { useSearchParams } from 'next/navigation';
import MoveBtn from '@/app/(after-login)/(without-logo)/category/[categoryId]/_component/move-btn';
import { useOwner } from '@/lib/provider/owner-provider';

export default function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const search = useSearchParams();
  const moveMode = Boolean(search.get('moveMode'));
  const { accessToken } = useAccessToken();
  const { data } = useSpecific({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
  });
  const [moveCategory, setMoveCategory] = useState<number[]>([]);
  const [targetCategoryId, setTargetCategoryId] = useState(0);
  const { data: myCategories } = useMyCategories({
    accessToken: accessToken,
  });
  const { owner } = useOwner();
  const convertToId = (categoryName: string): number => {
    return myCategories!.data.categoryList.find(
      (item: any) => item.categoryName == categoryName
    )?.categoryId!;
  };
  const { mutate } = useMoveCategory({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
    linkIdList: moveCategory,
    targetCategoryId: targetCategoryId,
  });
  const selectMoveCategory = useCallback(
    (checked: boolean, categoryId: number) => {
      if (checked) {
        setMoveCategory([...moveCategory, categoryId]);
      } else {
        setMoveCategory(moveCategory.filter((id) => id !== categoryId));
      }
    },
    [moveCategory]
  );
  const selectTargetCategoryId = useCallback(
    (value: string) => setTargetCategoryId(convertToId(value)),
    [myCategories ? myCategories.data.categoryList : []]
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data && (
        <div className='flex h-full min-h-dvh w-full flex-col items-center gap-4'>
          <Label htmlFor='categoryName' className='text-2xl font-semibold'>
            {owner ? data.categoryName : data.asCategoryName}
          </Label>
          <LinkCard
            linkList={data.linkList}
            moveCategory={moveCategory}
            selectMoveCategory={selectMoveCategory}
            moveMode={moveMode}
          />
          {moveMode && (
            <MoveBtn
              categoryId={params.categoryId}
              selectTargetCategoryId={selectTargetCategoryId}
              myCategories={myCategories ? myCategories.data.categoryList : []}
              onClick={mutate}
            />
          )}
        </div>
      )}
    </Suspense>
  );
}
