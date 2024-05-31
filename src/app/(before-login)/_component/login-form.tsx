'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CiUser, CiLock } from 'react-icons/ci';
import queryOptions from '@/service/user/queries';
import { loginInfo, useStorage } from '@/lib/useStorage';
import { Login } from '@/types/model/user';
import { useGetProfileImage, useSignIn } from '@/service/user/useUserService';

export type stateName = 'username' | 'password' | 'nickname' | 'contact';
export default function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { mutate } = useSignIn({
    username,
    password,
  });

  return (
    <div className='item flex h-full min-h-96 w-full flex-col justify-between'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <div className='w-full'>
          <span className='text-md flex items-center gap-1'>
            <CiUser />
            ID
          </span>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            className='border-b-1 border-x-0 border-t-0'
          />
          <span className='text-md mt-10 flex items-center gap-1'>
            <CiLock />
            password
          </span>
          <Input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='border-b-1 border-x-0 border-t-0'
          />
        </div>
        <div>
          <Button className='mt-6 w-full gap-2 px-4 text-white' type='submit'>
            <FaArrowRightLong />
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
}
