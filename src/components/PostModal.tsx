import { useEffect, useState } from 'react';
import type { Post } from '../data';
import { profile } from '../data';
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  BookmarkIcon,
  DotsIcon,
  Emoji,
  CloseIcon,
  ChevronLeft,
  ChevronRight,
  VerifiedBadge,
} from './Icons';

type Props = {
  post: Post;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

export function PostModal({ post, onClose, onPrev, onNext, hasPrev, hasNext }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(0);
  const [commentDraft, setCommentDraft] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const doubleTapLike = () => {
    setLiked(true);
    setAnimateHeart((n) => n + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in flex items-center justify-center">
      {/* Close (top-right of viewport) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:opacity-80 transition no-tap-highlight"
        aria-label="Cerrar"
      >
        <CloseIcon size={28} />
      </button>

      {/* Navigation arrows */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 hover:bg-white text-black grid place-items-center transition no-tap-highlight"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 hover:bg-white text-black grid place-items-center transition no-tap-highlight"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Dialog */}
      <div
        className="relative w-[min(96vw,1100px)] h-[min(92vh,720px)] bg-white dark:bg-black rounded-md md:rounded-lg overflow-hidden shadow-2xl animate-scale-in grid grid-cols-1 md:grid-cols-[1.2fr_minmax(360px,440px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div
          className="relative bg-black flex items-center justify-center select-none"
          onDoubleClick={doubleTapLike}
        >
          <img
            key={post.id + '-img'}
            src={post.image.replace('w=800&h=800', 'w=1400&h=1400')}
            alt={post.title}
            draggable={false}
            className="max-h-full max-w-full object-contain"
          />
          {/* heart burst */}
          {animateHeart > 0 && (
            <span
              key={animateHeart}
              className="pointer-events-none absolute inset-0 grid place-items-center"
              aria-hidden
            >
              <span className="text-white animate-heart">
                <svg viewBox="0 0 24 24" width="110" height="110" fill="white">
                  <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.5L12 21.35Z" />
                </svg>
              </span>
            </span>
          )}
        </div>

        {/* Right panel */}
        <aside className="flex flex-col border-l border-ig-border dark:border-ig-dark-border bg-white dark:bg-black">
          {/* header */}
          <header className="flex items-center justify-between px-4 py-3 border-b border-ig-border dark:border-ig-dark-border">
            <div className="flex items-center gap-3">
              <span className="rounded-full p-[2px] ig-gradient">
                <span className="block rounded-full bg-white dark:bg-black p-[2px]">
                  <img
                    src={profile.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                    draggable={false}
                  />
                </span>
              </span>
              <div className="leading-tight">
                <p className="text-[14px] font-semibold flex items-center gap-1">
                  {profile.username}
                  <VerifiedBadge size={14} />
                </p>
                {post.location && (
                  <p className="text-[12px] text-ig-text dark:text-ig-dark-text">
                    {post.location}
                  </p>
                )}
              </div>
            </div>
            <button className="opacity-70 hover:opacity-100">
              <DotsIcon size={20} />
            </button>
          </header>

          {/* scrollable: caption + comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            <div className="flex gap-3">
              <span className="rounded-full p-[1.5px] ig-gradient shrink-0">
                <span className="block rounded-full bg-white dark:bg-black p-[1.5px]">
                  <img
                    src={profile.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                    draggable={false}
                  />
                </span>
              </span>
              <div className="text-[14px] leading-[19px]">
                <p>
                  <span className="font-semibold mr-1.5">{profile.username}</span>
                  <span>{post.caption}</span>
                </p>
                <p className="text-[12px] text-ig-muted dark:text-ig-dark-muted mt-1.5">
                  {post.medium} · {post.year} {post.location ? `· ${post.location}` : ''}
                </p>
                <p className="text-[12px] text-ig-muted dark:text-ig-dark-muted mt-1">
                  {post.time}
                </p>
              </div>
            </div>

            {post.comments.map((c, i) => (
              <div key={i} className="flex gap-3 group">
                <span className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-500 dark:from-neutral-700 dark:to-neutral-900 grid place-items-center text-white text-[12px] font-semibold">
                  {c.user.slice(0, 2)}
                </span>
                <div className="flex-1 text-[14px] leading-[19px]">
                  <p>
                    <span className="font-semibold mr-1.5">{c.user}</span>
                    <span>{c.text}</span>
                  </p>
                  <div className="flex items-center gap-4 text-[12px] text-ig-muted dark:text-ig-dark-muted mt-1.5">
                    <span>{c.time}</span>
                    <span>{c.likes} Me gusta</span>
                    <button className="font-semibold">Responder</button>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition self-start mt-1">
                  <HeartIcon size={12} />
                </button>
              </div>
            ))}

            {post.comments.length === 0 && (
              <div className="text-center py-10">
                <p className="text-[22px] font-semibold">Sé el primero en comentar.</p>
                <p className="text-[14px] text-ig-muted dark:text-ig-dark-muted mt-1">
                  Nadie ha comentado todavía. Comparte tu impresión.
                </p>
              </div>
            )}
          </div>

          {/* actions */}
          <div className="px-4 pt-3 pb-2 border-t border-ig-border dark:border-ig-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setLiked((v) => !v);
                    if (!liked) setAnimateHeart((n) => n + 1);
                  }}
                  className="hover:opacity-60 active:scale-95 transition"
                  aria-label="Me gusta"
                >
                  <HeartIcon filled={liked} size={26} />
                </button>
                <button className="hover:opacity-60 active:scale-95 transition">
                  <CommentIcon size={26} />
                </button>
                <button className="hover:opacity-60 active:scale-95 transition">
                  <ShareIcon size={26} />
                </button>
              </div>
              <button
                onClick={() => setSaved((v) => !v)}
                className="hover:opacity-60 active:scale-95 transition"
                aria-label="Guardar"
              >
                <BookmarkIcon filled={saved} size={26} />
              </button>
            </div>
            <p className="text-[14px] font-semibold mt-2">
              {(post.likes + (liked ? 1 : 0)).toLocaleString('es-MX')} Me gusta
            </p>
            <p className="text-[10px] uppercase tracking-wider text-ig-muted dark:text-ig-dark-muted mt-1">
              {post.time}
            </p>
          </div>

          {/* comment input */}
          <form
            className="flex items-center gap-2 px-4 py-3 border-t border-ig-border dark:border-ig-dark-border"
            onSubmit={(e) => {
              e.preventDefault();
              setCommentDraft('');
            }}
          >
            <button type="button" className="opacity-80 hover:opacity-100">
              <Emoji size={24} />
            </button>
            <input
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="Agrega un comentario…"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-ig-muted dark:placeholder:text-ig-dark-muted"
            />
            <button
              type="submit"
              disabled={!commentDraft.trim()}
              className="text-[14px] font-semibold text-ig-blue disabled:opacity-40"
            >
              Publicar
            </button>
          </form>
        </aside>
      </div>

      {/* click outside */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute inset-0 -z-10 cursor-default"
      />
    </div>
  );
}
