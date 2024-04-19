'use client';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosMore } from 'react-icons/io';

export default function Header() {
  const router = useRouter();
  return (
    <div className='absolute top-0 flex h-12 w-full items-center justify-between px-4'>
      <IoIosArrowBack
        onClick={() => router.back()}
        className='cursor-pointer hover:opacity-60'
        size={30}
      />
      <IoIosMore size={30} />
    </div>
  );
}
