'use client';
import LinkCard from '@/components/link-card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  let userInfo = { accessToken: '' };
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  }
  const [links, setLinks] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/categories/${params.categoryId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Credentials': 'true',
              Authorization: `Bearer ${userInfo.accessToken!}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        //console.log(data);
        setLinks(data.data.linkList);
        setCategoryName(data.data.categoryName);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex h-full min-h-dvh w-full flex-col items-center gap-4'>
      <Label htmlFor='categoryName' className='text-2xl font-semibold'>
        {categoryName}
      </Label>
      {links.map((link, i) => {
        return <LinkCard key={i} link={link} />;
      })}
    </div>
  );
}
function setCategories(categoryList: any) {
  throw new Error('Function not implemented.');
}
