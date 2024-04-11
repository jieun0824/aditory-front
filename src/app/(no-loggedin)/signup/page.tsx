import CategoryCard from './_component/category-card';

export default function SignUp() {
  const categories: string[] = [
    '개발',
    '패션',
    '여행',
    '음악',
    '요리',
    '금융',
    '운동',
    '미술',
  ];
  return (
    <>
      <div>
        <p>관심 분야를 선택해주세요!</p>
        <p>어디토리가 직접 분류해줍니다</p>
      </div>
      <div className='grid w-full grid-cols-2 gap-4'>
        {categories.map((item, i) => {
          return <CategoryCard key={i} category={item} />;
        })}
      </div>
    </>
  );
}
