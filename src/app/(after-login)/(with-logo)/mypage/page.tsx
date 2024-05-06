'use client';
import { Label } from '@/components/ui/label';
import ProfileCard from '../../../../components/profile-card';
import CategoryCard from './_component/category-card';
import { MdLibraryBooks } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import useCategories from '@/app/store/useCategories';

export default function MyPage() {
  let userInfo = { accessToken: '' };
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  }
  //const [categories, setCategories] = useState([]);
  //const categories = useCategories((state: any) => state.categories);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            Authorization: `Bearer ${userInfo.accessToken!}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        //console.log(data);
        setCategories(data.data.categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <>
      <ProfileCard userInfo={userInfo} />
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
        {categories.map((item, i) => (
          <CategoryCard key={i} category={item} />
        ))}
      </div>
    </>
  );
}
