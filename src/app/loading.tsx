import DotLoader from 'react-spinners/DotLoader';

export default function Loading() {
  return (
    <div className='z-999 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-bgColor opacity-50'>
      <DotLoader
        color={'white'}
        className='text-bg-primary'
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}
