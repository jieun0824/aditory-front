'use client';
import ReminderCard from './_component/reminder-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import MyAditory from './_component/my-aditory';
import LinkInput from './_component/link-input';
import useCategories from '@/app/store/useCategories';
import { useEffect } from 'react';

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

export default function Home() {
  let userInfo = { accessToken: '' };
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            Authorization: `Bearer ${userInfo.accessToken!}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data.data.categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const categories = useCategories((state: any) => state.categories);
  const setCategories = useCategories((state: any) => state.setCategories);
  return (
    <div className='flex w-full flex-col gap-10'>
      <LinkInput />
      <LinkReminder />
      <MyAditory />
    </div>
  );
}
