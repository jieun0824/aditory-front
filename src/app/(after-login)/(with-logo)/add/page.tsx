'use client';
import { useEffect } from 'react';
import AddModal from '../_component/add-modal';
import { useMyCategories } from '@/service/categories/useCategoryService';
import { useRouter } from 'next/navigation';

export default function AddPage() {
  const { data, error, isLoading }: any = useMyCategories();
  const router = useRouter();
  useEffect(() => {
    if (error) {
      alert('login again');
      router.push('/login');
    }
  }, [error]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <AddModal categories={data.data.categoryList} />;
}
