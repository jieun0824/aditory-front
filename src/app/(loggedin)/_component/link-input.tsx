import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaPlus } from 'react-icons/fa';

export default function LinkInput() {
  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        Save links
      </p>
      <div className='flex gap-2'>
        <Input
          placeholder='Link'
          className='w-full rounded-xl bg-input py-8'
          autoFocus
        />
        <Button className='max-w-xs rounded-xl bg-input py-8 hover:bg-input/40'>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}
