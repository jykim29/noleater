'use client';

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>{createPortal(children, document.querySelector(selector) as Element)}</>
  );
}
