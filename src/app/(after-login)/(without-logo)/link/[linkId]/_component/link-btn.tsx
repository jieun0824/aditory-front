import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CiExport } from 'react-icons/ci';

export default function LinkButton({ url }: { url: string }) {
  return (
    url && (
      <Link href={url} target='_blank'>
        <Button variant={'outline'}>
          Link <CiExport className='ml-2' />
        </Button>
      </Link>
    )
  );
}
