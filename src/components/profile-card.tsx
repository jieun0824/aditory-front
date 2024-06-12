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
import EditDrawer from './edit-drawer';
import { profileImageResponse } from '@/types/model/user';

export default function ProfileCard({
  data,
  profileImage,
}: {
  data: any;
  profileImage: profileImageResponse | undefined;
}) {
  const router = useRouter();
  const { removeUserInfo } = useStorage();
  const LogoutHandler = () => {
    removeUserInfo();
    window.location.reload();
  };
  const defaultProfile =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

  return (
    <Card className='flex flex-col items-center justify-center bg-inherit'>
      <CardHeader>
        <Avatar className='h-20 w-20'>
          <AvatarImage
            src={
              profileImage
                ? profileImage.data.s3DownloadResult.url
                : defaultProfile
            }
            alt='profile-image'
          />
          <AvatarFallback>{data.nickname}</AvatarFallback>
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
        <EditDrawer variant='editProfile' userData={data}>
          <Button variant={'outline'}>Edit Profile</Button>
        </EditDrawer>
      </CardFooter>
    </Card>
  );
}
