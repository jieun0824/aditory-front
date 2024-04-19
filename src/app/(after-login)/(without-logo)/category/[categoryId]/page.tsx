import LinkCard from '@/components/link-card';
import { Label } from '@/components/ui/label';

export default function CategoryDetailPage() {
  return (
    <div className='flex h-full min-h-dvh w-full flex-col items-center gap-4'>
      <Label htmlFor='categoryName' className='text-2xl font-semibold'>
        category name
      </Label>
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
    </div>
  );
}
