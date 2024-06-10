import {
  CategoryResponse,
  InfiniteResponse,
  InfiniteResponseData,
} from '@/types/model/category';
import { OptionButton } from '@/app/(after-login)/(with-logo)/ideas/_component/default-component';
import CategoryCard from '@/components/category-card';

interface CategoryComponentProps {
  data: InfiniteResponseData;
  accessToken: string;
  myLikes: number[];
}

export default function CategoryComponent({
  data,
  accessToken,
  myLikes,
}: CategoryComponentProps) {
  return (
    <>
      {data.pages[0].data.categoryList.length > 0 ? (
        data.pages.map((page: CategoryResponse) => {
          return page.data.categoryList.map((category) => (
            <CategoryCard category={category} key={category.categoryId}>
              <OptionButton
                accessToken={accessToken}
                likeCount={category.likeCount!}
                categoryId={category.categoryId}
                isMyLike={myLikes.includes(category.categoryId)}
              />
            </CategoryCard>
          ));
        })
      ) : (
        <p>nothing</p>
      )}
    </>
  );
}
