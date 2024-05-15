'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ReminderCard from './reminder-card';
import { useLinkReminder } from '@/service/links/useLinkService';
import { useStorage } from '@/lib/useStorage';
import { useAccessToken } from '@/hooks/useAccessToken';
import { useEffect } from 'react';

export default function LinkReminder() {
  // const { accessToken } = useAccessToken();
  // const { data, isLoading } = useLinkReminder({ accessToken: accessToken });
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        link reminder
      </p>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <ReminderCard />
          </CarouselItem>
          <CarouselItem>
            <ReminderCard />
          </CarouselItem>
          <CarouselItem>
            <ReminderCard />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
