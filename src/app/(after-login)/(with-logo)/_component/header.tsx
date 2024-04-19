import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='absolute top-0 flex h-12 w-full items-center justify-between'>
      <Link href={'/'}>
        <Image
          src={'/icon/aditory.svg'}
          alt='logo'
          width={130}
          height={50}
          className='dark:brightness-[106] dark:contrast-[90] dark:hue-rotate-[327deg] dark:invert-[100] dark:saturate-[.01] dark:sepia-0'
        />
      </Link>
      <ModeToggle />
    </div>
  );
}
