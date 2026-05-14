import { highlights } from '../data';
import { PlusSquareIcon } from './Icons';

export function Highlights() {
  return (
    <section className="px-4 md:px-10 pb-6 md:pb-8">
      <ul className="flex gap-4 md:gap-7 overflow-x-auto scrollbar-none -mx-1 px-1">
        {highlights.map((h) => (
          <li key={h.label} className="shrink-0">
            <button className="flex flex-col items-center gap-2 group">
              <span className="relative h-[68px] w-[68px] md:h-[88px] md:w-[88px] rounded-full p-[2px] bg-ig-border dark:bg-ig-dark-border group-hover:bg-black/40 dark:group-hover:bg-white/40 transition">
                <span className="block h-full w-full rounded-full bg-white dark:bg-black p-[2px]">
                  <img
                    src={h.cover}
                    alt={h.label}
                    draggable={false}
                    className="h-full w-full rounded-full object-cover filter group-hover:brightness-95"
                  />
                </span>
              </span>
              <span className="text-[12px] text-ig-text dark:text-ig-dark-text">
                {h.label}
              </span>
            </button>
          </li>
        ))}
        <li className="shrink-0">
          <button className="flex flex-col items-center gap-2 group">
            <span className="h-[68px] w-[68px] md:h-[88px] md:w-[88px] rounded-full border border-ig-border dark:border-ig-dark-border grid place-items-center text-ig-text dark:text-ig-dark-text group-hover:bg-black/[0.03] dark:group-hover:bg-white/[0.06]">
              <PlusSquareIcon size={28} />
            </span>
            <span className="text-[12px] text-ig-text dark:text-ig-dark-text">
              Nueva
            </span>
          </button>
        </li>
      </ul>
    </section>
  );
}
