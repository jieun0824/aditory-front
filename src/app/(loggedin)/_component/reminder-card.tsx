import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ReminderCard() {
  return (
    <Card className='bg-primary text-white'>
      <CardHeader>
        <CardTitle>title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>description</p>
      </CardContent>
      <CardFooter>
        <p>additional info</p>
      </CardFooter>
    </Card>
  );
}
