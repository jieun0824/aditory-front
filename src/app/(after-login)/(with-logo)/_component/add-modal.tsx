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
import { useEffect, useState } from 'react';
import useCategories from '@/app/store/useCategories';
import useToken from '@/app/store/useToken';

export default function AddModal() {
  const categories = useCategories((state: any) => state.categories);
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState(0);
  //const token = useToken((state: any) => state.token);

  let userInfo = { accessToken: '' };
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  }

  const getPost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/links`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          autoComplete: false, // 아직 구현 안됨
          title: title,
          summary: description,
          url: localStorage.getItem('url')?.toString(),
          categoryId: category,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      router.back();
    } catch (error) {
      alert("There's something wrong");
      console.error(error);
    }
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <Label htmlFor='description'>Description / summary</Label>
                <Input
                  id='description'
                  placeholder='add title of the link'
                  className='border-none bg-card'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <Label htmlFor='category'>Category</Label>

                <Select
                  onValueChange={(value) => {
                    setCategory(
                      categories.filter(
                        (item) => item.categoryName === value
                      )[0].categoryId
                    );
                  }}
                >
                  <SelectTrigger className='w-[180px] bg-card'>
                    <SelectValue placeholder='auto' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item, i) => (
                      <SelectItem
                        value={item.categoryName}
                        onClick={() => setCategory(item.categoryId)}
                        key={i}
                      >
                        {item.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button className='w-full rounded-xl text-white' onClick={getPost}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
