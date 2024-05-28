import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DeleteAlert({
  children,
  mutate,
  option,
}: {
  children: React.ReactNode;
  mutate: () => void;
  option: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Continue to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your {option}. Click Continue to
            continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
