import { HeartIcon, MessageIcon } from './Icons';

type Props = {
  dark: boolean;
};

export function TopBar({ dark: _dark }: Props) {
  return (
    <header className="md:hidden sticky top-0 z-20 flex h-12 items-center justify-between border-b border-ig-border bg-white dark:bg-black dark:border-ig-dark-border px-4">
      <span className="font-logo text-[26px] leading-none text-ig-text dark:text-ig-dark-text">
        Edgar Silva
      </span>
      <div className="flex items-center gap-4">
        <HeartIcon size={26} />
        <MessageIcon size={26} />
      </div>
    </header>
  );
}
