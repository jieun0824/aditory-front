'use client';
import SelectComponent from '@/components/select-component';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SelectItem } from '@/components/ui/select';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  useMoveCategory,
  useMyCategories,
} from '@/service/categories/useCategoryService';
import { Category, CategoryResponse } from '@/types/model/category';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function MoveBtn({
  categoryId,
  selectTargetCategoryId,
  myCategories,
  onClick,
}: {
  categoryId: string;
  selectTargetCategoryId: (value: string) => void;
  myCategories: Category[];
  onClick: () => void;
}) {
  const router = useRouter();
  const cancelHandler = () => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <Card className='fixed bottom-40 flex w-1/2 flex-col items-center gap-3 bg-gray-50/65 p-3'>
      <Button
        onClick={cancelHandler}
        className='w-fit shadow'
        variant={'outline'}
      >
        <IoClose />
      </Button>
      <div className='flex gap-2'>
        <SelectComponent
          name='categoryId'
          variant='moveCategory'
          onValueChangeHandler={selectTargetCategoryId}
        >
          {myCategories &&
            myCategories.map((item: any, i: number) => (
              <SelectItem value={item.categoryName} key={i}>
                {item.categoryName}
              </SelectItem>
            ))}
        </SelectComponent>
        <Button className='bg-opacity-60 shadow' onClick={onClick}>
          move
        </Button>
      </div>
    </Card>
  );
}
