import ReminderCard from './_component/reminder-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import MyAditory from './_component/my-aditory';
import LinkInput from './_component/link-input';

export default function Home() {
  return (
    <div className='flex w-full flex-col gap-10'>
      <LinkInput />
      <LinkReminder />
      <MyAditory />
    </div>
  );
}

function LinkReminder() {
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
