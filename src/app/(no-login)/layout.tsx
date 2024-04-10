export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-dvh w-dvw flex-col items-center justify-between text-sm'>
      <div className='flex flex-1 items-center'>{children}</div>
    </div>
  );
}
