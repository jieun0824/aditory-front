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
        <CardTitle>{!nothing ? title : ''}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{!nothing ? description : ''}</p>
      </CardContent>
      <CardFooter>
        <p>{!nothing ? additional : ''}</p>
      </CardFooter>
    </Card>
  );
}
