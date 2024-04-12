import Link from 'next/link';
import { IoMdSearch } from 'react-icons/io';
import { IoHomeSharp } from 'react-icons/io5';
import { IoPersonCircle } from 'react-icons/io5';

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
  return (
    <div className='absolute bottom-0 flex h-14 w-full items-center justify-around bg-white shadow-[0_35px_60px_30px_rgba(0,0,0,0.1)]'>
      <MenuIcon href='/search'>
        <IoMdSearch size={22} />
      </MenuIcon>
      <MenuIcon href='/'>
        <IoHomeSharp size={20} />
      </MenuIcon>
      <MenuIcon href='/mypage'>
        <IoPersonCircle size={22} />
      </MenuIcon>
    </div>
  );
}
