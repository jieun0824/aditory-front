'use client';

import { cloneElement, useEffect } from 'react';
import { useStorage } from '../useStorage';
import { usePathname } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useIsLoggedIn from '@/lib/useIsLoggedIn';

export default function CheckAccess({
  children,
}: {
  children: React.ReactElement;
}) {
  const { userInfo, removeUserInfo } = useStorage();
  const pathName = usePathname();
  const isNotLoggedIn = useIsLoggedIn((state: any) => state.isLoggedIn);
  const setIsNotLoggedIn = useIsLoggedIn((state: any) => state.setIsLoggedIn);
  const isEmptyObj = (obj: any) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };
  const limitAccess = ['/mypage', '/', '/ideas'];
  useEffect(() => {
    console.log(Date.now());
    if (
      (isEmptyObj(userInfo) ||
        (userInfo && userInfo.refreshTokenExpires! <= Date.now())) &&
      limitAccess.includes(pathName)
    ) {
      console.log(`isLoggedIn: ${isNotLoggedIn}`);
      setIsNotLoggedIn(true);
    } else {
      console.log(`isLoggedIn: ${isNotLoggedIn}`);
      setIsNotLoggedIn(false);
    }
  }, [userInfo, pathName]);
  return (
    <>
      {isNotLoggedIn && <SessionExpires />}
      {cloneElement(children, { isLoggedIn: isNotLoggedIn })}
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
      <Link href={'/splash'}>
        <Button variant={'destructive'}>Login</Button>
      </Link>
    </Alert>
  );
}
