'use client';

/**
 * Renders a bottom sheet UI component fixed to the bottom of the viewport.
 *
 * Displays a draggable indicator bar at the top and renders the provided content within a styled container.
 *
 * @param children - The content to display inside the bottom sheet
 * @returns The rendered bottom sheet element
 */
export default function BottomSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute bottom-0 w-full rounded-t-2xl bg-white shadow-lg">
      <div className="flex h-6 w-full items-center justify-center">
        <span className="bg-gray-40 h-1 w-14 rounded-full"></span>
      </div>
      <div className="px-7 pt-4 pb-7">{children}</div>
    </div>
  );
}
