import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaPlus } from 'react-icons/fa';
import ReminderCard from './_component/reminder-card';

function LinkInput() {
  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        Save links
      </p>
      <div className='flex gap-2'>
        <Input placeholder='Link' className='w-full bg-[#E1E1E1] p-4' />
        <Button className='max-w-xs bg-[#E1E1E1]'>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}

function LinkReminder() {
  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        link reminder
      </p>
      <ReminderCard />
    </div>
  );
}

export default function Home() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <LinkInput />
      <LinkReminder />
    </div>
  );
}
