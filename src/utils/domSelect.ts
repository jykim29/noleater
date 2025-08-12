import isBrowserEnv from './isBrowserEnv';

export function el(selector: string, root: Document | Element | null = null) {
  if (!isBrowserEnv()) return null;
  return (root ?? document).querySelector(selector);
}

export function els(selector: string, root: Document | Element | null = null) {
  if (!isBrowserEnv()) return null;
  return (root ?? document).querySelectorAll(selector);
}
