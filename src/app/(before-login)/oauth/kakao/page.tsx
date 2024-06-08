'use client';

import { useStorage } from '@/lib/useStorage';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectKakao() {
  const code = new URL(window.location.href).searchParams.get('code');
  const { addUserInfo } = useStorage();
  const router = useRouter();
  console.log(code);
  const postCode = async () => {
    try {
      const res = await fetch(
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
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      postCode();
      // .then((res) => {
      //   console.log(res.data);
      //   const accessTokenExpires = Date.now() + 10 * 60 * 1000;
      //   const refreshTokenExpires = Date.now() + 6 * 60 * 60 * 1000;

      //   addUserInfo({
      //     ...res.data,
      //     accessTokenExpires: accessTokenExpires,
      //     refreshTokenExpires: refreshTokenExpires,
      //   });

      //   router.push('/');
      // });
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
