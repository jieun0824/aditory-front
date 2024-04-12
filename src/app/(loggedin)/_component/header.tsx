import Image from 'next/image';

export default function Header() {
  return (
    <div className='absolute top-0 flex h-12 w-full items-center justify-start'>
      <Image src={'/icon/aditory.svg'} alt='logo' width={130} height={50} />
    </div>
  );
}
