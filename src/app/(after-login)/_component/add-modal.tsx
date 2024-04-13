'use client';
import { Button } from '@/components/ui/button';
import { IoIosClose } from 'react-icons/io';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function AddModal() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <Card className='w-full max-w-md'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Add Link</CardTitle>
          <Button
            onClick={onClickClose}
            className='cursor-pointer bg-card transition hover:scale-110 hover:bg-card'
          >
            <IoIosClose size={40} className='dark:text-white' />
          </Button>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  placeholder='add title of the link'
                  className='border-none bg-card'
                  autoFocus
                />
              </div>
              <div className='flex items-center gap-2'>
                <Label htmlFor='description'>Description / summary</Label>
                <Input
                  id='description'
                  placeholder='add title of the link'
                  className='border-none bg-card'
                />
              </div>
              <div className='flex items-center gap-2'>
                <Label htmlFor='category'>Category</Label>
                <Select>
                  <SelectTrigger className='w-[180px] bg-card'>
                    <SelectValue placeholder='auto' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>Sports</SelectItem>
                    <SelectItem value='dark'>Fashion</SelectItem>
                    <SelectItem value='system'>Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button className='w-full rounded-xl text-white'>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
