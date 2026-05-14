export type Comment = {
  user: string;
  text: string;
  time: string;
  likes: number;
};

export type Post = {
  id: number;
  title: string;
  caption: string;
  medium: string;
  year: number;
  location?: string;
  image: string;
  likes: number;
  comments: Comment[];
  isReel?: boolean;
  isCarousel?: boolean;
  time: string;
  sourceUrl?: string;
};

export const profile = {
  username: 'edgesilvame',
  fullName: 'Edgar Silva',
  pronouns: 'él/he',
  bio: [
    'Artista visual · Ilustración a tinta',
    'Escenas post-apocalípticas en blanco y negro',
    'Detalle, ruido, materia.',
    '↓ obra completa',
  ],
  link: 'instagram.com/edgesilvame',
  posts: 551,
  followers: '1,816',
  following: '4,858',
  verified: false,
  category: 'Artista',
  avatar: '/edgar-avatar.jpg',
};

// Cubre cada highlight con una de sus propias obras (más coherente que stock)
export const highlights = [
  { label: 'Obra', cover: '/obras/05-DYQyBPkkZda.jpg' },
  { label: 'Detalle', cover: '/obras/08-DXqrAJYFuGS.jpg' },
  { label: 'Tinta', cover: '/obras/03-DAHvKJQxait.jpg' },
  { label: 'Proceso', cover: '/obras/07-DXxRuiQEdqX.jpg' },
  { label: 'Escenas', cover: '/obras/04-DYSgiYAkSsQ.jpg' },
  { label: 'Reels', cover: '/obras/01-DCJkmKxxmO9.jpg' },
];

// 10 obras reales de Edgar Silva (descargadas de @edgesilvame)
export const posts: Post[] = [
  {
    id: 1,
    title: 'Obra 01',
    caption: 'Ilustración a tinta · @edgesilvame',
    medium: 'Tinta sobre papel',
    year: 2024,
    image: '/obras/01-DCJkmKxxmO9.jpg',
    likes: 412,
    comments: [],
    isReel: true,
    time: 'hace 2 d',
    sourceUrl: 'https://www.instagram.com/reel/DCJkmKxxmO9/',
  },
  {
    id: 2,
    title: 'Obra 02',
    caption: 'Ilustración a tinta · @edgesilvame',
    medium: 'Tinta sobre papel',
    year: 2024,
    image: '/obras/02-C_jomexsATh.jpg',
    likes: 538,
    comments: [],
    isReel: true,
    time: 'hace 5 d',
    sourceUrl: 'https://www.instagram.com/reel/C_jomexsATh/',
  },
  {
    id: 3,
    title: 'Obra 03',
    caption: 'Ilustración a tinta · @edgesilvame',
    medium: 'Tinta sobre papel',
    year: 2024,
    image: '/obras/03-DAHvKJQxait.jpg',
    likes: 721,
    comments: [],
    time: 'hace 1 sem',
    sourceUrl: 'https://www.instagram.com/p/DAHvKJQxait/',
  },
  {
    id: 4,
    title: 'Obra 04',
    caption: 'Escena post-apocalíptica · tinta sobre papel.',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/04-DYSgiYAkSsQ.jpg',
    likes: 894,
    comments: [],
    time: 'hace 2 sem',
    sourceUrl: 'https://www.instagram.com/p/DYSgiYAkSsQ/',
  },
  {
    id: 5,
    title: 'Obra 05',
    caption: 'Ruinas · tinta sobre papel, detalle.',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/05-DYQyBPkkZda.jpg',
    likes: 1102,
    comments: [],
    time: 'hace 3 sem',
    sourceUrl: 'https://www.instagram.com/p/DYQyBPkkZda/',
  },
  {
    id: 6,
    title: 'Obra 06',
    caption: 'Ilustración a tinta · @edgesilvame',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/06-DX93uWIAxdK.jpg',
    likes: 487,
    comments: [],
    isReel: true,
    time: 'hace 1 mes',
    sourceUrl: 'https://www.instagram.com/reel/DX93uWIAxdK/',
  },
  {
    id: 7,
    title: 'Obra 07',
    caption: 'Proceso · estudio.',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/07-DXxRuiQEdqX.jpg',
    likes: 612,
    comments: [],
    time: 'hace 1 mes',
    sourceUrl: 'https://www.instagram.com/p/DXxRuiQEdqX/',
  },
  {
    id: 8,
    title: 'Obra 08',
    caption: 'Figura · detalle.',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/08-DXqrAJYFuGS.jpg',
    likes: 1340,
    comments: [],
    time: 'hace 1 mes',
    sourceUrl: 'https://www.instagram.com/p/DXqrAJYFuGS/',
  },
  {
    id: 9,
    title: 'Obra 09',
    caption: 'Ilustración a tinta · @edgesilvame',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/09-DXoDpR-lgmy.jpg',
    likes: 798,
    comments: [],
    time: 'hace 2 meses',
    sourceUrl: 'https://www.instagram.com/p/DXoDpR-lgmy/',
  },
  {
    id: 10,
    title: 'Obra 10',
    caption: 'Ilustración a tinta · @edgesilvame',
    medium: 'Tinta sobre papel',
    year: 2025,
    image: '/obras/10-DXm_yMpkQ9i.jpg',
    likes: 654,
    comments: [],
    time: 'hace 2 meses',
    sourceUrl: 'https://www.instagram.com/p/DXm_yMpkQ9i/',
  },
];

export const sidebarSuggestions = [
  { user: 'kurimanzutto', sub: 'Te sigue', verified: true },
  { user: 'museojumex', sub: 'Sugerido para ti', verified: true },
  { user: 'galeriaomr', sub: 'Sigue a 3 amigos', verified: false },
  { user: 'tinta.estudio', sub: 'Sugerido para ti', verified: false },
  { user: 'oaxaca.diaria', sub: 'Te sigue', verified: false },
];

export const tabs = ['posts', 'reels', 'tagged'] as const;
export type Tab = (typeof tabs)[number];
