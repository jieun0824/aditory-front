'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CiSearch } from 'react-icons/ci';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const submitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('query');
    const filter = formData.get('filter');
    if (query && filter) {
      router.push(`/ideas?query=${query}&filter=${filter}`);
    } else if (!query) {
      alert('Please enter any keyword');
    } else if (!filter) {
      alert('Please select filter');
    }
  };

  const SelectOption = () => {
    return (
      <Select name='filter'>
        <SelectTrigger className='w-[130px]'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Search by</SelectLabel>
            <SelectItem value='category'>Category</SelectItem>
            <SelectItem value='link'>Link</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  return (
    <form onSubmit={submitHandler} className='flex w-full items-center gap-2'>
      <SelectOption />
      <Input placeholder='Search' name='query' />
      <Button variant={'secondary'} type='submit'>
        <CiSearch />
      </Button>
    </form>
  );
}
