'use client';

import { Button } from '@/components/ui/button';
import CategoryCard from './_component/category-card';
import { useState } from 'react';

export default function SignUp() {
  const categories: string[] = [
    'development',
    'fashion',
    'travel',
    'music',
    'food',
    'money',
    'sports',
    'art',
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const selectedHandler = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };
  return (
    <>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
        Choose your interests.
      </h3>
      <p>
        {selected.length}/{categories.length}
      </p>
      <div className='grid w-full grid-cols-2 gap-4'>
        {categories.map((item, i) => {
          return (
            <CategoryCard
              key={i}
              category={item}
              selectedHandler={selectedHandler}
              selected={selected.includes(item)}
            />
          );
        })}
      </div>
      <Button className='mt-6 rounded-2xl px-4'>Next</Button>
    </>
  );
}
