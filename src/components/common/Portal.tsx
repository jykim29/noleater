'use client';

import { el } from '@/utils';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  selector: string;
}

export default function Portal({
  selector,
  children,
}: React.PropsWithChildren<PortalProps>) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const targetElement = el(selector);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !targetElement) return null;

  return <>{createPortal(children, targetElement as Element)}</>;
}
