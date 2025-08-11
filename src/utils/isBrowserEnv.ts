export default function isBrowserEnv() {
  return (
    typeof window !== 'undefined' && typeof window.document !== 'undefined'
  );
}
