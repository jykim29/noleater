import { Button } from '../common';

export default function KebabMenuButton({
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button
      className="pointer-fine:hover:bg-gray-20 h-8 w-8 border-none bg-[url(/assets/icons/kebab_menu.svg)] bg-center bg-no-repeat p-0"
      {...rest}
    >
      <span className="sr-only">더보기</span>
    </Button>
  );
}
