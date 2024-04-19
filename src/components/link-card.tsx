'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LinkCard() {
  return (
    <Card className='w-full cursor-pointer overflow-hidden transition hover:scale-105 dark:border-zinc-700'>
      <CardHeader>
        <CardTitle className='text-md'>Card Title</CardTitle>
        <CardDescription className='text-xs'>Card Description</CardDescription>
      </CardHeader>
    </Card>
  );
}
