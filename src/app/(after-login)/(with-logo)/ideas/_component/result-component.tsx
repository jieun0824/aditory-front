'use client';

import { useAccessToken } from '@/lib/useAccessToken';
import { usePublic, useRandom } from '@/service/categories/useCategoryService';
import { useMyLikes } from '@/service/user/useUserService';
import DefaultComponent from './default-component';

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data: allCategories } = usePublic({ accessToken: accessToken });
  const { data: myLikes } = useMyLikes({ accessToken: accessToken });
  const { data: randomPublic } = useRandom({ accessToken: accessToken });
  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      <DefaultComponent
        allCategories={allCategories}
        myLikes={myLikes}
        randomPublic={randomPublic}
        accessToken={accessToken}
      />
    </div>
  );
}
