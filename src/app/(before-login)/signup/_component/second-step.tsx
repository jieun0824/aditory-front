'use client';
import { Input } from '@/components/ui/input';
import { CiAt, CiPhone } from 'react-icons/ci';
import { stateName } from '../[step]/page';

export default function SecondStep({
  setHandler,
}: {
  setHandler: (stateName: stateName, value: string | number) => void;
}) {
  return (
    <div className='w-full'>
      <span className='text-md flex items-center gap-1'>
        <CiAt />
        nickname
      </span>
      <Input
        onChange={(e) => setHandler('nickname', e.target.value)}
        className='border-b-1 border-x-0 border-t-0'
      />
      <span className='text-md mt-10 flex items-center gap-1'>
        <CiPhone />
        contact
      </span>
      <Input
        onChange={(e) => setHandler('contact', e.target.value)}
        className='border-b-1 border-x-0 border-t-0'
      />
    </div>
  );
}
