'use client';

import { Fragment, cloneElement, useEffect, useState } from 'react';
import { useStorage } from '../useStorage';
import { usePathname, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckAccess({
  children,
}: {
  children: React.ReactElement;
}) {
  const { userInfo } = useStorage();
  const pathName = usePathname();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const isEmptyObj = (obj: any) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }

    return false;
  };
  const limitAccess = ['/mypage', '/'];
  useEffect(() => {
    console.log(pathName);
    if (isEmptyObj(userInfo) && limitAccess.includes(pathName)) {
      console.log('no userInfo');
      setShow(true);
    } else {
      console.log('has userInfo');
      setShow(false);
    }
  }, [userInfo, pathName]);
  return (
    <>
      {show && <SessionExpires />}
      {cloneElement(children, { show })}
    </>
  );
}

function SessionExpires() {
  return (
    <Alert
      variant='destructive'
      className='absolute left-1/2 top-1/4 z-20 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-destructive-foreground'
    >
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Logged out</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in.
      </AlertDescription>
      <Link href={'/signin'}>
        <Button variant={'destructive'}>Login</Button>
      </Link>
    </Alert>
  );
}
