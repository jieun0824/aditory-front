import { Label } from '@/components/ui/label';
import ProfileCard from '../../../../components/profile-card';
import { MdLibraryBooks } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import Categories from './_component/category-card';

export default function MyPage() {
  return (
    <>
      <ProfileCard />
      <div className='flex w-full justify-between'>
        <div className='flex items-center gap-2 text-left'>
          <MdLibraryBooks className='text-md' />
          <Label className='text-md font-semibold'>My Categories</Label>
        </div>
        <div className='flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-60'>
          <FaCirclePlus className='text-primary' />
          <span className='text-xs'>add new category</span>
        </div>
      </div>
      <div className='grid h-full w-full grid-cols-2 gap-x-4'>
        <Categories />
      </div>
    </>
  );
}
