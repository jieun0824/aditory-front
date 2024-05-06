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

export default function CategoryCard({ category }: any) {
  return (
    <Link
      href={`/category/${category.categoryId}`}
      className='h-full min-h-52 w-full'
    >
      <Card className='h-3/4 border-none'>
        <CardHeader>
          {/* <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
      </Card>
      <div className='flex h-1/4 flex-col gap-1 p-2'>
        <Label htmlFor='category' className='font-medium'>
          {category.categoryName}
        </Label>
        <Label htmlFor='length' className='text-xs'>
          {category.linkCount} links
        </Label>
      </div>
    </Link>
  );
}
