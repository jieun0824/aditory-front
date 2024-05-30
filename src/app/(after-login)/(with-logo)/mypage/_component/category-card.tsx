'use client';
import { Card, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import LinkPreview from './link-preview';

function CategoryCard({ category }: any) {
  return (
    <Link
      href={`/category/${category.categoryId}`}
      className='h-full min-h-52 w-full'
    >
      <Card className='h-3/4 border-none'>
        <CardHeader>{category.linkCount !== 0 && <LinkPreview />}</CardHeader>
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

export default function Categories({ categories }: any) {
  return (
    <>
      {categories.map((category: any) => (
        <CategoryCard key={category.categoryId} category={category} />
      ))}
    </>
  );
}
