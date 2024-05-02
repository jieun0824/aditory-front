import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiUser, CiLock } from 'react-icons/ci';
import { stateName } from '../[step]/page';

export default function FirstStep({
  setHandler,
}: {
  setHandler: (stateName: stateName, value: string | number) => void;
}) {
  return (
    <div className='w-full'>
      <span className='text-md flex items-center gap-1'>
        <CiUser />
        ID
      </span>
      <Input
        onChange={(e) => setHandler('username', e.target.value)}
        className='border-b-1 border-x-0 border-t-0'
      />
      <span className='text-md mt-10 flex items-center gap-1'>
        <CiLock />
        password
      </span>
      <Input
        onChange={(e) => setHandler('password', e.target.value)}
        className='border-b-1 border-x-0 border-t-0'
      />
    </div>
  );
}
