export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-dvh w-screen flex-col items-center justify-center'>
      <main className='flex h-full w-full max-w-md flex-col items-center justify-center px-4 py-6'>
        {children}
      </main>
    </div>
  );
}
