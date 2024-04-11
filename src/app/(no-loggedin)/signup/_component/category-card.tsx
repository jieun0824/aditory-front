import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function CategoryCard({ category }: { category: string }) {
  interface Images {
    [key: string]: string;
  }

  const images: Images = {
    개발: 'develop',
    패션: 'fashion',
    여행: 'travel',
    음악: 'music',
    요리: 'food',
    금융: 'money',
    운동: 'sports',
    미술: 'art',
  };

  const image: string = images[category];
  return (
    <div className='flex flex-col items-center gap-2'>
      <Card
        className={`w-full cursor-pointer border-none bg-cover shadow-lg transition hover:scale-110`}
      >
        <CardHeader>
          <Image
            alt={category}
            src={`/image/${image}.png`}
            width={100}
            height={100}
          />
        </CardHeader>
      </Card>
      <p>{category}</p>
    </div>
  );
}
