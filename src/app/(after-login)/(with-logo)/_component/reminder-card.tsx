import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  return (
    <Card className='bg-primary text-white'>
      <CardHeader>
        <CardTitle>{!nothing ? title : 'Nothing to remind'}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{!nothing ? description : 'you have read all of your links'}</p>
      </CardContent>
      <CardFooter>
        <p>{!nothing ? additional : ''}</p>
      </CardFooter>
    </Card>
  );
}
