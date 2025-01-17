import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import '@/styles/globals.css';
import ClientSideAmplifyLoader from './ClientSideAmplifyLoader';
import { theme } from '@/config/MaterialUITheme';
import ThemeRegistry from '@/components/materialUI/ThemeRegistry';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  applicationName: 'learnpool.pl',
  title: 'LearnPool.pl - Przejmij kontrolę nad swoją przyszłością!',
  description:
    'Zdobądź konkretne umiejętności, które pomogą Ci osiągnąć sukces w dzisiejszym cyfrowym świecie!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      style={{
        scrollBehavior: 'smooth',
      }}
    >
      <body
        className={`${poppins.className} tw-min-h-[100vh] tw-flex tw-flex-col `}
      >
        <ClientSideAmplifyLoader />
        <ThemeRegistry theme={theme} options={{ key: 'mui' }}>
          {children}
        </ThemeRegistry>
      </body>
      <GoogleAnalytics gaId="G-8DYWNT61LW" />
      <GoogleTagManager gtmId="GTM-MG9HD862" />
    </html>
  );
}
