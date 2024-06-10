'use client';
import CategoryCard from '@/components/category-card';
import { Category, CategoryResponse } from '@/types/model/category';

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      {categories &&
        categories.map((category: any) => (
          <CategoryCard key={category.categoryId} category={category} />
        ))}
    </div>
  );
}
