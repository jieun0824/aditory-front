'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { User } from '@/model/user';
import { useUsers } from '@/service/user/useUserService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfileCard() {
  const router = useRouter();
  let userInfo: User = {};
  if (userInfo) {
    userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  }

  const { data, error, isLoading } = useUsers();
  useEffect(() => {
    if (error) {
      alert('login again');
      router.push('/login');
    }
  }, [error]);

  return (
    <Card className='flex w-full items-center'>
      <CardHeader>
        <Avatar className='h-auto w-20'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className='flex w-full flex-col gap-2 p-6'>
        <p>{userInfo.nickname}</p>
        <CardDescription>{userInfo.username}</CardDescription>
        <Button className='mx-8 rounded-xl text-white'>Logout</Button>
      </CardContent>
    </Card>
  );
}
