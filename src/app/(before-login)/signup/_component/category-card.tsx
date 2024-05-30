'use client';

import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface Props {
  category: string;
  selectedHandler: (category: string) => void;
  selected: boolean;
}
export default function CategoryCard({
  category,
  selectedHandler,
  selected,
}: Props) {
  interface Images {
    [key: string]: string;
  }

  const images: Images = {
    development: 'develop',
    fashion: 'fashion',
    travel: 'travel',
    music: 'music',
    food: 'food',
    money: 'money',
    sports: 'sports',
    art: 'art',
  };

  const image: string = images[category];
  return (
    <div className='flex h-full flex-col items-center gap-2'>
      <Card
        className={`flex w-full cursor-pointer justify-center border-none bg-cover shadow-lg transition hover:scale-110 ${selected ? 'opacity-25' : ''}`}
        onClick={() => selectedHandler(category)}
      >
        <CardHeader>
          <Image
            alt={category}
            src={`/image/${image}.png`}
            width={100}
            height={100}
          />
        </CardHeader>
      </Card>
      <p className={selected ? 'opacity-25' : ''}>{category}</p>
    </div>
  );
}
