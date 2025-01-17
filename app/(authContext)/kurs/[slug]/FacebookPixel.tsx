'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import Head from 'next/head';
import Image from 'next/image';

interface Props {
  id: string;
}

export default function FacebookPixel({ id }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageview = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window.fbq('track', 'PageView');
  };

  useEffect(() => {
    if (!id) return;

    pageview();
  }, [pathname, searchParams, id]);

  if (!id) return null;

  return (
    <>
      <Head>
        <noscript>
          <Image
            alt="facebook pixel element"
            height="1"
            width="1"
            style={{
              display: 'none',
            }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${id}');
            fbq('track', 'PageView');
            <!-- End Meta Pixel Code -->
          `,
        }}
      />
    </>
  );
}
