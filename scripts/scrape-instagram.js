/* ============================================================================
 *  SCRAPE INSTAGRAM PROFILE → JSON + IMAGES (downloads sueltas, sin CDN)
 *  ---------------------------------------------------------------------------
 *  Esta versión NO usa JSZip (Instagram bloquea cargar scripts externos por CSP).
 *  En su lugar:
 *    1) Descarga cada imagen como archivo suelto: 001-<shortcode>.jpg, 002-…
 *    2) Al final descarga un único JSON con toda la info: edgesilvame-posts.json
 *
 *  ---------------------------------------------------------------------------
 *  Cómo usar:
 *    1. Abre https://www.instagram.com/edgesilvame/ logueado.
 *    2. Haz scroll hasta que carguen TODOS los posts que quieras descargar
 *       (Instagram carga en lazy: si no scrolleas, no aparecen).
 *    3. Abre la consola del navegador (Cmd+Opt+J en Chrome).
 *    4. IMPORTANTE: En Chrome activa "Permitir múltiples descargas" la primera vez:
 *         - Aparecerá un banner arriba; elige "Permitir".
 *         - O ve a chrome://settings/content/automaticDownloads.
 *    5. Copia y pega TODO este archivo. Presiona Enter.
 *    6. Espera. Verás logs y se irán descargando las imágenes una por una.
 *    7. Al final se descargará `edgesilvame-posts.json`.
 *
 *  Después:
 *    - Crea la carpeta public/obras/ en el proyecto.
 *    - Mueve TODAS las JPG descargadas (001-…, 002-…) ahí.
 *    - Abre el JSON, copia el array `posts` y pégalo en src/data.ts.
 *
 *  Si Instagram corta el throttling, baja CONCURRENCY a 1 y sube SLEEP_MS.
 * ============================================================================ */

(async () => {
  const SLUG = 'edgesilvame';
  const CONCURRENCY = 2;        // peticiones paralelas a páginas de posts
  const SLEEP_MS = 700;         // pausa entre lotes (subir si te frena IG)
  const IMG_DELAY_MS = 250;     // pausa entre descargas de imagen
  const MAX_POSTS = Infinity;   // pon un número para limitar (ej. 20 para probar)

  const log = (msg, color = '#0095f6') =>
    console.log(`%c[scraper] ${msg}`, `color:${color};font-weight:bold`);

  log('iniciando…');

  // --- 1. Recolectar enlaces a posts ---
  const allLinks = new Map();
  const collect = () => {
    document
      .querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')
      .forEach((a) => {
        const m = a.getAttribute('href').match(/\/(p|reel)\/([^/?]+)/);
        if (m && !allLinks.has(m[2])) {
          allLinks.set(m[2], { shortcode: m[2], type: m[1] });
        }
      });
  };
  collect();
  log(`visibles antes de scrollear: ${allLinks.size}`);

  // Auto-scroll para cargar todo
  let prev = -1;
  let stable = 0;
  while (stable < 3) {
    const h = document.documentElement.scrollHeight;
    if (h === prev) stable++;
    else {
      stable = 0;
      prev = h;
    }
    window.scrollTo(0, h);
    await sleep(1200);
    collect();
  }
  window.scrollTo(0, 0);

  let posts = [...allLinks.values()];
  if (posts.length > MAX_POSTS) posts = posts.slice(0, MAX_POSTS);
  log(`posts encontrados: ${posts.length}`, '#10b981');

  // --- 2. Obtener info de cada post (caption, likes, comments, imagen) ---
  const results = [];
  let done = 0;

  const fetchInfo = async (p) => {
    const url = `https://www.instagram.com/${p.type}/${p.shortcode}/`;
    try {
      const html = await fetch(url, { credentials: 'include' }).then((r) => r.text());
      const og = (prop) => {
        const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]+)"`));
        return m ? decodeHtml(m[1]) : null;
      };
      const image = og('og:image');
      const desc = og('og:description') || '';
      const title = og('og:title') || '';

      // Parsear "1,234 likes, 56 comments - edgesilvame on May 1, 2025: \"caption…\""
      let likes = 0,
        comments = 0,
        date = null,
        caption = '';
      const m = desc.match(
        /([\d,\.]+)\s+likes?,\s+([\d,\.]+)\s+comments?\s+-\s+[\w.]+\s+on\s+([^:]+):\s+"([\s\S]+)"/
      );
      if (m) {
        likes = parseInt(m[1].replace(/[^\d]/g, ''), 10) || 0;
        comments = parseInt(m[2].replace(/[^\d]/g, ''), 10) || 0;
        date = m[3].trim();
        caption = m[4].trim();
      } else {
        // fallback sin números (cuenta privada o formato distinto)
        caption = title;
      }

      return { ...p, url, image, likes, comments, date, caption };
    } catch (err) {
      console.warn(`[scraper] fallo en ${p.shortcode}:`, err.message);
      return null;
    }
  };

  for (let i = 0; i < posts.length; i += CONCURRENCY) {
    const part = await Promise.all(posts.slice(i, i + CONCURRENCY).map(fetchInfo));
    for (const r of part) {
      if (r) {
        results.push(r);
        done++;
        log(`✓ info ${done}/${posts.length}  ${r.shortcode}  ${r.likes} ❤  ${r.comments} 💬`);
      }
    }
    if (i + CONCURRENCY < posts.length) await sleep(SLEEP_MS);
  }

  // --- 3. Descargar imágenes una por una ---
  log('descargando imágenes (asegúrate de permitir descargas múltiples)…', '#0095f6');

  for (let i = 0; i < results.length; i++) {
    const p = results[i];
    if (!p.image) continue;
    const filename = `${String(i + 1).padStart(3, '0')}-${p.shortcode}.jpg`;
    p.localFile = `/obras/${filename}`;
    try {
      const blob = await fetch(p.image, { credentials: 'omit' }).then((r) => r.blob());
      triggerDownload(blob, filename);
      log(`🖼 ${i + 1}/${results.length}  ${filename}`);
    } catch (err) {
      console.warn(`[scraper] no se pudo bajar imagen ${p.shortcode}:`, err.message);
    }
    await sleep(IMG_DELAY_MS);
  }

  // --- 4. Formatear payload listo para data.ts ---
  const formatted = results.map((p, i) => ({
    id: i + 1,
    title: titleFromCaption(p.caption) || `Obra ${i + 1}`,
    caption: p.caption || '',
    medium: 'Obra',
    year: p.date ? new Date(p.date).getFullYear() : new Date().getFullYear(),
    image: p.localFile || p.image,
    likes: p.likes,
    comments: [],
    commentsCount: p.comments,
    isReel: p.type === 'reel',
    isCarousel: false,
    time: relativeTime(p.date),
    sourceUrl: p.url,
  }));

  const payload = {
    profile: {
      username: SLUG,
      scrapedAt: new Date().toISOString(),
      totalPosts: formatted.length,
    },
    posts: formatted,
  };

  const jsonBlob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  triggerDownload(jsonBlob, `${SLUG}-posts.json`);

  console.log(
    `%c[scraper] LISTO — ${results.length} posts exportados`,
    'color:#10b981;font-weight:bold;font-size:14px'
  );
  console.log(
    `%c→ Mueve TODAS las JPG descargadas (001-… 002-…) a /public/obras/`,
    'color:#10b981'
  );
  console.log(
    `%c→ Copia el array \`posts\` del JSON y pégalo en src/data.ts`,
    'color:#10b981'
  );

  window.__scraperResult = payload;
  return payload;
})();

// ============================================================================
// Helpers
// ============================================================================
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeHtml(s) {
  const div = document.createElement('div');
  div.innerHTML = s;
  return div.textContent || '';
}

function titleFromCaption(caption) {
  if (!caption) return null;
  const cleaned = caption.replace(/\s+/g, ' ').trim();
  const firstSentence = cleaned.split(/[.\n·—]/)[0].trim();
  const words = firstSentence.split(' ');
  return words.slice(0, 6).join(' ') + (words.length > 6 ? '…' : '');
}

function relativeTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const diff = (Date.now() - d.getTime()) / 1000;
  const days = Math.floor(diff / 86400);
  if (days < 1) return 'hoy';
  if (days < 7) return `hace ${days} d`;
  if (days < 30) return `hace ${Math.floor(days / 7)} sem`;
  if (days < 365) return `hace ${Math.floor(days / 30)} mes${days >= 60 ? 'es' : ''}`;
  return `hace ${Math.floor(days / 365)} año${days >= 730 ? 's' : ''}`;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
