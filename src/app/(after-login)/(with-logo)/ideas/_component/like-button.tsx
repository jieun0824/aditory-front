import { Badge } from '@/components/ui/badge';
import { FcLike } from 'react-icons/fc';

export default function LikeButton({ likeCount }: { likeCount: number }) {
  return (
    <button className='flex flex-col items-center'>
      <FcLike size={20} />
      <Badge variant={'outline'}>{likeCount}</Badge>
    </button>
  );
}
