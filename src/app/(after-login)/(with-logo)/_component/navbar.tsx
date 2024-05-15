'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdSearch } from 'react-icons/io';
import { IoHomeSharp } from 'react-icons/io5';
import { IoPersonCircle } from 'react-icons/io5';
import { IoIosGlobe } from 'react-icons/io';

function MenuIcon({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return <Link href={href}>{children}</Link>;
}

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 flex h-14 w-full items-center justify-around rounded-t-xl bg-card shadow-[0_35px_60px_30px_rgba(0,0,0,0.1)] ring-offset-0'>
      <MenuIcon href='/ideas'>
        <IoIosGlobe
          size={22}
          color={pathname == '/ideas' ? '#4FD99F' : '#667080'}
        />
      </MenuIcon>
      <MenuIcon href='/'>
        <IoHomeSharp
          size={20}
          color={pathname == '/' ? '#4FD99F' : '#667080'}
        />
      </MenuIcon>
      <MenuIcon href='/mypage'>
        <IoPersonCircle
          size={22}
          color={pathname == '/mypage' ? '#4FD99F' : '#667080'}
        />
      </MenuIcon>
    </div>
  );
}
