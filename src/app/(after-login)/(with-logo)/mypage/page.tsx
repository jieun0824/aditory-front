'use client';
import { Label } from '@/components/ui/label';
import ProfileCard from '../../../../components/profile-card';
import { MdLibraryBooks } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import queryOptions from '@/service/categories/queries';
import { useStorage } from '@/lib/useStorage';
import { getAccessToken } from '@/lib/token';
import { Category } from '@/model/category';
import Categories from './_component/category-card';
import { useAccessToken } from '../../../../../hooks/useAccessToken';

export default function MyPage() {
  const { userInfo } = useStorage();
  const [categories, setCategories] = useState<Category[]>([]);
  const accessToken = useAccessToken();
  const fetchData = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories/my`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await data.json();
  };

  useEffect(() => {
    if (accessToken) {
      fetchData().then((data) => {
        console.log(data);
        setCategories(data.data.categoryList);
      });
    } else {
      console.log('no access token');
    }
    console.log(accessToken);
  }, [accessToken]);

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
          <Categories categories={categories} />
        </div>
      </Suspense>
    </>
  );
}
