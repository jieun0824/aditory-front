'use client';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { useAccessToken } from '@/lib/useAccessToken';
import { useDeleteLink } from '@/service/links/useLinkService';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import DeleteAlert from '@/components/delete-alert';

export function Options({ linkId, show }: { linkId: number; show: boolean }) {
  const { accessToken } = useAccessToken();
  const params = useParams<{ categoryId: string }>();
  const { mutate } = useDeleteLink({
    accessToken: accessToken,
    linkId: linkId,
    categoryId: parseInt(params.categoryId),
  });
  return (
    <div
      className={`${show ? '' : 'hidden'} absolute right-0 top-0 flex h-full w-[35%] gap-2 transition-opacity`}
    >
      <DeleteAlert mutate={mutate} option={'link'}>
        <Button variant={'destructive'} className='h-full w-full shadow'>
          <CiTrash />
        </Button>
      </DeleteAlert>
      {/* edit */}
      <Link
        href={{ pathname: `/link/${linkId}`, query: { editMode: true } }}
        className='w-full'
      >
        <Button className='h-full w-full shadow' variant={'outline'}>
          <CiEdit />
        </Button>
      </Link>
    </div>
  );
}
