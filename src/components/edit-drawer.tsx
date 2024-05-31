// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTrigger,
// } from '@/components/ui/drawer';
// import { cn } from '@/lib/utils';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Label } from '@radix-ui/react-label';
// import { Input } from './ui/input';
// import { useStorage } from '@/lib/useStorage';
// import { useEffect, useRef, useState } from 'react';
// import {
//   usePatchUserInfo,
//   usePostProfileImage,
// } from '@/service/user/useUserService';
// import { useAccessToken } from '@/lib/useAccessToken';

// export default function EditDrawer({
//   onOpenHandler,
//   children,
//   variant,
// }: {
//   onOpenHandler?: () => void;
//   children: React.ReactNode;
//   variant: 'editCategory' | 'editProfile';
// }) {
//   const variants = {
//     editCategory: { trigger: '', drawer: '' },
//     editProfile: { trigger: 'w-1/2', drawer: 'h-4/5' },
//   };
//   return (
//     <Drawer>
//       <DrawerTrigger
//         asChild
//         onClick={onOpenHandler}
//         className={cn(variants[variant].trigger, 'cursor-pointer')}
//       >
//         {children}
//       </DrawerTrigger>
//       <DrawerContent className={cn(variants[variant].drawer)}>
//         {variant == 'editProfile' ? <EditProfileForm /> : <></>}
//       </DrawerContent>
//     </Drawer>
//   );
// }

// function EditProfileForm() {
//   const { userInfo } = useStorage();
//   const { accessToken } = useAccessToken();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [patchData, setPatchData] = useState({
//     nickname: (userInfo.nickname as string) || '',
//     contact: '010-9132-6380',
//     profileImage: (userInfo.profileImageUrl as string) || '',
//     previewUrl: (userInfo.profileImageUrl as string) || '',
//   });
//   const ImageSelector = () => {
//     if (inputRef.current) {
//       inputRef.current.click();
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formData = new FormData();
//     if (e.target.type === 'file') {
//       const targetFiles = (e.target as HTMLInputElement).files;
//       console.log(targetFiles[0]);
//       if (targetFiles) {
//         const reader = new FileReader();
//         reader.readAsDataURL(targetFiles[0]);
//         reader.onload = (e: any) => {
//           reader.readyState === 2 &&
//             setPatchData({
//               ...patchData,
//               previewUrl: reader.result as string,
//             });
//         };
//         formData.append('profileImage', targetFiles[0]);
//         console.log(formData);
//       }
//     } else {
//       setPatchData({ ...patchData, [e.target.name]: e.target.value });
//     }
//   };
//   const { mutate } = usePatchUserInfo({
//     accessToken: accessToken,
//     nickname: patchData.nickname,
//     contact: patchData.contact,
//   });

//   const mutateProfileImage = async () => {
//     try {
//       const response = await fetch('/users/profile-image', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }
//       const result = await response.json();
//       setPatchData({ ...patchData, profileImage: result.imageUrl });
//       mutate(); // Update user info with new profile image URL
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div className='mx-auto flex h-full w-full max-w-sm flex-col'>
//       <DrawerHeader className='flex flex-col items-center gap-4 font-bold'>
//         <span>Edit Profile</span>
//       </DrawerHeader>
//       <DrawerDescription>
//         <div className='flex items-center justify-center'>
//           <Input
//             name='profileImage'
//             type='file'
//             accept='image/*'
//             className='hidden'
//             ref={inputRef}
//             onChange={handleChange}
//           />
//           <Avatar
//             className='flex h-28 w-28 items-center justify-center bg-zinc-300'
//             onClick={ImageSelector}
//           >
//             <AvatarImage
//               className={`${patchData.previewUrl === '' && 'h-10 w-10'}`}
//               src={
//                 patchData.previewUrl !== ''
//                   ? patchData.previewUrl
//                   : 'https://www.phonet.se/wp-content/uploads/2019/11/small-plus-png-image-88078.png'
//               }
//               alt='profile-image'
//             />
//             <AvatarFallback>{userInfo.username}</AvatarFallback>
//           </Avatar>
//         </div>
//         <div className='flex flex-col gap-4'>
//           <div>
//             <Label htmlFor='name'>Name</Label>
//             <Input
//               type='text'
//               id='name'
//               name='nickname'
//               defaultValue={patchData.nickname}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor='contact'>Contact</Label>
//             <Input
//               id='contact'
//               name='contact'
//               defaultValue={patchData.contact}
//               type='text'
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </DrawerDescription>
//       <DrawerFooter>
//         <Button onClick={() => mutateProfileImage()}>Save</Button>
//         <DrawerClose asChild>
//           <Button variant={'secondary'}>Cancel</Button>
//         </DrawerClose>
//       </DrawerFooter>
//     </div>
//   );
// }

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
import { useRef, useState } from 'react';
import { usePatchUserInfo } from '@/service/user/useUserService';
import { useAccessToken } from '@/lib/useAccessToken';

export default function EditDrawer({
  onOpenHandler,
  children,
  variant,
}: {
  onOpenHandler?: () => void;
  children: React.ReactNode;
  variant: 'editCategory' | 'editProfile';
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
        {variant === 'editProfile' ? <EditProfileForm /> : <></>}
      </DrawerContent>
    </Drawer>
  );
}

function EditProfileForm() {
  const { userInfo } = useStorage();
  const { accessToken } = useAccessToken();
  const inputRef = useRef<HTMLInputElement>(null);
  const [patchData, setPatchData] = useState({
    nickname: (userInfo.nickname as string) || '',
    contact: '010-9132-6380',
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
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        setPatchData({ ...patchData, profileImage: result.imageUrl });
        mutate(); // Update user info with new profile image URL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

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
