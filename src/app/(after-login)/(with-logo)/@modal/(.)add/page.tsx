'use client';
import { useMyCategories } from '@/service/categories/useCategoryService';
import AddModal from '../../_component/add-modal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
