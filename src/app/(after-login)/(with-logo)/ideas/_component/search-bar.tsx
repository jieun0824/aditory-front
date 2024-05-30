import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CiSearch } from 'react-icons/ci';

export default function SearchBar() {
  return (
    <div className='flex w-full items-center gap-2'>
      <Input placeholder='Search' />
      <Button variant={'secondary'}>
        <CiSearch />
      </Button>
    </div>
  );
}
