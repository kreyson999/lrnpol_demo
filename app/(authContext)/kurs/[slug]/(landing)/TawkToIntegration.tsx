'use client';

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Props = {
  propertyId: string;
  widgetId: string;
};

const TawkToIntegration = ({ propertyId, widgetId }: Props) => {
  const tawkMessengerRef = useRef();

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return true;
  };

  const customStyle = {
    visibility: {
      desktop: {
        xOffset: 12,
        yOffset: isMobile() ? 80 : 12,
        position: 'br',
      },

      mobile: {
        xOffset: 12,
        yOffset: isMobile() ? 80 : 12,
        position: 'br',
      },
    },
  };

  const pathname = usePathname();

  useEffect(() => {
    return () => {
      const element = document.querySelector('.widget-visible');

      if (element) {
        element.remove();
      }
    };
  }, [pathname]);

  return (
    <TawkMessengerReact
      ref={tawkMessengerRef}
      propertyId={propertyId}
      customStyle={customStyle}
      widgetId={widgetId}
    />
  );
};

export default TawkToIntegration;
