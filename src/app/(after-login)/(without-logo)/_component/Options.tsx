'use client';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { Button } from '../../../../components/ui/button';
import { useAccessToken } from '@/lib/useAccessToken';
import { useDeleteLink } from '@/service/links/useLinkService';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';
import Link from 'next/link';
import LinkQueryOptions from '@/service/links/queries';
import CategoryQueryOptions from '@/service/categories/queries';
import { useParams } from 'next/navigation';

export function Options({ linkId, show }: { linkId: number; show: boolean }) {
  return (
    <div
      className={`${show ? '' : 'hidden'} absolute right-0 top-0 flex h-full w-[35%] gap-2 transition-opacity`}
    >
      <AlertDialog>
        <AlertDialogTrigger className='w-full'>
          <Button variant={'destructive'} className='h-full w-full shadow'>
            <CiTrash />
          </Button>
        </AlertDialogTrigger>
        <DeleteContinue linkId={linkId} />
      </AlertDialog>
      {/* edit */}
      <Link href={`/category/${linkId}/edit`} className='w-full'>
        <Button className='h-full w-full shadow' variant={'outline'}>
          <CiEdit />
        </Button>
      </Link>
    </div>
  );
}

export function DeleteContinue({ linkId }: { linkId: number }) {
  const { accessToken, getRefreshToken } = useAccessToken();
  const params = useParams<{ categoryId: string }>();
  const { queryFn } = LinkQueryOptions.deleteLink({
    accessToken: accessToken,
    linkId: linkId,
    categoryId: parseInt(params.categoryId),
  });
  const { queryKey } = CategoryQueryOptions.specific({
    accessToken: accessToken,
    categoryId: parseInt(params.categoryId),
  });
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Continue to delete?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete your link. Click Continue to continue.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() =>
            queryFn().then((response) => {
              console.log(response);
            })
          }
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
