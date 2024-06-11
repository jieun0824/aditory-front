import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function KakaoLoginBtn() {
  return (
    <Link href={process.env.NEXT_PUBLIC_KAKAO_AUTH_URL ?? ''}>
      <Button className='w-full bg-[#FFE808] text-black shadow-md hover:bg-[#FFE808]/70'>
        <Image
          src={'/icon/KakaoTalk_logo.svg'}
          alt='kakao'
          width={30}
          height={30}
          className='mr-2'
        />
        Login with Kakao
      </Button>
    </Link>
  );
}
