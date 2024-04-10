export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-bgColor flex h-dvh w-dvw flex-col items-center justify-between text-sm'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        {children}
      </div>
    </div>
  );
}
