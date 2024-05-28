'use client';
import { IoIosMore } from 'react-icons/io';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccessToken } from '@/lib/useAccessToken';
import {
  useDeleteCategory,
  useUpdateCategory,
} from '@/service/categories/useCategoryService';
import DeleteAlert from '@/components/delete-alert';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CategoryState } from '@/types/types';
import useCategoryStore from '@/lib/useCategoryStore';
import { Badge } from '@/components/ui/badge';

export default function DrawerDemo() {
  const params = useParams<{ categoryId: string }>();
  const CategoryInfo = useCategoryStore((state: any) => state.CategoryInfo);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(
    CategoryInfo.categoryName
  );
  const [categoryState, setCategoryState] = useState<CategoryState>(
    CategoryInfo.categoryState
  );
  const [asCategoryName, setAsCategoryName] = useState<string>(
    CategoryInfo.categoryName
  );
  const switchHandler = () => {
    setCategoryState(categoryState == 'PRIVATE' ? 'PUBLIC' : 'PRIVATE');
  };
  const router = useRouter();
  const { accessToken } = useAccessToken();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useDeleteCategory({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
    onSettled: () => {
      router.push('/mypage');
      return queryClient.invalidateQueries({
        queryKey: ['myCategory'],
      });
    },
  });
  const { mutate: updateMutate } = useUpdateCategory({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
    categoryName: categoryName,
    categoryState: categoryState,
    asCategoryName: asCategoryName,
  });
  const onOpenHandler = () => {
    //edit 저장 x -> editmode 비롯한 모든 값 초기화
    setEditMode(false);
    setCategoryState(CategoryInfo.categoryState);
    setCategoryName(CategoryInfo.categoryName);
    setAsCategoryName(CategoryInfo.categoryName);
    //edit 저장 o ->
  };

  return (
    <Drawer>
      <DrawerTrigger asChild className='cursor-pointer' onClick={onOpenHandler}>
        <IoIosMore size={30} />
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader className='flex flex-col items-start gap-4'>
            {editMode ? (
              <>
                <DrawerDescription>Edit Category</DrawerDescription>
                <Label htmlFor='categoryName'>Category Name</Label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Label htmlFor='categoryState'>Category Status</Label>
                <div className='flex items-center'>
                  <Switch id='categoryState' onCheckedChange={switchHandler} />
                  <Badge variant={'outline'}>{categoryState}</Badge>
                </div>
                {categoryState === 'PUBLIC' && (
                  <>
                    <Label htmlFor='categoryState'>Deploy as</Label>
                    <Input
                      value={asCategoryName}
                      onChange={(e) => setAsCategoryName(e.target.value)}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <DrawerDescription>Category options</DrawerDescription>
                <CategoryEditBtn onClick={() => setEditMode(true)} />
                <CategoryDeleteBtn onClick={() => deleteMutate()} />
              </>
            )}
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='secondary'>Cancel</Button>
            </DrawerClose>
            {editMode && <Button onClick={() => updateMutate()}>Save</Button>}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CategoryEditBtn({ onClick }: { onClick: () => void }) {
  return (
    <DrawerTitle className='cursor-pointer' onClick={onClick}>
      Edit
    </DrawerTitle>
  );
}

function CategoryDeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <DeleteAlert mutate={onClick} option={'category'}>
      <DrawerTitle className='cursor-pointer'>Delete</DrawerTitle>
    </DeleteAlert>
  );
}
