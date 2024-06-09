import { Category } from '@/types/model/category';
import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import LinkPreview from '@/app/(after-login)/(with-logo)/mypage/_component/link-preview';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { IoIosLink } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { FaLink } from 'react-icons/fa';

export default function CategoryCard({
  category,
  accessToken,
  isMyLike,
  children,
}: {
  category: Category;
  accessToken?: string;
  isMyLike?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className='h-full min-h-64 w-full'>
      <Card
        className='h-3/4 cursor-pointer border-none'
        onClick={() => router.push(`/category/${category.categoryId}`)}
      >
        <CardHeader>
          <LinkPreview prevLinks={category.prevLinks ?? []} />
        </CardHeader>
      </Card>
      <ChildProvider OptionNode={children} linkCount={category.linkCount}>
        <Label
          htmlFor='category'
          className='cursor-pointer font-medium'
          onClick={() => router.push(`/category/${category.categoryId}`)}
        >
          {category.categoryName}
        </Label>
      </ChildProvider>
    </div>
  );
}

function ChildProvider({
  children,
  OptionNode,
  linkCount,
}: {
  children?: React.ReactNode;
  OptionNode?: React.ReactNode;
  linkCount: number;
}) {
  if (!OptionNode) {
    return (
      <div className='mt-1 flex items-center justify-items-start gap-1'>
        {children}
        <Badge className='gap-1 text-xs' variant={'outline'}>
          <FaLink />
          {linkCount}
        </Badge>
      </div>
    );
  }
  return (
    <div>
      <div className='mt-1 flex items-center justify-items-start gap-1'>
        {children}
      </div>
      <div className='grid grid-cols-2 grid-rows-2'>
        <Badge className='gap-1 border-none p-0 text-xs' variant={'outline'}>
          <FaLink />
          {linkCount}
        </Badge>
        {OptionNode}
      </div>
    </div>
  );
}
