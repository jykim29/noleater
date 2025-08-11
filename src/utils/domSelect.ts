import isBrowserEnv from './isBrowserEnv';

export function el(selector: string, root: Document | Element = document) {
  if (!isBrowserEnv()) return null;
  return root.querySelector(selector);
}

export function els(selector: string, root: Document | Element = document) {
  if (!isBrowserEnv()) return null;
  return root.querySelectorAll(selector);
}
