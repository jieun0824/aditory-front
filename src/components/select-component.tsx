import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function SelectComponent({
  disabled,
  onValueChangeHandler,
  children,
  variant,
  name,
  editMode,
  defaultValue,
}: {
  disabled?: boolean;
  onValueChangeHandler: (value: string) => void;
  children: React.ReactNode;
  variant: 'mainPage' | 'editCategory' | 'moveCategory';
  name: string;
  editMode?: boolean;
  defaultValue?: string;
}) {
  const readMode = 'focus-visible:ring-0 focus-visible:ring-offset-0';
  const variants = {
    mainPage: {
      trigger: 'w-[180px] bg-card',
      value: 'select category',
    },
    editCategory: {
      trigger: `ml-2 inline-flex h-fit w-fit items-center rounded-full border bg-inherit px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors ${!editMode && readMode}`,
      value: { defaultValue },
    },
    moveCategory: {
      trigger: 'bg-card',
      value: 'select category',
    },
  };
  return (
    <Select
      name={name}
      disabled={disabled ? disabled : false}
      onValueChange={onValueChangeHandler}
    >
      {variant == 'editCategory' ? (
        editMode ? (
          <SelectTrigger className={variants[variant].trigger}>
            <SelectValue placeholder={defaultValue} />
          </SelectTrigger>
        ) : (
          <Badge className='ml-2' variant={'outline'}>
            {defaultValue}
          </Badge>
        )
      ) : (
        <SelectTrigger className={variants[variant].trigger}>
          <SelectValue placeholder={variants[variant].value} />
        </SelectTrigger>
      )}
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
