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
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import { useMyCategories } from '@/service/categories/useCategoryService';
import LinkButton from '@/app/(after-login)/(without-logo)/link/[linkId]/_component/link-btn';
import EditButton from '@/app/(after-login)/(without-logo)/link/[linkId]/_component/edit-btn';
import SelectButton from '@/app/(after-login)/(without-logo)/link/[linkId]/_component/select-btn';
import { useSearchParams } from 'next/navigation';
import { useOwner } from '@/lib/provider/owner-provider';

const readMode = 'focus-visible:ring-0 focus-visible:ring-offset-0';
export default function LinkDetailComponent({ linkId }: { linkId: number }) {
  const { accessToken, getRefreshToken } = useAccessToken();
  const { owner } = useOwner();
  const search = useSearchParams();
  const editMode = owner ? Boolean(search.get('editMode')) : false;
  console.log(editMode);
  const { data, isLoading, refetch } = useLink({
    accessToken: accessToken,
    linkId: linkId,
    selectFn: (data) => {
      setTitle(data.data.title);
      setSummary(data.data.summary);
      setUrl(data.data.url);
      setCategoryId(data.data.categoryId);
      setCategoryName(data.data.categoryName);
      console.log('selectFn', data);
    },
  });
  const { data: categoryList } = useMyCategories({ accessToken: accessToken });

  const createdDate = dayjs(data?.data.createdAt).format('YYYY-MM-DD');
  // const [editMode, setEditMode] = useState<boolean>(false); //false->view, true->edit
  const [title, setTitle] = useState<string>(data?.data.title);
  const [summary, setSummary] = useState<string>(data?.data.summary);
  const [url, setUrl] = useState<string>(data?.data.url);
  const [categoryId, setCategoryId] = useState<number | null>(
    data?.data.categoryId
  );
  const [categoryName, setCategoryName] = useState<string>(
    data?.data.categoryName
  );
  useEffect(() => {
    console.log(categoryName);
  }, [categoryName]);

  const EditHandler = (
    e: React.ChangeEvent<HTMLInputElement> | number | string,
    name: string
  ) => {
    switch (name) {
      case 'title':
        console.log(typeof e);
        typeof e === 'object' && setTitle(e.target.value);
        break;
      case 'summary':
        typeof e === 'object' && setSummary(e.target.value);
        break;
      case 'url':
        typeof e === 'object' && setUrl(e.target.value);
        break;
      case 'category':
        typeof e === 'number' && setCategoryId(e);
        break;
      case 'categoryName':
        typeof e === 'string' && setCategoryName(e);
        break;
      default:
        break;
    }
  };

  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <CardDescription>
          {createdDate}
          <SelectButton
            categoryName={categoryName}
            editMode={editMode}
            categoryList={categoryList?.data.categoryList}
            EditHandler={EditHandler}
          />
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
        <div className='mt-3 flex gap-3'>
          <LinkButton url={url} />
          {owner && (
            <EditButton
              editMode={editMode}
              newObject={{
                title: title,
                summary: summary,
                url: url,
                categoryId: categoryId!,
                linkId: linkId,
              }}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
