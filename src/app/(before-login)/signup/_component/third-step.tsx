import CategoryCard from '@/app/(before-login)/signup/_component/category-card';

type Props = {
  selected: string[];
  selectedHandler: (category: string) => void;
};

export default function ThirdStep({ selected, selectedHandler }: Props) {
  const categories: string[] = [
    'development',
    'fashion',
    'travel',
    'music',
    'food',
    'money',
    'sports',
    'art',
  ];
  return (
    <>
      <h3 className='scroll-m-20 text-center text-2xl font-semibold tracking-tight'>
        Choose your interests.
      </h3>
      <p className='text-center'>
        {selected.length}/{categories.length}
      </p>
      <div className='grid w-full grid-cols-2 gap-4'>
        {categories.map((item, i) => {
          return (
            <CategoryCard
              key={i}
              category={item}
              selectedHandler={selectedHandler}
              selected={selected.includes(item)}
            />
          );
        })}
      </div>
    </>
  );
}
