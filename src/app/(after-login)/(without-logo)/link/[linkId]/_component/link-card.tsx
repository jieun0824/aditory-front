'use client';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Links, specificCategoryResponse } from '@/types/model/category';
import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CiRead, CiUnread } from 'react-icons/ci';
import { Options } from '@/app/(after-login)/(without-logo)/_component/Options';
import { Checkbox } from '@/components/ui/checkbox';
import { useOwner } from '@/lib/provider/owner-provider';

export default function LinkCard({
  linkList,
  moveCategory,
  selectMoveCategory,
  moveMode,
}: {
  linkList: specificCategoryResponse['data']['linkList'];
  moveCategory: number[];
  selectMoveCategory: (checked: boolean, categoryId: number) => void;
  moveMode: boolean;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {linkList &&
        linkList.map((link: Links) => {
          return (
            <div className='flex w-full items-center gap-3' key={link.linkId}>
              {moveMode && (
                <Checkbox
                  className='transition'
                  checked={moveCategory.includes(link.linkId)}
                  onCheckedChange={(checked: boolean) => {
                    selectMoveCategory(checked, link.linkId);
                  }}
                />
              )}
              <LinkCardComponent key={link.linkId} link={link} />
            </div>
          );
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
  const [isDrag, setIsDrag] = useState(true);
  const { owner } = useOwner();

  useEffect(() => {
    if (owner) {
      //if you want to show options
      if (position && position.start - position.end > 40) {
        setGoBack(false);
        setShow(true);
        setIsDrag(true);
      }
      //if you want to go back
      if (show && position && position.end - position.start > 40) {
        setGoBack(true);
        setShow(false);
        setIsDrag(true);
      }
    }
  }, [position]);

  return (
    <div className={`relative w-full`}>
      <Link href={isDrag ? `` : `${'/link/' + link.linkId}`} draggable={false}>
        <Card
          style={{
            transform:
              show && goBack == false
                ? 'translate(-40%, 0)'
                : 'translate(0, 0)',
            transition: 'transform 0.1s ease',
          }}
          ref={ref}
          onMouseDown={(e) => {
            setPosition({ start: e.clientX, end: e.clientX });
            setIsDrag(true);
          }}
          onMouseUp={(e) => {
            if (position) {
              setPosition({ ...position, end: e.clientX });
              //judge is drag
              if (position && position.start == position.end) {
                setIsDrag(false); //is click
              }
            }
          }}
          draggable={false}
          className={`w-full} flex cursor-pointer justify-between overflow-hidden transition hover:scale-105 dark:border-zinc-700`}
        >
          <CardHeader>
            <CardTitle className='text-md'>{link.title}</CardTitle>
            <CardDescription className='text-xs'>
              {link.summary}
            </CardDescription>
          </CardHeader>
          <CardFooter>{link.linkState ? <CiRead /> : <CiUnread />}</CardFooter>
        </Card>
      </Link>
      <Options linkId={link.linkId} show={show} />
    </div>
  );
}
