/**
 * Renders a main content area with consistent layout and spacing.
 *
 * @param children - The content to display within the main area
 */
export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col gap-3 px-4 pt-2 pb-20">{children}</main>
  );
}
