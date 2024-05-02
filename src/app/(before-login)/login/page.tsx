'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import Link from 'next/link';
import useUserInfo from '@/app/store/useUserInfo';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CiUser, CiLock } from 'react-icons/ci';

export type stateName = 'username' | 'password' | 'nickname' | 'contact';
export default function SignUp() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const getPost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      console.log(data);
      router.push('/');
    } catch (error) {
      alert("There's something wrong");
      console.error(error);
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
            onChange={(e) => setUsername(e.target.value)}
            className='border-b-1 border-x-0 border-t-0'
          />
          <span className='text-md mt-10 flex items-center gap-1'>
            <CiLock />
            password
          </span>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            className='border-b-1 border-x-0 border-t-0'
          />
        </div>
      </form>
      <div>
        <Button className='mt-6 w-full gap-2 px-4 text-white' onClick={getPost}>
          <FaArrowRightLong />
          LOGIN
        </Button>
      </div>
    </div>
  );
}
