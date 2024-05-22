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
import { useLink, useUpdateLink } from '@/service/links/useLinkService';
import React, {
  InputHTMLAttributes,
  Suspense,
  useEffect,
  useState,
} from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { CiEdit, CiExport, CiTurnR1 } from 'react-icons/ci';
import Link from 'next/link';
import { LinkResponse, PatchedLink } from '@/model/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
export default function LinkDetailComponent({
  linkId,
  categoryId,
}: {
  linkId: number;
  categoryId: number;
}) {
  const { accessToken, getRefreshToken } = useAccessToken();
  const { data, isLoading, refetch } = useLink({
    accessToken: accessToken,
    linkId: linkId,
  });
  const createdDate = dayjs(data?.data.createdAt).format('YYYY-MM-DD');
  const [editMode, setEditMode] = useState<boolean>(false); //false->view, true->edit
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<number>(categoryId);
  const readMode = 'focus-visible:ring-0 focus-visible:ring-offset-0';

  const EditHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    switch (name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'summary':
        setSummary(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
        break;
      case 'category':
        setCategory(Number(e.target.value));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data?.data.title);
      setSummary(data?.data.summary);
      setUrl(data?.data.url);
      setCategory(categoryId);
    }
  }, [data]);

  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <CardDescription>
          {createdDate}
          <Badge variant={'outline'} className='ml-2'>
            category
          </Badge>
        </CardDescription>
        <CardTitle>
          <Input
            value={title}
            readOnly={!editMode}
            className={`border-none bg-card px-0 text-2xl font-semibold ${!editMode && readMode}`}
            onChange={(e) => EditHandler(e, 'title')}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={summary}
          readOnly={!editMode}
          className={`text-md border-none bg-card px-0 ${!editMode && readMode}`}
          onChange={(e) => EditHandler(e, 'summary')}
        />
      </CardContent>
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
          <EditButton
            editMode={editMode}
            setEditMode={setEditMode}
            newObject={{
              title: title,
              summary: summary,
              url: url,
              categoryId: category,
              linkId: linkId,
            }}
          />
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

function EditButton({
  editMode,
  setEditMode,
  newObject,
}: {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  newObject: PatchedLink;
}) {
  const { accessToken } = useAccessToken();
  const { mutate, isSuccess } = useUpdateLink({
    ...newObject,
    accessToken: accessToken,
  });
  return (
    <Button
      variant={editMode ? 'destructive' : 'outline'}
      onClick={() => {
        if (editMode) {
          mutate();
        }
        setEditMode(!editMode);
      }}
    >
      {editMode ? 'save' : 'Edit'} <CiEdit className='ml-2' />
    </Button>
  );
}
