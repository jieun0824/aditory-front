'use client';
import { useMyCategories } from '@/service/categories/useCategoryService';
import AddModal from '../../_component/add-modal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStorage } from '@/lib/useStorage';
import { useAccessToken } from '@/hooks/useAccessToken';

export default function AddPage() {
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, error, isLoading }: any = useMyCategories({ accessToken });
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
