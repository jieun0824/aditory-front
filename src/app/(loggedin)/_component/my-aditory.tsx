import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

function AditoryProgressBar() {
  return (
    <div className='my-4 rounded-lg bg-card p-6 shadow-md'>
      <Progress value={10} className='bg-zinc-200 dark:bg-gray-600' />
    </div>
  );
}

export default function MyAditory() {
  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        My aditory
      </p>
      <div className='flex w-full flex-col items-center justify-center rounded-md'>
        <Image
          src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Wood.png'
          alt='Wood'
          width={180}
          height={25}
        />
        <p className='font-bold'>Lv1. wood</p>
        <p className='text-sm font-light'>wood</p>
      </div>
      <AditoryProgressBar />
    </div>
  );
}
