interface TabProps extends React.PropsWithChildren {
  className?: string;
  tabId: string;
  ariaSelected?: boolean;
}

export default function TabButton({
  className = '',
  tabId,
  ariaSelected = false,
  children,
}: TabProps) {
  return (
    <button
      role="tab"
      data-tab-id={tabId}
      aria-selected={ariaSelected}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}
