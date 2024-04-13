import Header from './_component/header';
import NavBar from './_component/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex min-h-dvh w-screen flex-col items-center justify-center'>
      <Header />
      <main className='flex h-full w-full max-w-md flex-col items-center justify-center px-4 py-16'>
        {children}
      </main>
      <NavBar />
    </div>
  );
}
