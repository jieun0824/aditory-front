import { Skeleton } from '@/components/ui/skeleton';

export default function LinkPreview() {
  return (
    <div className='flex h-1/2 w-1/2 flex-col space-y-3'>
      <Skeleton className='w-full rounded-xl' />
      <div className='h-full w-full space-y-2'>
        <Skeleton className='h-full w-full' />
        <Skeleton className='h-full w-full' />
      </div>
    </div>
  );
}
