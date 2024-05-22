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
import { Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { CiEdit, CiExport, CiTurnR1 } from 'react-icons/ci';
import Link from 'next/link';
import CategoryQueryOptions from '@/service/categories/queries';
import LinkQueryOptions from '@/service/links/queries';
import { specificCategoryResponse } from '@/model/category';
import { LinkResponse } from '@/model/link';

export default function LinkDetailComponent({ linkId }: { linkId: number }) {
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, isLoading, refetch } = useLink({
    accessToken: accessToken,
    linkId: linkId,
  });
  const createdDate = dayjs(data?.data.createdAt).format('YYYY-MM-DD');
  const nowDate = new Date();
  const [editMode, setEditMode] = useState(false); //false->view, true->edit
  const { queryKey, queryFn } = LinkQueryOptions.link({
    accessToken: accessToken,
    linkId: linkId,
  });

  useEffect(() => {
    console.log(data?.data.url);
  }, [data]);

  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <CardDescription>{createdDate}</CardDescription>
        <CardTitle>{data?.data.title}</CardTitle>
      </CardHeader>
      <CardContent className=''>{data?.data.summary}</CardContent>
      <Separator />
      <CardFooter className='flex w-full flex-col justify-between gap-3'>
        <iframe
          className='relative inset-0 top-1 z-40 rounded-md border'
          sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
          src={data?.data.url}
          width='100%'
          height='200'
          title='Link Preview'
        />
        <div className='flex gap-3'>
          <LinkButton data={data} />
          <Button variant={'outline'}>
            Edit <CiEdit className='ml-2' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function LinkButton({ data }: { data: LinkResponse | undefined }) {
  return data ? (
    <Link href={data.data.url} target='_blank'>
      <Button variant={'outline'}>
        Link <CiExport className='ml-2' />
      </Button>
    </Link>
  ) : null;
}
