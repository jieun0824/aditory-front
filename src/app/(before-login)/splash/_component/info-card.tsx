import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import KakaoLoginBtn from './kakao-login';

export default function InfoCard() {
  return (
    <>
      <Image src='/icon/aditory.svg' alt='logo' width={200} height={100} />
      <Image
        src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Chipmunk.png'
        alt='Chipmunk'
        width={200}
        height={100}
      />
      <div className='flex w-full flex-col gap-1'>
        <Link href={'/login'}>
          <Button className='w-full text-white shadow-md'>Login</Button>
        </Link>
        <KakaoLoginBtn />
        <Link
          href={'/signup/1'}
          className='flex cursor-pointer justify-center text-zinc-600'
        >
          <u>signup</u>
        </Link>
      </div>
    </>
  );
}
