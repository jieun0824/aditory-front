import { Badge } from '@/components/ui/badge';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/model/category';
import { Select } from '@radix-ui/react-select';

export default function SelectButton({
  categoryName,
  editMode,
  categoryList,
  EditHandler,
}: {
  categoryName: string;
  editMode: boolean;
  categoryList: Category[] | undefined;
  EditHandler: (
    e: React.ChangeEvent<HTMLInputElement> | number | string,
    name: string
  ) => void;
}) {
  const readMode = 'focus-visible:ring-0 focus-visible:ring-offset-0';
  return (
    <Select
      onValueChange={(value) => {
        EditHandler(parseInt(value), 'category');
        EditHandler(
          categoryList?.filter((item) => item.categoryId === parseInt(value))[0]
            .categoryName!,
          'categoryName'
        );
      }}
    >
      {editMode ? (
        <SelectTrigger
          className={`ml-2 inline-flex h-fit w-fit items-center rounded-full border bg-inherit px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors ${!editMode && readMode}`}
        >
          <SelectValue placeholder={categoryName} />
        </SelectTrigger>
      ) : (
        <Badge className='ml-2' variant={'outline'}>
          {categoryName}
        </Badge>
      )}
      <SelectContent>
        {categoryList &&
          categoryList.map((item: any, i: number) => (
            <SelectItem value={item.categoryId} key={i}>
              {item.categoryName}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
