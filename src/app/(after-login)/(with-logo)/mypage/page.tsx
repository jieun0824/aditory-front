'use client';
import { Label } from '@/components/ui/label';
import ProfileCard from '../../../../components/profile-card';
import { MdLibraryBooks } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import { useStorage } from '@/lib/useStorage';
import { Category } from '@/model/category';
import Categories from './_component/category-card';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import NewCategoryModal from './_component/new-category';
import { useMyCategories } from '@/service/categories/useCategoryService';

export default function MyPage() {
  const { userInfo } = useStorage();
  const [categories, setCategories] = useState<Category[]>([]);
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, isLoading, refetch } = useMyCategories({
    accessToken: accessToken,
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (data) {
      setCategories(data.data.categoryList);
    } else {
      console.log('no data');
    }
    console.log(data);
  }, [data]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProfileCard data={userInfo} />
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-2 text-left'>
            <MdLibraryBooks className='text-md' />
            <Label className='text-md font-semibold'>My Categories</Label>
          </div>
          <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
              <div className='flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-60'>
                <FaCirclePlus className='text-primary' />
                <span className='text-xs'>add new category</span>
              </div>
            </DialogTrigger>
            <NewCategoryModal refetch={refetch} setOpen={setOpen} />
          </Dialog>
        </div>
        <div className='grid h-full w-full grid-cols-2 gap-x-4'>
          <Categories categories={categories} />
        </div>
      </Suspense>
    </>
  );
}
