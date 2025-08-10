/**
 * Renders its children inside a modal container centered in the viewport.
 *
 * The modal applies styling for centering, width constraints, rounded corners, and a white background.
 *
 * @param children - The content to display within the modal
 * @returns A JSX element containing the centered modal with its children
 */
export default function CenterModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[90%] min-w-xs -translate-1/2 rounded-2xl bg-white px-3 py-4">
      {children}
    </div>
  );
}
