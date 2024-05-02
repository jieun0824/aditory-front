'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import FirstStep from '../_component/first-step';
import SecondStep from '../_component/second-step';
import ThirdStep from '../_component/third-step';
import Link from 'next/link';
import useUserInfo from '@/app/store/useUserInfo';
import { useRouter } from 'next/navigation';

export type stateName = 'username' | 'password' | 'nickname' | 'contact';
export default function SignUp({ params }: { params: { step: string } }) {
  const [selected, setSelected] = useState<string[]>([]);
  const userInfo = useUserInfo((state: any) => state.userInfo);
  const setUserInfo = useUserInfo((state: any) => state.setUserInfo);
  const router = useRouter();

  const selectedHandler = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const getPost = async () => {
    await fetch(`http://localhost:8080/users/signup`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then(() => router.push('/login'))
      .catch((error) => console.log(error));
  };

  const setHandler = useCallback(
    (stateName: stateName, value: string | number) => {
      switch (stateName) {
        case 'username':
          if (typeof value == 'string') {
            setUserInfo({ username: value });
          }
          break;
        case 'contact':
          if (typeof value == 'string') {
            setUserInfo({ contact: value });
          }

          break;
        case 'password':
          if (typeof value == 'string') {
            setUserInfo({ password: value });
          }
          break;
        case 'nickname':
          if (typeof value == 'string') {
            setUserInfo({ nickname: value });
          }
          break;
        default:
          console.log('none');
      }
    },
    []
  );

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className='item flex h-full min-h-96 w-full flex-col justify-between'>
      <form>
        {params.step == '1' ? (
          <FirstStep setHandler={setHandler} />
        ) : params.step == '2' ? (
          <SecondStep setHandler={setHandler} />
        ) : (
          <ThirdStep selected={selected} selectedHandler={selectedHandler} />
        )}
      </form>
      <div>
        {params.step != '3' ? (
          <Link href={`/signup/${parseInt(params.step) + 1}`}>
            <Button className='mt-6 w-full gap-2 px-4 text-white'>
              <FaArrowRightLong />
              NEXT
            </Button>
          </Link>
        ) : (
          <Button
            className='mt-6 w-full gap-2 px-4 text-white'
            onClick={getPost}
          >
            <FaArrowRightLong />
            SIGNIN
          </Button>
        )}
      </div>
    </div>
  );
}
