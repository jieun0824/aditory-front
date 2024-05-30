'use client';

import { Label } from '@/components/ui/label';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  useMoveCategory,
  useMyCategories,
  useSpecific,
} from '@/service/categories/useCategoryService';
import { Suspense, useCallback, useEffect, useState } from 'react';
import LinkCard from '../../link/[linkId]/_component/link-card';
import useCategoryStore from '@/lib/useCategoryStore';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import MoveBtn from './_component/move-btn';

export default function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const search = useSearchParams();
  const moveMode = Boolean(search.get('moveMode'));
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, isLoading, refetch } = useSpecific({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
  });
  const [moveCategory, setMoveCategory] = useState<number[]>([]);
  const [targetCategoryId, setTargetCategoryId] = useState(0);
  const { data: myCategories } = useMyCategories({
    accessToken: accessToken,
  });
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
            {data.categoryName}
          </Label>
          <LinkCard
            linkList={data.linkList}
            moveCategory={moveCategory}
            selectMoveCategory={selectMoveCategory}
            moveMode={moveMode}
          />
          {
            <MoveBtn
              categoryId={params.categoryId}
              selectTargetCategoryId={selectTargetCategoryId}
              myCategories={myCategories ? myCategories.data.categoryList : []}
              onClick={mutate}
            />
          }
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
