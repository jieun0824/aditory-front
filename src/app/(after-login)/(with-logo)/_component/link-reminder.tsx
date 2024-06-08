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

export default function LinkReminder() {
  const { accessToken } = useAccessToken();
  const { data, isLoading, isError } = useLinkReminder({
    accessToken: accessToken,
  });

  return (
    <div>
      <p className='text-md scroll-m-20 font-semibold tracking-tight'>
        link reminder
      </p>
      <Carousel>
        {isError ? (
          <Nothing />
        ) : (
          <CarouselContent>
            {data?.data.linkList.length != undefined &&
            data?.data.linkList.length <= 3
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

function Nothing() {
  return <ReminderCard nothing={true} />;
}
