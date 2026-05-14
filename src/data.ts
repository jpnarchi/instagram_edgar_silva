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
};

export const profile = {
  username: 'edgesilvame',
  fullName: 'Edgar Silva',
  pronouns: 'él/he',
  bio: [
    'Artista visual · Pintor contemporáneo',
    'Óleo, tinta y memoria · CDMX ⇄ Oaxaca',
    'Próxima exposición: "Ruido Tenue" — junio',
    '↓ portafolio + obra',
  ],
  link: 'instagram.com/edgesilvame',
  posts: 551,
  followers: '1,816',
  following: '4,858',
  verified: false,
  category: 'Artista',
  avatar: '/edgar-avatar.jpg',
};

export const highlights = [
  {
    label: 'Estudio',
    cover:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&h=200&fit=crop',
  },
  {
    label: 'Procesos',
    cover:
      'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=200&h=200&fit=crop',
  },
  {
    label: 'Oaxaca 25',
    cover:
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=200&h=200&fit=crop',
  },
  {
    label: 'Berlín',
    cover:
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=200&h=200&fit=crop',
  },
  {
    label: 'Bocetos',
    cover:
      'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=200&h=200&fit=crop',
  },
  {
    label: 'Prensa',
    cover:
      'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=200&h=200&fit=crop',
  },
  {
    label: 'Talleres',
    cover:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=200&h=200&fit=crop',
  },
  {
    label: 'Exposiciones',
    cover:
      'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=200&h=200&fit=crop',
  },
];

// Curated Unsplash photo IDs with artistic / painting / studio themes.
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${w}&fit=crop&auto=format&q=80`;

export const posts: Post[] = [
  {
    id: 1,
    title: 'Ruido Tenue I',
    caption:
      'Ruido Tenue I · óleo sobre lino, 180×140 cm. La memoria se sedimenta, no se cuenta.',
    medium: 'Óleo sobre lino',
    year: 2026,
    location: 'Estudio Roma Norte',
    image: img('photo-1547826039-bfc35e0f1ea8'),
    likes: 4823,
    isCarousel: true,
    time: 'hace 2 d',
    comments: [
      { user: 'kurimanzutto', text: 'Hermoso, Edgar 🤎', time: '1 d', likes: 312 },
      { user: 'gabrielarosales', text: 'La capa final es brutal.', time: '1 d', likes: 89 },
      { user: 'estudio.fragil', text: 'Te leo en cada brochazo.', time: '23 h', likes: 41 },
      { user: 'noctambulo.mx', text: '🔥🔥🔥', time: '12 h', likes: 12 },
    ],
  },
  {
    id: 2,
    title: 'Retrato de M.',
    caption: 'Retrato de M. — tinta china, papel de algodón, 2026.',
    medium: 'Tinta sobre papel',
    year: 2026,
    image: img('photo-1578321272176-b7bbc0679853'),
    likes: 2910,
    time: 'hace 4 d',
    comments: [
      { user: 'mariana.b', text: 'Me dejaste sin palabras.', time: '3 d', likes: 220 },
      { user: 'tinta.estudio', text: 'La línea, dios.', time: '3 d', likes: 67 },
    ],
  },
  {
    id: 3,
    title: 'Nocturno (Coyoacán)',
    caption: 'Nocturno (Coyoacán) — óleo, 2025. Para Diego.',
    medium: 'Óleo sobre tabla',
    year: 2025,
    location: 'Coyoacán, CDMX',
    image: img('photo-1549490349-8643362247b5'),
    likes: 6204,
    time: 'hace 1 sem',
    comments: [
      { user: 'museodelarte', text: 'Memorable.', time: '6 d', likes: 540 },
      { user: 'lulalopez', text: '¿Está disponible?', time: '5 d', likes: 31 },
    ],
  },
  {
    id: 4,
    title: 'Estudio de cuerpo',
    caption: 'Estudio de cuerpo · carbón sobre papel, 70×100 cm.',
    medium: 'Carbón sobre papel',
    year: 2026,
    image: img('photo-1579541591970-e5cf87dc4d4f'),
    likes: 1844,
    time: 'hace 1 sem',
    comments: [
      { user: 'academia.sanluis', text: 'Belleza.', time: '6 d', likes: 88 },
    ],
  },
  {
    id: 5,
    title: 'Mercado de Tlacolula',
    caption: 'Mercado de Tlacolula — acuarela, in situ. Sábado largo.',
    medium: 'Acuarela',
    year: 2025,
    location: 'Tlacolula, Oaxaca',
    image: img('photo-1582555172866-f73bb12a2ab3'),
    likes: 3299,
    isCarousel: true,
    time: 'hace 2 sem',
    comments: [
      { user: 'oaxaca.diaria', text: 'Volvé pronto.', time: '13 d', likes: 142 },
      { user: 'feria.arte', text: '¿Print disponible?', time: '12 d', likes: 22 },
    ],
  },
  {
    id: 6,
    title: 'Geometría sagrada I',
    caption: 'Geometría sagrada I — acrílico y hoja de oro, 100×100 cm.',
    medium: 'Acrílico + hoja de oro',
    year: 2026,
    image: img('photo-1541961017774-22349e4a1262'),
    likes: 5102,
    time: 'hace 3 sem',
    comments: [
      { user: 'galeriaomr', text: '🔶', time: '20 d', likes: 200 },
    ],
  },
  {
    id: 7,
    title: 'Reel · Capa 14',
    caption: 'Reel · proceso de "Ruido Tenue II", capa 14 de 22.',
    medium: 'Video',
    year: 2026,
    image: img('photo-1513364776144-60967b0f800f'),
    likes: 12903,
    isReel: true,
    time: 'hace 3 sem',
    comments: [
      { user: 'arteyfuego', text: '¿Qué medium usas para esa textura?', time: '21 d', likes: 410 },
    ],
  },
  {
    id: 8,
    title: 'Bodegón con membrillo',
    caption: 'Bodegón con membrillo — óleo, 50×60 cm.',
    medium: 'Óleo sobre lienzo',
    year: 2025,
    image: img('photo-1518998053901-5348d3961a04'),
    likes: 2188,
    time: 'hace 4 sem',
    comments: [
      { user: 'cocina.arte', text: 'Se me antojó.', time: '27 d', likes: 55 },
    ],
  },
  {
    id: 9,
    title: 'Marea baja',
    caption: 'Marea baja — pigmento sobre yute, 2024.',
    medium: 'Pigmento sobre yute',
    year: 2024,
    location: 'Mazunte, Oaxaca',
    image: img('photo-1502691876148-a84978e59af8'),
    likes: 4571,
    isCarousel: true,
    time: 'hace 1 mes',
    comments: [
      { user: 'marina.b', text: 'Me llevó al mar.', time: '29 d', likes: 130 },
    ],
  },
  {
    id: 10,
    title: 'Autorretrato a los 32',
    caption: 'Autorretrato a los 32 — óleo, 40×30 cm.',
    medium: 'Óleo sobre tabla',
    year: 2025,
    image: img('photo-1544717305-2782549b5136'),
    likes: 7345,
    time: 'hace 1 mes',
    comments: [
      { user: 'andresgarcia', text: 'El amarillo, hermano.', time: '30 d', likes: 280 },
    ],
  },
  {
    id: 11,
    title: 'Geometría sagrada II',
    caption: 'Geometría sagrada II — díptico, acrílico, 2026.',
    medium: 'Acrílico',
    year: 2026,
    image: img('photo-1574182245530-967d9b3831af'),
    likes: 3902,
    time: 'hace 1 mes',
    comments: [
      { user: 'museorufino', text: 'Espectacular.', time: '30 d', likes: 150 },
    ],
  },
  {
    id: 12,
    title: 'Reel · Estudio en vivo',
    caption: 'Reel · domingo de estudio, Schiele de fondo.',
    medium: 'Video',
    year: 2026,
    image: img('photo-1513519245088-0e12902e5a38'),
    likes: 9821,
    isReel: true,
    time: 'hace 1 mes',
    comments: [
      { user: 'arteyfuego', text: '¿Bocina qué reproduce?', time: '30 d', likes: 92 },
    ],
  },
  {
    id: 13,
    title: 'Ciudad partida',
    caption: 'Ciudad partida — óleo y collage, 120×90 cm.',
    medium: 'Óleo + collage',
    year: 2025,
    location: 'CDMX',
    image: img('photo-1554907984-15263bfd63bd'),
    likes: 2733,
    time: 'hace 2 meses',
    comments: [],
  },
  {
    id: 14,
    title: 'Pequeño nocturno',
    caption: 'Pequeño nocturno — gouache, 20×25 cm.',
    medium: 'Gouache',
    year: 2025,
    image: img('photo-1549887534-1541e9326642'),
    likes: 1622,
    time: 'hace 2 meses',
    comments: [],
  },
  {
    id: 15,
    title: 'Fragmento (rojo)',
    caption: 'Fragmento (rojo) — óleo sobre lino, 60×60 cm.',
    medium: 'Óleo sobre lino',
    year: 2024,
    image: img('photo-1536924940846-227afb31e2a5'),
    likes: 4019,
    time: 'hace 2 meses',
    comments: [
      { user: 'galeriaomr', text: '❤️', time: '60 d', likes: 88 },
    ],
  },
  {
    id: 16,
    title: 'Bodegón gris',
    caption: 'Bodegón gris — óleo, 40×50 cm.',
    medium: 'Óleo sobre tabla',
    year: 2024,
    image: img('photo-1499781350541-7783f6c6a0c8'),
    likes: 1233,
    time: 'hace 3 meses',
    comments: [],
  },
  {
    id: 17,
    title: 'Procesión',
    caption: 'Procesión — pigmento sobre tela, 200×150 cm.',
    medium: 'Pigmento sobre tela',
    year: 2024,
    image: img('photo-1577720580479-7d839d829c73'),
    likes: 5588,
    isCarousel: true,
    time: 'hace 3 meses',
    comments: [
      { user: 'museojumex', text: 'Pieza notable.', time: '80 d', likes: 200 },
    ],
  },
  {
    id: 18,
    title: 'Estudio azul',
    caption: 'Estudio azul — tinta diluida, 2024.',
    medium: 'Tinta sobre papel',
    year: 2024,
    image: img('photo-1547891654-e66ed7ebb968'),
    likes: 2104,
    time: 'hace 3 meses',
    comments: [],
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
