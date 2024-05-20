'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useAccessToken } from '@/hooks/useAccessToken';
import { useMyCategories } from '@/service/categories/useCategoryService';
import queryOptions from '@/service/links/queries';

export default function AddModal({
  url,
  dialogRef,
  setPreviewUrl,
}: {
  url: string;
  dialogRef: any;
  setPreviewUrl: (url: string) => void;
}) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [autoComplete, setAutoComplete] = useState<boolean>(false);
  const [category, setCategory] = useState(0);
  const { accessToken } = useAccessToken();
  const { data, error, isLoading }: any = useMyCategories({ accessToken });

  const { queryFn } = queryOptions.newLink({
    accessToken: accessToken,
    autoComplete: autoComplete,
    title: title,
    summary: description,
    url: url,
    categoryId: category,
  });
  const submitHandler = async (e: any) => {
    e.preventDefault();
    queryFn()
      .then((response) => {
        console.log(response);
        setTitle('');
        setDescription('');
        setAutoComplete(false);
        setCategory(0);
        setPreviewUrl('');
        dialogRef.current?.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DialogContent className='w-full max-w-md'>
      <DialogHeader className='flex flex-row items-center justify-between'>
        <DialogTitle>Add Link</DialogTitle>
      </DialogHeader>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className='grid w-full items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Label htmlFor='auto'>auto save</Label>
            <Switch
              checked={autoComplete}
              onCheckedChange={(checked: boolean) => setAutoComplete(checked)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              disabled={autoComplete}
              id='title'
              placeholder='add title of the link'
              className='border-none bg-card'
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='description'>Description / summary</Label>
            <Input
              disabled={autoComplete}
              id='description'
              placeholder='add title of the link'
              className='border-none bg-card'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='category'>Category</Label>
            <Select
              disabled={autoComplete}
              onValueChange={(value) => {
                if (data) {
                  setCategory(
                    data.data.categoryList.filter(
                      (item: any) => item.categoryName === value
                    )[0].categoryId
                  );
                }
              }}
            >
              <SelectTrigger className='w-[180px] bg-card'>
                <SelectValue placeholder='auto' />
              </SelectTrigger>
              <SelectContent>
                {data &&
                  data.data.categoryList.map((item: any, i: number) => (
                    <SelectItem
                      value={item.categoryName}
                      onClick={() => setCategory(item.categoryId)}
                      key={i}
                    >
                      {item.categoryName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className='mt-3 flex justify-center'>
          <Button className='w-full rounded-xl text-white' type='submit'>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
