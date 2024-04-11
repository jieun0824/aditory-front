import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
        <Button className='rounded-2xl'>아이디로 로그인</Button>
        <Button className='rounded-2xl'>google 아이디로 로그인</Button>
        <span className='flex cursor-pointer justify-center text-zinc-600'>
          <u>회원가입</u>
        </span>
      </div>
    </>
  );
}
