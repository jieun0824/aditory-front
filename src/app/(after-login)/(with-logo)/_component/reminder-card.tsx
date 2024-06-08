import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function ReminderCard({
  title,
  description,
  additional,
  nothing,
}: {
  title?: string;
  description?: string;
  additional?: string;
  nothing: boolean;
}) {
  if (nothing) {
    return (
      <Card className='bg-primary text-white'>
        <CardHeader>
          <CardTitle>'Nothing to remind'</CardTitle>
        </CardHeader>
        <CardContent>
          <p>you have read all of your links</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Link href={additional!} target='_blank'>
      <Card className='h-[200px] bg-primary text-white'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {description?.length! >= 100
              ? description?.slice(0, 100) + '...'
              : description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
