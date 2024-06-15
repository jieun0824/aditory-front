'use client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect, Suspense } from 'react';

type LinkMetadata = {
  ogImage: string;
  ogTitle: string;
  ogUrl: string;
};

export default function LinkPreview({ prevLinks }: { prevLinks: string[] }) {
  const [ogData, setOgData] = useState<LinkMetadata[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getOgData = async (externalUrl: string) => {
    const response = await fetch(
      `/api/preview?url=${encodeURIComponent(externalUrl)}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const promises = prevLinks.map((link) => getOgData(link));
        Promise.all(promises).then(setOgData);
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [prevLinks]);

  if (!ogData) {
    return (
      <div className='grid h-full w-full grid-cols-2 grid-rows-2 gap-2'>
        <Skeleton className='h-full w-full border border-bgColor' />
        <Skeleton className='h-full w-full' />
        <Skeleton className='h-full w-full' />
        <Skeleton className='h-full w-full' />
      </div>
    );
  }

  if (!loading && prevLinks.length === 0) {
    return (
      <div className='flex h-full w-full justify-center'>
        <Badge
          className='border-none text-center text-foreground/20'
          variant={'outline'}
        >
          No links found
        </Badge>
      </div>
    );
  }

  return (
    <div className='grid h-full w-full grid-cols-2 grid-rows-2 gap-2'>
      {ogData.map((meta, index) => (
        <div
          className='h-full rounded-xl object-cover shadow'
          key={index + meta.ogImage}
        >
          <img
            alt={meta.ogTitle}
            src={meta.ogImage}
            className='h-full w-full rounded-xl object-cover shadow'
          />
        </div>
      ))}
    </div>
  );
}
