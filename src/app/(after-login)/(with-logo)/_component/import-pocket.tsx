'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAccessToken } from '@/lib/useAccessToken';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

export default function ImportPocket() {
  const [file, setFile] = useState<File | null>(null);
  const { accessToken } = useAccessToken();
  const queryClient = useQueryClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('importFile', file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/import`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        alert('File uploaded successfully!');
        queryClient.invalidateQueries({
          queryKey: ['myCategory'],
        });
        queryClient.invalidateQueries({
          queryKey: ['reminder'],
        });
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <div>
        <span className='text-md font-semibold'>Import Pocket</span>
        <Badge variant={'outline'}>
          <Link href={'http://getpocket.com/export'}>Go to POCKET</Link>
        </Badge>
      </div>
      <div className='flex w-full gap-2'>
        <Input type='file' accept='.html' onChange={handleFileChange} />
        <Button
          onClick={handleUpload}
          className='max-w-xs rounded-xl bg-input hover:bg-input/40'
        >
          Import
        </Button>
      </div>
    </div>
  );
}
