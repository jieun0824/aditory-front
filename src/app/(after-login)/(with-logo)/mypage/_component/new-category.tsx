'use client';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccessToken } from '@/lib/useAccessToken';
import queryOptions from '@/service/categories/queries';
import { useCreateCategory } from '@/service/categories/useCategoryService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewCategoryModal({
  refetch,
  dialogRef,
}: {
  refetch: () => void;
  dialogRef: any;
}) {
  const [category, setCategory] = useState('');
  const { accessToken } = useAccessToken();
  const router = useRouter();
  const { mutate } = useCreateCategory({
    accessToken: accessToken,
    categoryName: category,
    successedFn: () => {
      refetch();
      setCategory('');
      dialogRef.current?.click();
    },
  });

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
        <DialogDescription>Add new Category for your links</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='category' className='text-right'>
            category
          </Label>
          <Input
            id='category'
            className='col-span-3'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => mutate()} type='submit'>
          save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
