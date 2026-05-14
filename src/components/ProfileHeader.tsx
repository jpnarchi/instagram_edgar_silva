import { useState } from 'react';
import { profile } from '../data';
import { VerifiedBadge, DotsIcon } from './Icons';

export function ProfileHeader() {
  const [following, setFollowing] = useState(false);

  return (
    <section className="px-4 md:px-10 pt-6 md:pt-12 pb-6 md:pb-10">
      <div className="flex items-start gap-6 md:gap-16">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="relative">
            <div className="rounded-full p-[3px] ig-gradient">
              <div className="rounded-full bg-white dark:bg-black p-[3px]">
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  draggable={false}
                  className="h-20 w-20 md:h-[150px] md:w-[150px] rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Row 1: username + actions */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <h1 className="text-[20px] md:text-[22px] font-light text-ig-text dark:text-ig-dark-text flex items-center gap-1.5">
              {profile.username}
              {profile.verified && <VerifiedBadge size={18} />}
            </h1>

            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <button
                onClick={() => setFollowing((v) => !v)}
                className={`h-8 px-4 rounded-lg text-[14px] font-semibold transition-colors ${
                  following
                    ? 'bg-black/5 dark:bg-white/10 text-ig-text dark:text-ig-dark-text hover:bg-black/10 dark:hover:bg-white/20'
                    : 'bg-ig-blue text-white hover:bg-ig-blueHover'
                }`}
              >
                {following ? 'Siguiendo' : 'Seguir'}
              </button>
              <button className="h-8 px-4 rounded-lg text-[14px] font-semibold bg-black/5 dark:bg-white/10 text-ig-text dark:text-ig-dark-text hover:bg-black/10 dark:hover:bg-white/20">
                Mensaje
              </button>
              <button className="h-8 w-8 rounded-lg grid place-items-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                  <path d="M12 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0-5a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 3.5Zm0 12a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5Zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm0 12a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5Zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z" />
                </svg>
              </button>
              <button className="h-8 w-8 rounded-lg grid place-items-center hover:bg-black/5 dark:hover:bg-white/10">
                <DotsIcon size={22} />
              </button>
            </div>
          </div>

          {/* Row 2: stats (desktop) */}
          <ul className="hidden md:flex gap-10 mt-5 text-[16px] text-ig-text dark:text-ig-dark-text">
            <li>
              <strong className="font-semibold">{profile.posts}</strong>{' '}
              <span>publicaciones</span>
            </li>
            <li>
              <strong className="font-semibold">{profile.followers}</strong>{' '}
              <span>seguidores</span>
            </li>
            <li>
              <strong className="font-semibold">{profile.following}</strong>{' '}
              <span>seguidos</span>
            </li>
          </ul>

          {/* Bio (desktop) */}
          <div className="hidden md:block mt-5 text-[14px] leading-[20px] text-ig-text dark:text-ig-dark-text">
            <p className="font-semibold">{profile.fullName}</p>
            <p className="text-ig-muted dark:text-ig-dark-muted">
              {profile.category} · {profile.pronouns}
            </p>
            {profile.bio.map((line, i) => (
              <p key={i} className={i === 0 ? 'mt-1' : ''}>
                {line}
              </p>
            ))}
            <a
              href="#"
              className="font-semibold text-ig-link dark:text-[#e0f1ff] hover:underline mt-0.5 inline-block"
            >
              {profile.link}
            </a>
          </div>
        </div>
      </div>

      {/* Bio (mobile) */}
      <div className="md:hidden mt-4 text-[14px] leading-[20px] text-ig-text dark:text-ig-dark-text">
        <p className="font-semibold">{profile.fullName}</p>
        <p className="text-ig-muted dark:text-ig-dark-muted">
          {profile.category} · {profile.pronouns}
        </p>
        {profile.bio.map((line, i) => (
          <p key={i} className={i === 0 ? 'mt-1' : ''}>
            {line}
          </p>
        ))}
        <a
          href="#"
          className="font-semibold text-ig-link dark:text-[#e0f1ff] mt-0.5 inline-block"
        >
          {profile.link}
        </a>
      </div>

      {/* Stats (mobile) */}
      <ul className="md:hidden mt-5 grid grid-cols-3 border-y border-ig-border dark:border-ig-dark-border py-3 text-center text-[14px] text-ig-text dark:text-ig-dark-text">
        <li>
          <p className="font-semibold">{profile.posts}</p>
          <p className="text-ig-muted dark:text-ig-dark-muted">publicaciones</p>
        </li>
        <li>
          <p className="font-semibold">{profile.followers}</p>
          <p className="text-ig-muted dark:text-ig-dark-muted">seguidores</p>
        </li>
        <li>
          <p className="font-semibold">{profile.following}</p>
          <p className="text-ig-muted dark:text-ig-dark-muted">seguidos</p>
        </li>
      </ul>
    </section>
  );
}
