import { Badge } from '@/components/ui/badge';
import { CiBookmark } from 'react-icons/ci';

export default function CopyButton() {
  return (
    <button className='flex flex-col items-center'>
      <CiBookmark size={20} />
      <Badge variant={'outline'}>Copy</Badge>
    </button>
  );
}
