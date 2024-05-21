'use client';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { specificCategoryResponse } from '@/model/category';
import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CiRead, CiUnread } from 'react-icons/ci';
import { Options } from './Options';

export default function LinkCard({
  linkList,
}: {
  linkList: specificCategoryResponse['data']['linkList'];
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {linkList &&
        linkList.map((link, i) => {
          return <LinkCardComponent key={i} link={link} />;
        })}
    </Suspense>
  );
}

export function LinkCardComponent({
  link,
}: {
  link: specificCategoryResponse['data']['linkList'][0];
}) {
  type position = { start: number; end: number } | null;
  const ref = useRef(null);
  const [position, setPosition] = useState<position>(null);
  const [show, setShow] = useState(false);
  const [goBack, setGoBack] = useState(false);

  useEffect(() => {
    //if you want to show options
    if (position && position.start - position.end > 40) {
      setGoBack(false);
      setShow(true);
    }

    //if you want to go back
    if (show && position && position.end - position.start > 40) {
      setGoBack(true);
      setShow(false);
    }

    console.log(
      `show: ${show}, goBack: ${goBack}, positionx: ${position?.start}, positiony: ${position?.end}`
    );
  }, [position]);

  return (
    <div className={`relative w-full`}>
      <Card
        style={{
          transform:
            show && goBack == false ? 'translate(-40%, 0)' : 'translate(0, 0)',
          transition: 'transform 0.1s ease',
        }}
        draggable={false}
        className={`w-full} flex cursor-pointer justify-between overflow-hidden transition hover:scale-105 dark:border-zinc-700`}
        ref={ref}
        onMouseDown={(e) => {
          setPosition({ start: e.clientX, end: e.clientX });
        }}
        onMouseUp={(e) => {
          if (position) {
            setPosition({ ...position, end: e.clientX });
          }
        }}
      >
        <CardHeader>
          <CardTitle className='text-md'>{link.title}</CardTitle>
          <CardDescription className='text-xs'>{link.summary}</CardDescription>
        </CardHeader>
        <CardFooter>{link.linkState ? <CiRead /> : <CiUnread />}</CardFooter>
      </Card>
      <Options linkId={link.linkId} show={show} />
    </div>
  );
}
