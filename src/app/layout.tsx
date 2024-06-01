import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { ThemeProvider } from '@/lib/provider/theme-provider';
import './globals.css';
import ReactQueryProviders from '@/lib/provider/query-provider';
import CheckAccess from '@/lib/provider/check-access';
import { Toaster } from '@/components/ui/toaster';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--noto_sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'aDitory',
  description: 'Where is my link? aDitory!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang='en'>
      <body className={notoSans.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProviders>
            <CheckAccess>{children}</CheckAccess>
          </ReactQueryProviders>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
