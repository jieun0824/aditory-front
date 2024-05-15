import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ReminderCard from './reminder-card';

export default function LinkReminder() {
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
