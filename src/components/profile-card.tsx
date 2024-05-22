'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { User } from '@/types/model/user';
import { useStorage } from '@/lib/useStorage';

export default function ProfileCard({ data }: any) {
  const { removeUserInfo } = useStorage();
  const LogoutHandler = () => {
    removeUserInfo();
    window.location.reload();
  };
  console.log(data);
  return (
    <Card className='flex w-full items-center'>
      <CardHeader>
        <Avatar className='h-auto w-20'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className='flex w-full flex-col gap-2 p-6'>
        <p>{data.nickname}</p>
        <CardDescription>{data.username}</CardDescription>
        <Button className='mx-8 rounded-xl text-white' onClick={LogoutHandler}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
