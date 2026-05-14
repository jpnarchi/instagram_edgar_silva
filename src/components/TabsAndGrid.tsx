import { useMemo, useState } from 'react';
import type { Post, Tab } from '../data';
import { posts, tabs } from '../data';
import {
  GridIcon,
  ReelsTabIcon,
  TaggedIcon,
  HeartIcon,
  CommentIcon,
  CarouselIcon,
  ReelPlayIcon,
} from './Icons';

type Props = {
  onOpen: (p: Post) => void;
};

export function TabsAndGrid({ onOpen }: Props) {
  const [tab, setTab] = useState<Tab>('posts');

  const filtered = useMemo(() => {
    if (tab === 'reels') return posts.filter((p) => p.isReel);
    if (tab === 'tagged') return [] as Post[];
    return posts;
  }, [tab]);

  return (
    <section className="border-t border-ig-border dark:border-ig-dark-border">
      {/* Tabs */}
      <div className="flex justify-center gap-12 md:gap-16 text-[12px] tracking-[0.1em] font-semibold">
        {tabs.map((t) => {
          const active = t === tab;
          const Icon =
            t === 'posts' ? GridIcon : t === 'reels' ? ReelsTabIcon : TaggedIcon;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`group flex items-center gap-1.5 py-4 -mt-px border-t-[1.5px] transition-colors ${
                active
                  ? 'border-ig-text dark:border-ig-dark-text text-ig-text dark:text-ig-dark-text'
                  : 'border-transparent text-ig-muted dark:text-ig-dark-muted hover:text-ig-text dark:hover:text-ig-dark-text'
              }`}
            >
              <Icon size={12} />
              <span>{t.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Empty tab={tab} />
      ) : (
        <ul className="grid grid-cols-3 gap-[2px] md:gap-[4px] mt-[2px]">
          {filtered.map((p) => (
            <li key={p.id}>
              <GridItem post={p} onClick={() => onOpen(p)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function GridItem({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative block w-full aspect-square overflow-hidden bg-black/5 dark:bg-white/5 group no-tap-highlight"
    >
      <img
        src={post.image}
        alt={post.title}
        draggable={false}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:brightness-50"
      />

      {/* badges top-right */}
      <span className="absolute top-2 right-2 drop-shadow">
        {post.isReel ? (
          <ReelPlayIcon size={22} />
        ) : post.isCarousel ? (
          <CarouselIcon size={22} />
        ) : null}
      </span>

      {/* Reel views */}
      {post.isReel && (
        <span className="absolute bottom-2 left-2 flex items-center gap-1 text-white drop-shadow text-[13px] font-semibold">
          <ReelPlayIcon size={16} />
          {Math.round(post.likes / 12).toLocaleString('es-MX')}
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-7 text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <span className="flex items-center gap-2 font-semibold text-[16px] md:text-[17px]">
          <HeartIcon filled size={22} />
          {post.likes.toLocaleString('es-MX')}
        </span>
        <span className="flex items-center gap-2 font-semibold text-[16px] md:text-[17px]">
          <CommentSolid />
          {post.comments.length}
        </span>
      </div>
    </button>
  );
}

function CommentSolid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
    </svg>
  );
}

function Empty({ tab }: { tab: Tab }) {
  const labels: Record<Tab, { title: string; sub: string }> = {
    posts: {
      title: 'Aún no hay publicaciones',
      sub: 'Cuando compartas obras, aparecerán aquí.',
    },
    reels: {
      title: 'Reels',
      sub: 'Próximos reels del estudio aparecerán aquí.',
    },
    tagged: {
      title: 'Sin etiquetas todavía',
      sub: 'Cuando alguien te etiquete, aparecerá aquí.',
    },
  };
  const l = labels[tab];
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-20 w-20 rounded-full border-2 border-ig-text dark:border-ig-dark-text grid place-items-center mb-4">
        <CommentIcon size={36} />
      </div>
      <h3 className="text-[28px] font-extrabold tracking-tight">{l.title}</h3>
      <p className="text-ig-muted dark:text-ig-dark-muted mt-2">{l.sub}</p>
    </div>
  );
}
