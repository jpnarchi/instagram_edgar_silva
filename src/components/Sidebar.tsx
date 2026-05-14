import type { ComponentType } from 'react';
import {
  HomeIcon,
  SearchIcon,
  CompassIcon,
  ReelsIcon,
  MessageIcon,
  HeartIcon,
  PlusSquareIcon,
  MenuIcon,
  SunIcon,
  MoonIcon,
} from './Icons';
import { profile } from '../data';

type NavItem = {
  key: string;
  label: string;
  icon: ComponentType<{ filled?: boolean; size?: number }>;
};

const items: NavItem[] = [
  { key: 'home', label: 'Inicio', icon: HomeIcon },
  { key: 'search', label: 'Búsqueda', icon: SearchIcon },
  { key: 'explore', label: 'Explorar', icon: CompassIcon },
  { key: 'reels', label: 'Reels', icon: ReelsIcon },
  { key: 'messages', label: 'Mensajes', icon: MessageIcon },
  { key: 'notifications', label: 'Notificaciones', icon: HeartIcon },
  { key: 'create', label: 'Crear', icon: PlusSquareIcon },
];

type Props = {
  active: string;
  onChange: (k: string) => void;
  dark: boolean;
  onToggleDark: () => void;
};

export function Sidebar({ active, onChange, dark, onToggleDark }: Props) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-[72px] xl:w-[244px] flex-col border-r border-ig-border bg-white dark:bg-black dark:border-ig-dark-border px-3 py-5">
      {/* Logo */}
      <div className="px-2 mb-8 flex items-center xl:justify-start justify-center">
        <span className="hidden xl:block font-logo text-[28px] leading-none text-ig-text dark:text-ig-dark-text tracking-tight">
          Edgar Silva
        </span>
        <span className="xl:hidden text-[26px]" aria-hidden>
          <Logomark />
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {items.map((it) => {
          const isActive = it.key === active;
          const Icon = it.icon;
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`group flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06] no-tap-highlight ${
                isActive ? 'font-bold' : 'font-normal'
              }`}
            >
              <span className="transition-transform group-active:scale-[0.92]">
                <Icon filled={isActive} size={26} />
              </span>
              <span className="hidden xl:inline text-[16px] leading-none text-ig-text dark:text-ig-dark-text">
                {it.label}
              </span>
            </button>
          );
        })}

        {/* Profile pill */}
        <button
          onClick={() => onChange('profile')}
          className={`group flex items-center gap-4 rounded-lg px-3 py-3 mt-1 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06] no-tap-highlight ${
            active === 'profile' ? 'font-bold' : 'font-normal'
          }`}
        >
          <span
            className={`relative h-7 w-7 rounded-full overflow-hidden ring-2 transition ${
              active === 'profile'
                ? 'ring-ig-text dark:ring-ig-dark-text'
                : 'ring-transparent'
            }`}
          >
            <img
              src={profile.avatar}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </span>
          <span className="hidden xl:inline text-[16px] leading-none text-ig-text dark:text-ig-dark-text">
            Perfil
          </span>
        </button>
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1">
        <button
          onClick={onToggleDark}
          className="flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] no-tap-highlight"
        >
          {dark ? <SunIcon size={26} /> : <MoonIcon size={26} />}
          <span className="hidden xl:inline text-[16px]">
            {dark ? 'Modo claro' : 'Modo oscuro'}
          </span>
        </button>
        <button className="flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] no-tap-highlight">
          <MenuIcon size={26} />
          <span className="hidden xl:inline text-[16px]">Más</span>
        </button>
      </div>
    </aside>
  );
}

function Logomark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="lm" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor="#f09433" />
          <stop offset=".5" stopColor="#dc2743" />
          <stop offset="1" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#lm)" />
      <path
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        d="M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"
      />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="white" strokeWidth="1.7" />
      <circle cx="17.4" cy="6.6" r="1" fill="white" />
    </svg>
  );
}
