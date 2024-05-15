import MyAditory from './_component/my-aditory';
import LinkInput from './_component/link-input';
import LinkReminder from './_component/link-reminder';

export default function Home() {
  return (
    <div className='flex w-full flex-col gap-10'>
      <LinkInput />
      <LinkReminder />
      <MyAditory />
    </div>
  );
}
