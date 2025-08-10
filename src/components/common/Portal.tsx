'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  selector: string;
}

/**
 * Renders children into a DOM element specified by a CSS selector using React Portal.
 *
 * @param selector - The CSS selector string identifying the target DOM element for the portal
 * @returns The portal-rendered children, or `null` if the component is not yet mounted
 */
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
