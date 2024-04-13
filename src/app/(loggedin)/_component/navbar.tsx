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
    <div className='fixed bottom-0 flex h-14 w-full items-center justify-around rounded-t-xl bg-white shadow-[0_35px_60px_30px_rgba(0,0,0,0.1)] ring-offset-0'>
      <MenuIcon href='/search'>
        <IoMdSearch size={22} color='#667080' />
      </MenuIcon>
      <MenuIcon href='/'>
        <IoHomeSharp size={20} color='#667080' />
      </MenuIcon>
      <MenuIcon href='/mypage'>
        <IoPersonCircle size={22} color='#667080' />
      </MenuIcon>
    </div>
  );
}
