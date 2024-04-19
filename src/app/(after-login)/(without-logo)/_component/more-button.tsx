'use client';
import { IoIosMore } from 'react-icons/io';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';

export default function DrawerDemo() {
  const [goal, setGoal] = useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild className='cursor-pointer'>
        <IoIosMore size={30} />
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader className='flex flex-col items-start gap-4'>
            <DrawerDescription>Category options</DrawerDescription>
            <DrawerTitle>Edit</DrawerTitle>
            <DrawerTitle>Delete</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='secondary'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
