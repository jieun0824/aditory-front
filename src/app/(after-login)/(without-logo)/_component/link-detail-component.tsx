'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAccessToken } from '@/lib/useAccessToken';
import { useLink } from '@/service/links/useLinkService';
import { Suspense, useEffect } from 'react';

export default function LinkDetailComponent({ linkId }: { linkId: number }) {
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, isLoading, refetch } = useLink({
    accessToken: accessToken,
    linkId: linkId,
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card className='h-full w-full'>
        <CardHeader>
          <CardDescription></CardDescription>
          <CardTitle>{data?.data.title}</CardTitle>
        </CardHeader>
        <CardContent className=''>{data?.data.summary}</CardContent>
        <Separator />
        <CardFooter className='flex justify-between'>
          <div className=''>
            <iframe
              className='relative inset-0 top-1 z-40 rounded-md border'
              sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
              src={data?.data.url}
              width='100%'
              height='200'
              title='Link Preview'
            />
          </div>
        </CardFooter>
      </Card>
    </Suspense>
  );
}
