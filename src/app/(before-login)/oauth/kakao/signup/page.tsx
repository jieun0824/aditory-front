'use client';

import ThirdStep from '@/app/(before-login)/signup/_component/third-step';
import { Button } from '@/components/ui/button';
import { useAccessToken } from '@/lib/useAccessToken';
import CategoryQueryOptions from '@/service/categories/queries';
import { useCreateCategory } from '@/service/categories/useCategoryService';
import { useIsMutating, useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function KakaoSignup() {
  const [selected, setSelected] = useState<string[]>([]);
  const { accessToken } = useAccessToken();
  const router = useRouter();
  const isMutating = useIsMutating({ mutationKey: ['createCategory'] });
  const selectedHandler = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };
  const makeMutate = (category: string) => {
    return CategoryQueryOptions.newCategory({
      accessToken: accessToken,
      categoryName: category,
    }).mutationFn;
  };

  const mutateFnList = (selected: string[]) => {
    selected.forEach(async (category) => {
      makeMutate(category)();
    });
    router.push('/');
  };

  return (
    <div>
      <ThirdStep selected={selected} selectedHandler={selectedHandler} />
      <Button
        className='mt-6 w-full gap-2 px-4 text-white'
        onClick={() => mutateFnList(selected)}
      >
        <FaArrowRightLong />
        SIGNIN
      </Button>
    </div>
  );
}
