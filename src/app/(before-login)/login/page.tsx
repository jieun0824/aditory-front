'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CiUser, CiLock } from 'react-icons/ci';
import useToken from '@/app/store/useToken';
import queryOptions from '@/service/user/queries';
import { signIn } from 'next-auth/react';

export type stateName = 'username' | 'password' | 'nickname' | 'contact';
export default function SignIn() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setToken = useToken((state: any) => state.setToken);
  const router = useRouter();
  const { queryKey, queryFn, onSuccess, onError } = queryOptions.signIn({
    username,
    password,
  });

  const handleLoginBtn = async () => {
    try {
      await signIn('Credentials', {
        username: username,
        password: password,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      throw new Error(e.response.data.msg);
    }
  };

  return (
    <div className='item flex h-full min-h-96 w-full flex-col justify-between'>
      <form>
        <div className='w-full'>
          <span className='text-md flex items-center gap-1'>
            <CiUser />
            ID
          </span>
          <Input
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            className='border-b-1 border-x-0 border-t-0'
          />
          <span className='text-md mt-10 flex items-center gap-1'>
            <CiLock />
            password
          </span>
          <Input
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            className='border-b-1 border-x-0 border-t-0'
          />
        </div>
        <div>
          <Button
            className='mt-6 w-full gap-2 px-4 text-white'
            onClick={handleLoginBtn}
          >
            <FaArrowRightLong />
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
}
