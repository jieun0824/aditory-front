'use client';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { specificCategoryResponse } from '@/model/category';
import { Suspense } from 'react';

import { CiRead, CiUnread } from 'react-icons/ci';

export default function LinkCard({
  linkList,
}: {
  linkList: specificCategoryResponse['data']['linkList'];
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {linkList &&
        linkList.map((link, i) => {
          return (
            <Card
              className='flex w-full cursor-pointer justify-between overflow-hidden transition hover:scale-105 dark:border-zinc-700'
              key={i}
            >
              <CardHeader>
                <CardTitle className='text-md'>{link.title}</CardTitle>
                <CardDescription className='text-xs'>
                  {link.summary}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {link.linkState ? <CiRead /> : <CiUnread />}
              </CardFooter>
            </Card>
          );
        })}
    </Suspense>
  );
}
