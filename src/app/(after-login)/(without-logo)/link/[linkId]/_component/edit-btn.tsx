import { Button } from '@/components/ui/button';
import { useAccessToken } from '@/lib/useAccessToken';
import { useUpdateLink } from '@/service/links/useLinkService';
import { PatchedLink } from '@/types/model/link';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';

export default function EditButton({
  editMode,
  newObject,
}: {
  editMode: boolean;
  newObject: PatchedLink;
}) {
  const { accessToken } = useAccessToken();
  const pathName = useParams();
  const router = useRouter();
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
          router.push(`/link/${pathName.linkId}`);
        } else {
          router.push(`/link/${pathName.linkId}?editMode=true`);
        }
      }}
    >
      {editMode ? 'save' : 'Edit'} <CiEdit className='ml-2' />
    </Button>
  );
}
