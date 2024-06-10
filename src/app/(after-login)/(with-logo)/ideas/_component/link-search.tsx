import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InfiniteLinkResponse } from '@/types/model/link';
import Link from 'next/link';

interface LinkComponentProps {
  data: InfiniteLinkResponse;
}

export default function LinkComponent({ data }: LinkComponentProps) {
  return (
    <>
      {data.pages[0].data.linkList.length > 0 ? (
        data.pages.map((page) => {
          return page.data.linkList.map((link) => (
            <div className='relative w-full' key={link.linkId}>
              <Link href={`/link/${link.linkId}`} draggable={false}>
                <Card
                  draggable={false}
                  className='flex w-full cursor-pointer justify-between overflow-hidden transition hover:scale-105 dark:border-zinc-700'
                >
                  <CardHeader>
                    <CardTitle className='text-md'>{link.title}</CardTitle>

                    <CardDescription className='text-xs'>
                      {link.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
          ));
        })
      ) : (
        <p>nothing</p>
      )}
    </>
  );
}
