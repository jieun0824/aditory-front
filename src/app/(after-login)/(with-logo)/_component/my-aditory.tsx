'use client';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import useAditoryPower, { AditoryPower } from '@/lib/useAditoryPower';
import Image from 'next/image';

function AditoryProgressBar({
  value,
  left,
  aditoryPowerStage,
}: {
  value: number;
  left: string;
  aditoryPowerStage: number;
}) {
  return (
    <div className='my-4 rounded-lg bg-card p-6 shadow-md'>
      <Progress value={value} className='bg-zinc-200 dark:bg-gray-600' />
      <Badge variant={'outline'}>
        <span className='text-primary'>{left} </span>
        power is left until next step {AditoryPower[aditoryPowerStage + 1]}
      </Badge>
    </div>
  );
}

export default function MyAditory() {
  const [aditoryPowerStage, image, aditoryPower, aditoryPowerRatio, left] =
    useAditoryPower();
  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        My aditory
      </p>
      <div className='flex w-full flex-col items-center justify-center rounded-md'>
        <Image
          src={image}
          alt={AditoryPower[aditoryPowerStage]}
          width={180}
          height={25}
          unoptimized
        />
        <p className='font-bold'>
          Lv{aditoryPowerStage + 1}. {AditoryPower[aditoryPowerStage]}
        </p>
        <p className='text-sm font-light'>{AditoryPower[aditoryPowerStage]}</p>
      </div>
      <AditoryProgressBar
        value={aditoryPowerRatio}
        left={left}
        aditoryPowerStage={aditoryPowerStage}
      />
    </div>
  );
}
