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

export default function SearchBar() {
  return (
    <div className='flex w-full items-center gap-2'>
      <SelectOption />
      <Input placeholder='Search' />
      <Button variant={'secondary'}>
        <CiSearch />
      </Button>
    </div>
  );
}

function SelectOption() {
  return (
    <Select>
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
}
