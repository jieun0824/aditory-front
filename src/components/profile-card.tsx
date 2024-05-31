'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStorage } from '@/lib/useStorage';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import { SelectSeparator } from './ui/select';

export default function ProfileCard({ data }: any) {
  const router = useRouter();
  const { removeUserInfo } = useStorage();
  const LogoutHandler = () => {
    removeUserInfo();
    window.location.reload();
  };

  return (
    <Card className='flex flex-col items-center justify-center bg-inherit'>
      <CardHeader>
        <Avatar className='h-auto w-20'>
          <AvatarImage
            src='https://github.com/shadcn.png'
            alt='profile-image'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className='flex gap-2 p-6'>
        <p className='font-semibold'>{data.nickname}</p>
        <CardDescription>
          <Badge variant={'secondary'}>{data.username}</Badge>
        </CardDescription>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button
          onClick={LogoutHandler}
          variant={'outline'}
          className='w-1/2 hover:bg-destructive/65 hover:text-bgColor'
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            router.push('/mypage/edit?editMode=true');
          }}
          className='w-1/2'
          variant={'outline'}
        >
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
