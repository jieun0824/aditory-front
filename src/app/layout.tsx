import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import ReactQueryProviders from '@/lib/provider/query-provider';
import CheckAccess from '@/lib/provider/check-access';

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
  show: boolean;
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
      </body>
    </html>
  );
}
