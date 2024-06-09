'use client';
import CategoryCard from '@/components/category-card';

export default function Categories({ categories }: any) {
  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      {categories.map((category: any) => (
        <CategoryCard key={category.categoryId} category={category} />
      ))}
    </div>
  );
}
