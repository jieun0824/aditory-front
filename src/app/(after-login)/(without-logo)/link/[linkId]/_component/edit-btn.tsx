import { Button } from '@/components/ui/button';
import { useAccessToken } from '@/lib/useAccessToken';
import { useUpdateLink } from '@/service/links/useLinkService';
import { PatchedLink } from '@/types/model/link';
import { CiEdit } from 'react-icons/ci';

export default function EditButton({
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
