import RotateLoader from 'react-spinners/RotateLoader';

export default function Loading() {
  return (
    <>
      <RotateLoader
        className='animate-pulse'
        size={10}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </>
  );
}
