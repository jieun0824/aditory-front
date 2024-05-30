import SelectComponent from '@/components/select-component';
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
  return (
    <SelectComponent
      onValueChangeHandler={(value) => {
        EditHandler(parseInt(value), 'category');
        EditHandler(
          categoryList?.filter((item) => item.categoryId === parseInt(value))[0]
            .categoryName!,
          'categoryName'
        );
      }}
      name='categoryId'
      editMode={editMode}
      variant='editCategory'
      defaultValue={categoryName}
    >
      {categoryList &&
        categoryList.map((item: any, i: number) => (
          <SelectItem value={item.categoryId} key={i}>
            {item.categoryName}
          </SelectItem>
        ))}
    </SelectComponent>
  );
}
