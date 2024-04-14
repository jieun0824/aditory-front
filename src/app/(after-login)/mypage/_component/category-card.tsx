import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function CategoryCard() {
  return (
    <Link href={'/category/1'}>
      <Card className='w-full'>
        <CardHeader>
          {/* <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
      </Card>
      <div className='flex flex-col gap-1 p-2'>
        <Label htmlFor='category' className='font-medium'>
          categoryName
        </Label>
        <Label htmlFor='length' className='text-xs'>
          3 links
        </Label>
      </div>
    </Link>
  );
}
