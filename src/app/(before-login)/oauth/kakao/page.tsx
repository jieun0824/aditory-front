'use client';

import { useStorage } from '@/lib/useStorage';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectKakao() {
  const code = new URL(window.location.href).searchParams.get('code');
  const { addUserInfo } = useStorage();
  const router = useRouter();
  // console.log(code);
  const postCode = async (): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/login`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            provider: 'kakao',
            code: code,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
        }
      );

      if (!response.ok) {
        return;
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (code) {
      postCode().then((res) => {
        if (res) {
          // console.log(res.data);
          addUserInfo({
            ...res.data,
          });
          if (res.data.userCategories.length === 0) {
            router.push('/oauth/kakao/signup');
          } else {
            router.push('/');
          }
        }
      });
    }
  }, [code]);

  return (
    <div>
      <Image
        src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Chipmunk.png'
        alt='Chipmunk'
        width={200}
        height={100}
      />
    </div>
  );
}
