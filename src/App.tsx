import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ProfileHeader } from './components/ProfileHeader';
import { Highlights } from './components/Highlights';
import { TabsAndGrid } from './components/TabsAndGrid';
import { PostModal } from './components/PostModal';
import { posts } from './data';
import type { Post } from './data';

export default function App() {
  const [active, setActive] = useState('profile');
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('ig-dark');
    if (saved !== null) return saved === '1';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem('ig-dark', dark ? '1' : '0');
  }, [dark]);

  const ordered = useMemo(() => posts, []);

  const currentIdx = openId === null ? -1 : ordered.findIndex((p) => p.id === openId);
  const current: Post | null = currentIdx >= 0 ? ordered[currentIdx] : null;

  return (
    <div className="min-h-screen bg-ig-bg dark:bg-ig-dark-bg text-ig-text dark:text-ig-dark-text">
      <Sidebar
        active={active}
        onChange={setActive}
        dark={dark}
        onToggleDark={() => setDark((v) => !v)}
      />

      <TopBar dark={dark} />

      <main className="md:ml-[72px] xl:ml-[244px] max-w-[975px] mx-auto pb-16">
        <ProfileHeader />
        <Highlights />
        <TabsAndGrid onOpen={(p) => setOpenId(p.id)} />
      </main>

      {current && (
        <PostModal
          post={current}
          onClose={() => setOpenId(null)}
          onPrev={() => setOpenId(ordered[currentIdx - 1]?.id ?? current.id)}
          onNext={() => setOpenId(ordered[currentIdx + 1]?.id ?? current.id)}
          hasPrev={currentIdx > 0}
          hasNext={currentIdx < ordered.length - 1}
        />
      )}

      {/* Mobile bottom nav (Instagram-style) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 h-12 bg-white dark:bg-black border-t border-ig-border dark:border-ig-dark-border flex items-center justify-around">
        <button onClick={() => setActive('home')} aria-label="Inicio">
          <HomeSm filled={active === 'home'} />
        </button>
        <button onClick={() => setActive('search')} aria-label="Buscar">
          <SearchSm />
        </button>
        <button onClick={() => setActive('create')} aria-label="Crear">
          <PlusSm />
        </button>
        <button onClick={() => setActive('reels')} aria-label="Reels">
          <ReelsSm />
        </button>
        <button onClick={() => setActive('profile')} aria-label="Perfil">
          <ProfileSm active={active === 'profile'} />
        </button>
      </nav>
    </div>
  );
}

/* — tiny mobile icons — */
const ic = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const HomeSm = ({ filled }: { filled?: boolean }) =>
  filled ? (
    <svg {...ic} fill="currentColor" stroke="none">
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" />
    </svg>
  ) : (
    <svg {...ic}>
      <path d="m22 12-10-9.5L2 12" />
      <path d="M5 9.5V22h5v-6a2 2 0 0 1 4 0v6h5V9.5" />
    </svg>
  );
const SearchSm = () => (
  <svg {...ic}>
    <circle cx="10.5" cy="10.5" r="7.5" />
    <path d="m21 21-5.6-5.6" />
  </svg>
);
const PlusSm = () => (
  <svg {...ic}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
const ReelsSm = () => (
  <svg {...ic}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M2 7.5h20" />
    <path d="M6 2 9 7.5" />
    <path d="m11 2 3 5.5" />
    <path d="m17 2-3 5.5" />
    <path d="m10 11 6 3-6 3v-6Z" fill="currentColor" stroke="none" />
  </svg>
);
const ProfileSm = ({ active }: { active?: boolean }) => (
  <span
    className={`block h-6 w-6 rounded-full overflow-hidden ring-2 ${
      active ? 'ring-current' : 'ring-transparent'
    }`}
  >
    <img src="/edgar-avatar.jpg" alt="" className="h-full w-full object-cover" />
  </span>
);
