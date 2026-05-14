import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  filled?: boolean;
  size?: number;
};

const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const HomeIcon = ({ filled, size = 24, ...p }: IconProps) =>
  filled ? (
    <svg {...base(size)} fill="currentColor" stroke="none" {...p}>
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" />
    </svg>
  ) : (
    <svg {...base(size)} {...p}>
      <path d="m22 12-10-9.5L2 12" />
      <path d="M5 9.5V22h5v-6a2 2 0 0 1 4 0v6h5V9.5" />
    </svg>
  );

export const SearchIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="10.5" cy="10.5" r="7.5" />
    <path d="m21 21-5.6-5.6" />
  </svg>
);

export const CompassIcon = ({ filled, size = 24, ...p }: IconProps) =>
  filled ? (
    <svg {...base(size)} fill="currentColor" stroke="none" {...p}>
      <path d="M12 .5C5.65.5.5 5.65.5 12s5.15 11.5 11.5 11.5S23.5 18.35 23.5 12 18.35.5 12 .5Zm4.99 6.71-2.32 8.45a1.5 1.5 0 0 1-1.06 1.05l-8.49 2.31a.75.75 0 0 1-.92-.92l2.31-8.49a1.5 1.5 0 0 1 1.06-1.06l8.49-2.31a.75.75 0 0 1 .93.97Z" />
      <circle cx="12" cy="12" r="1.8" fill="#fff" />
    </svg>
  ) : (
    <svg {...base(size)} {...p}>
      <polygon points="13.94 13.94 4.94 19.06 10.06 10.06 19.06 4.94 13.94 13.94" />
      <polygon points="13.94 13.94 4.94 19.06 10.06 10.06" fill="currentColor" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

export const ReelsIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M2 7.5h20" />
    <path d="M6 2 9 7.5" />
    <path d="m11 2 3 5.5" />
    <path d="m17 2-3 5.5" />
    <path d="m10 11 6 3-6 3v-6Z" fill="currentColor" stroke="none" />
  </svg>
);

export const MessageIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12.003 1.5C5.78 1.5 1 6.18 1 12.32a10.55 10.55 0 0 0 3.49 8l.51.44v3.74l3.34-1.83.5.15a11.7 11.7 0 0 0 3.17.44C18.22 23.26 23 18.58 23 12.43S18.22 1.5 12 1.5Z" />
    <path d="m6.5 13.5 3.5-3.7 3.6 2.7 3.9-3.9-3.5 4 -3.6-2.7Z" fill="currentColor" stroke="none" />
  </svg>
);

export const HeartIcon = ({ filled, size = 24, ...p }: IconProps) =>
  filled ? (
    <svg {...base(size)} fill="#ed4956" stroke="#ed4956" {...p}>
      <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.5L12 21.35Z" />
    </svg>
  ) : (
    <svg {...base(size)} {...p}>
      <path d="M12 21.35 10.55 20C5.4 15.36 2 12.27 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.5L12 21.35Z" />
    </svg>
  );

export const PlusSquareIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const MenuIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="15" y2="18" />
  </svg>
);

export const CommentIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
  </svg>
);

export const ShareIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <line x1="22" y1="3" x2="9.218" y2="10.083" />
    <polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" />
  </svg>
);

export const BookmarkIcon = ({ filled, size = 24, ...p }: IconProps) =>
  filled ? (
    <svg {...base(size)} fill="currentColor" stroke="currentColor" {...p}>
      <polygon points="20 21 12 16 4 21 4 3 20 3 20 21" />
    </svg>
  ) : (
    <svg {...base(size)} {...p}>
      <polygon points="20 21 12 16 4 21 4 3 20 3 20 21" />
    </svg>
  );

export const DotsIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const ChevronLeft = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRight = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const GridIcon = ({ size = 12, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={2} {...p}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

export const ReelsTabIcon = ({ size = 12, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={2} {...p}>
    <path d="M2 12.5 22 12.5" />
    <path d="M5.5 2 9 7.5H2" />
    <path d="M11 2 14.5 7.5" />
    <path d="m18 2-3.5 5.5" />
    <rect x="2" y="2" width="20" height="20" rx="3" />
  </svg>
);

export const TaggedIcon = ({ size = 12, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={2} {...p}>
    <path d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    <path d="M17 21v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const VerifiedBadge = ({ size = 18, ...p }: SVGProps<SVGSVGElement>) => (
  <svg width={size} height={size} viewBox="0 0 40 40" {...p}>
    <path
      fill="#0095f6"
      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0Z"
    />
    <path
      fill="#fff"
      d="m28.16 14.296-9.93 9.927L13.93 19.92l-1.99 1.99 6.29 6.29 11.92-11.92Z"
    />
  </svg>
);

export const CarouselIcon = ({ size = 22, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" {...p}>
    <path d="M19.5 4.5h-12a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm0 14h-12v-12h12Z" />
    <path d="M3.5 8.5v10a2 2 0 0 0 2 2h10v-1.5h-10a.5.5 0 0 1-.5-.5v-10Z" />
  </svg>
);

export const ReelPlayIcon = ({ size = 22, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" {...p}>
    <path d="M5 3v18l15-9Z" />
  </svg>
);

export const SunIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const MoonIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

export const Emoji = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

export const CloseIcon = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);
