'use client';
import { Label } from '@/components/ui/label';
import ProfileCard from '../../../../components/profile-card';
import { MdLibraryBooks } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import Categories from './_component/category-card';
import { Suspense, useEffect } from 'react';
import Loading from './loading';
import { useStorage } from '@/store/useStorage';
import { useMyCategories } from '@/service/categories/useCategoryService';
import queryOptions from '@/service/categories/queries';
import { useRouter } from 'next/navigation';
import { useRefresh } from '@/service/user/useUserService';

export default async function MyPage() {
  const { userInfo, addUserInfo, removeUserInfo } = useStorage();
  const accessToken = userInfo.accessToken;
  const refreshToken = userInfo.refreshToken;

  const { queryFn, queryKey, onSuccess, onError } = queryOptions.my({
    accessToken,
  });

  const data = await queryFn()
    .then((state) => {
      return state;
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProfileCard data={userInfo} />
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-2 text-left'>
            <MdLibraryBooks className='text-md' />
            <Label className='text-md font-semibold'>My Categories</Label>
          </div>
          <div className='flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-60'>
            <FaCirclePlus className='text-primary' />
            <span className='text-xs'>add new category</span>
          </div>
        </div>
        <div className='grid h-full w-full grid-cols-2 gap-x-4'>
          {/* <Categories categories={data.data.categoryList} /> */}
        </div>
      </Suspense>
    </>
  );
}
