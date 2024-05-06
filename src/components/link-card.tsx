'use client';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CiRead, CiUnread } from 'react-icons/ci';

export default function LinkCard({ link }: any) {
  return (
    <Card className='flex w-full cursor-pointer justify-between overflow-hidden transition hover:scale-105 dark:border-zinc-700'>
      <CardHeader>
        <CardTitle className='text-md'>{link.title}</CardTitle>
        <CardDescription className='text-xs'>{link.summary}</CardDescription>
      </CardHeader>
      <CardFooter>{link.status ? <CiRead /> : <CiUnread />}</CardFooter>
    </Card>
  );
}
