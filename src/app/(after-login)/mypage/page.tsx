import ProfileCard from '../../../components/profile-card';
import CategoryCard from './_component/category-card';

export default function MyPage() {
  return (
    <>
      <ProfileCard />
      <div className='grid h-full w-full grid-cols-2 gap-x-4'>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </>
  );
}
