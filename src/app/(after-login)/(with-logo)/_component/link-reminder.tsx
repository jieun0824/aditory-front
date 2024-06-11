'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ReminderCard from './reminder-card';
import { useAccessToken } from '@/lib/useAccessToken';
import { useLinkReminder } from '@/service/links/useLinkService';
import { Link } from '@/types/model/link';
import { Skeleton } from '@/components/ui/skeleton';
import DotLoader from 'react-spinners/DotLoader';
import LinkQueryOptions from '@/service/links/queries';
import { useEffect } from 'react';

export default function LinkReminder() {
  const { accessToken } = useAccessToken();
  const { queryKey, queryFn } = LinkQueryOptions.linkReminder({ accessToken });
  const { data, isLoading, isError, error } = useLinkReminder({
    accessToken: accessToken,
  });

  useEffect(() => {
    console.log(error);
  }, [isError]);

  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        link reminder
      </p>
      <Carousel>
        {isLoading ? (
          <Skeleton className='flex h-[200px] w-full items-center justify-center bg-primary/50'>
            <DotLoader size={40} className='border-input' color='white' />
          </Skeleton>
        ) : isError ? (
          <ReminderCard nothing={true} />
        ) : (
          <CarouselContent>
            {data?.data.linkList.length != undefined &&
            data?.data.linkList.length! <= 3
              ? data?.data.linkList.map((link: Link) => {
                  return (
                    <CarouselItem key={link.linkId}>
                      <ReminderCard
                        title={link.title}
                        description={link.summary}
                        additional={link.url}
                        nothing={false}
                      />
                    </CarouselItem>
                  );
                })
              : data?.data.linkList.slice(0, 3).map((link: Link) => {
                  return (
                    <CarouselItem key={link.linkId}>
                      <ReminderCard
                        title={link.title}
                        description={link.summary}
                        additional={link.url}
                        nothing={false}
                      />
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
        )}
      </Carousel>
    </div>
  );
}
