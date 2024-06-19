import MyAditory from '@/app/(after-login)/(with-logo)/_component/my-aditory';
import LinkInput from '@/app/(after-login)/(with-logo)/_component/link-input';
import LinkReminder from '@/app/(after-login)/(with-logo)/_component/link-reminder';
import ImportPocket from './_component/import-pocket';

export default function Home() {
  return (
    <div className='flex w-full flex-col gap-10'>
      <LinkInput />
      <ImportPocket />
      <LinkReminder />
      <MyAditory />
    </div>
  );
}
