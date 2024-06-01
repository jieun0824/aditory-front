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
import { useCallback, useState } from 'react';
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
import useCategoryStore from '@/lib/useCategoryStore';
import { Badge } from '@/components/ui/badge';

export default function DrawerDemo() {
  const params = useParams<{ categoryId: string }>();
  const router = useRouter();
  const { accessToken } = useAccessToken();
  const queryClient = useQueryClient();
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const stateRef = React.useRef<HTMLButtonElement>(null);
  const CategoryInfo = useCategoryStore((state: any) => state.CategoryInfo);
  const [categoryData, setCategoryData] = useState({
    categoryName: CategoryInfo.categoryName,
    categoryState: CategoryInfo.categoryState,
    asCategoryName: CategoryInfo.asCategoryName,
  });
  const [editMode, setEditMode] = useState<boolean>(false);

  const dataHandler = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement> | string,
      key?: string // only when typeof == 'string'
    ) => {
      key && typeof e === 'string'
        ? setCategoryData({ ...categoryData, [key]: e })
        : typeof e === 'object' &&
          setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    },
    [categoryData, setCategoryData]
  );

  //delete mutation
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

  //update mutation
  const { mutate: updateMutate, isSuccess } = useUpdateCategory({
    ...categoryData,
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
    onSettledFn: () => {
      if (stateRef.current) {
        stateRef.current.innerText = 'Saved';
        stateRef.current.style.color = 'red';
        closeRef.current?.click();
      }
    },
  });
  const onOpenHandler = () => {
    //edit 저장 x -> editmode 비롯한 모든 값 초기화
    setEditMode(false);
    setCategoryData(CategoryInfo);
    //edit 저장 o ->
  };

  const onMoveHandler = () => {
    router.push(`/category/${params.categoryId}?moveMode=true`);
    closeRef.current?.click();
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
              <EditForm categoryData={categoryData} dataHandler={dataHandler} />
            ) : (
              <>
                <DrawerDescription>Category options</DrawerDescription>
                <CategoryEditBtn onClick={() => setEditMode(true)} />
                <CategoryMoveBtn onClick={onMoveHandler} />
                <CategoryDeleteBtn onClick={() => deleteMutate()} />
              </>
            )}
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild ref={closeRef}>
              <Button variant='secondary'>Cancel</Button>
            </DrawerClose>
            {editMode ? (
              <Button onClick={() => updateMutate()} ref={stateRef}>
                Save
              </Button>
            ) : (
              editMode && isSuccess && <Button>Saved</Button>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function EditForm({
  categoryData,
  dataHandler,
}: {
  categoryData: {
    categoryName: string;
    categoryState: string;
    asCategoryName: string;
  };
  dataHandler: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    key?: string
  ) => void;
}) {
  return (
    <>
      <DrawerDescription>Edit Category</DrawerDescription>
      <Label htmlFor='categoryName'>Category Name</Label>
      <Input
        name='categoryName'
        value={categoryData.categoryName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dataHandler(e)}
      />
      <Label htmlFor='categoryState'>Category Status</Label>
      <div className='flex items-center'>
        <Switch
          id='categoryState'
          checked={categoryData.categoryState == 'PRIVATE' ? false : true}
          onCheckedChange={(checked: boolean) =>
            dataHandler(checked ? 'PUBLIC' : 'PRIVATE', 'categoryState')
          }
        />
        <Badge variant={'outline'}>{categoryData.categoryState}</Badge>
      </div>
      {categoryData.categoryState === 'PUBLIC' && (
        <>
          <Label htmlFor='categoryState'>Deploy as</Label>
          <Input
            name='asCategoryName'
            value={categoryData.asCategoryName}
            onChange={dataHandler}
          />
        </>
      )}
    </>
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

function CategoryMoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <DrawerTitle className='cursor-pointer' onClick={onClick}>
      Move
    </DrawerTitle>
  );
}
