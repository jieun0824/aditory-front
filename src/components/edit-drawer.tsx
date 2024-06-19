'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { useStorage } from '@/lib/useStorage';
import { useEffect, useRef, useState } from 'react';
import { usePatchUserInfo } from '@/service/user/useUserService';
import { useAccessToken } from '@/lib/useAccessToken';
import { useQueryClient } from '@tanstack/react-query';
export default function EditDrawer({
  onOpenHandler,
  children,
  variant,
  userData,
}: {
  onOpenHandler?: () => void;
  children: React.ReactNode;
  variant: 'editCategory' | 'editProfile';
  userData: any;
}) {
  const variants = {
    editCategory: { trigger: '', drawer: '' },
    editProfile: { trigger: 'w-1/2', drawer: 'h-4/5' },
  };
  return (
    <Drawer>
      <DrawerTrigger
        asChild
        onClick={onOpenHandler}
        className={cn(variants[variant].trigger, 'cursor-pointer')}
      >
        {children}
      </DrawerTrigger>
      <DrawerContent className={cn(variants[variant].drawer)}>
        {variant === 'editProfile' ? (
          <EditProfileForm userData={userData} />
        ) : (
          <></>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function EditProfileForm({ userData }: { userData: any }) {
  const { userInfo } = useStorage(); //only for image
  const { accessToken } = useAccessToken();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [patchData, setPatchData] = useState({
    nickname: (userData.nickname as string) || '',
    contact: '010-9132-6380', //need to fix
    profileImage: (userInfo.profileImageUrl as string) || '',
    previewUrl: (userInfo.profileImageUrl as string) || '',
  });

  const ImageSelector = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const formData = new FormData();

    if (e.target.type === 'file') {
      const targetFiles = (e.target as HTMLInputElement).files;
      if (targetFiles && targetFiles.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(targetFiles[0]);
        reader.onload = (e: any) => {
          if (reader.readyState === 2) {
            setPatchData({
              ...patchData,
              previewUrl: reader.result as string,
            });
          }
        };
      }
    } else {
      setPatchData({ ...patchData, [e.target.name]: e.target.value });
    }
  };

  const { mutate } = usePatchUserInfo({
    accessToken: accessToken,
    nickname: patchData.nickname,
    contact: patchData.contact,
  });

  const mutateProfileImage = async () => {
    const formData = new FormData();
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('profileImage', fileInput.files[0]);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile-image`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );
        const result = await response.json();
        setPatchData({ ...patchData, profileImage: result.imageUrl });
        mutate(); // Update user info with new profile image URL
        queryClient.invalidateQueries({ queryKey: ['getProfileImage'] });
        console.log(result);
      } catch (error) {
        alert(`Error uploading image:, ${error}`);
      }
    } else {
      mutate();
    }
  };

  // useEffect(() => {
  //   console.log(patchData.profileImage);
  // }, [patchData]);

  return (
    <div className='mx-auto flex h-full w-full max-w-sm flex-col'>
      <DrawerHeader className='flex flex-col items-center gap-4 font-bold'>
        <span>Edit Profile</span>
      </DrawerHeader>
      <DrawerDescription>
        <div className='flex items-center justify-center'>
          <Input
            name='profileImage'
            type='file'
            accept='image/*'
            className='hidden'
            ref={inputRef}
            onChange={handleChange}
          />
          <Avatar
            className='flex h-28 w-28 items-center justify-center bg-zinc-300'
            onClick={ImageSelector}
          >
            <AvatarImage
              className={`${patchData.previewUrl === '' && 'h-10 w-10'}`}
              src={
                patchData.previewUrl !== ''
                  ? patchData.previewUrl
                  : 'https://www.phonet.se/wp-content/uploads/2019/11/small-plus-png-image-88078.png'
              }
              alt='profile-image'
            />
            <AvatarFallback>{userInfo.username}</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              name='nickname'
              defaultValue={patchData.nickname}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='contact'>Contact</Label>
            <Input
              id='contact'
              name='contact'
              defaultValue={patchData.contact}
              type='text'
              onChange={handleChange}
            />
          </div>
        </div>
      </DrawerDescription>
      <DrawerFooter>
        <Button onClick={mutateProfileImage}>Save</Button>
        <DrawerClose asChild>
          <Button variant={'secondary'}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}
