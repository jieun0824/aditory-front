'use client';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCallback, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useAccessToken } from '@/lib/useAccessToken';
import { useMyCategories } from '@/service/categories/useCategoryService';
import SelectComponent from '@/components/select-component';
import { SelectItem } from '@/components/ui/select';
import { usePostLink } from '@/service/links/useLinkService';
import ClipLoader from 'react-spinners/ClipLoader';

export default function AddModal({
  url,
  dialogRef,
  setPreviewUrl,
}: {
  url: string;
  dialogRef: any;
  setPreviewUrl: (url: string) => void;
}) {
  const defaultValue = {
    title: '',
    summary: '',
    categoryId: 0, //need to change default value
    autoComplete: false,
  };
  const { accessToken } = useAccessToken();
  const [payloadData, setPayloadData] = useState(defaultValue);

  const { mutate, isPending } = usePostLink({
    ...payloadData,
    url: url,
    accessToken: accessToken,
    additionalFn: () => {
      setPayloadData(defaultValue);
      setPreviewUrl('');
      dialogRef.current?.click();
    },
  });

  const { data, error, isLoading }: any = useMyCategories({
    accessToken: accessToken,
  });

  const dataHandler = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement> | boolean | number,
      key?: string
    ) => {
      {
        typeof e === 'object'
          ? setPayloadData({ ...payloadData, [e.target.name]: e.target.value })
          : key && setPayloadData({ ...payloadData, [key]: e });
      }
      console.log(payloadData);
    },
    [payloadData]
  );

  const submitHandler = async (e: any) => {
    e.preventDefault();
    mutate();
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
              checked={payloadData.autoComplete}
              name='autoComplete'
              onCheckedChange={(data) => dataHandler(data, 'autoComplete')}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              disabled={payloadData.autoComplete}
              name='title'
              placeholder='add title of the link'
              className='border-none bg-card'
              autoFocus
              value={payloadData.title}
              onChange={dataHandler}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='description'>Description / summary</Label>
            <Input
              disabled={payloadData.autoComplete}
              name='summary'
              placeholder='add title of the link'
              className='border-none bg-card'
              value={payloadData.summary}
              onChange={dataHandler}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='category'>Category</Label>
            <SelectComponent
              disabled={payloadData.autoComplete}
              onValueChangeHandler={(value: string) =>
                dataHandler(
                  data.data.categoryList.find(
                    (item: any) => item.categoryName == value
                  )['categoryId'],
                  'categoryId'
                )
              }
              name='categoryId'
              variant='mainPage'
            >
              {data &&
                data.data.categoryList.map((item: any, i: number) => (
                  <SelectItem value={item.categoryName} key={i}>
                    {item.categoryName}
                  </SelectItem>
                ))}
            </SelectComponent>
          </div>
        </div>
        <DialogFooter className='mt-3 flex items-center justify-center'>
          {isPending ? (
            <div className='flex w-full flex-col items-center justify-center gap-2'>
              <ClipLoader
                className='animate-pulse'
                loading={isPending}
                size={20}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
              <span className='animate-pulse text-xs'>
                Automatically Classifying Acorn Types...
              </span>
            </div>
          ) : (
            <Button className='w-full rounded-xl text-white' type='submit'>
              Save
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
