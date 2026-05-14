/* ============================================================================
 *  SCRAPE INSTAGRAM PROFILE → JSON + IMAGES (zip)
 *  ---------------------------------------------------------------------------
 *  Cómo usar:
 *    1. Abre https://www.instagram.com/edgesilvame/ (logueado).
 *    2. Haz scroll hasta que carguen TODOS los posts que quieras descargar
 *       (Instagram carga en lazy: si no scrolleas, no aparecen).
 *    3. Abre la consola del navegador (Cmd+Opt+J en Chrome / Cmd+Opt+I en Safari).
 *    4. Copia y pega TODO este archivo. Presiona Enter.
 *    5. Espera. Verás logs tipo "✓ post 1/47 descargado". Al final descargará:
 *         - edgesilvame-posts.json   (info estructurada para data.ts)
 *         - edgesilvame-images.zip   (todas las imágenes en alta resolución)
 *
 *  Pega el JSON resultante en src/data.ts y mueve las imágenes a /public/obras/.
 *  El script genera URLs `/obras/<id>.jpg` que coinciden con los archivos del zip.
 *
 *  IMPORTANTE:
 *  - Solo descarga posts visibles en el feed del perfil (no Reels que estén
 *    en pestaña separada, no Tagged, no Stories).
 *  - Para carruseles toma SOLO la primera imagen (suficiente para el grid).
 *  - Si Instagram corta el throttle, baja CONCURRENCY a 1.
 * ============================================================================ */

(async () => {
  const CONCURRENCY = 3;         // descargas paralelas de imágenes
  const SLUG = 'edgesilvame';    // cambia si scrapeas otro perfil
  const SCROLL_BACK_TO_TOP = true;

  console.log('%c[scraper] iniciando…', 'color:#0095f6;font-weight:bold');

  // --- 1. Cargar JSZip dinámicamente desde CDN ---
  if (!window.JSZip) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      s.onload = resolve;
      s.onerror = () => reject(new Error('No se pudo cargar JSZip'));
      document.head.appendChild(s);
    });
  }
  const JSZip = window.JSZip;

  // --- 2. Recolectar todos los enlaces a posts del feed ---
  const allLinks = new Set();
  const collect = () =>
    document
      .querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')
      .forEach((a) => {
        const m = a.getAttribute('href').match(/\/(p|reel)\/([^/?]+)/);
        if (m) allLinks.add({ shortcode: m[2], type: m[1] });
      });

  // Recolectar mientras scrolleamos para asegurar que estén todos
  collect();
  console.log(`[scraper] enlaces visibles antes de scrollear: ${allLinks.size}`);

  // Scroll automático para forzar carga si aún hay más
  const lastH = () => document.documentElement.scrollHeight;
  let prev = -1;
  let stable = 0;
  while (stable < 3) {
    const h = lastH();
    if (h === prev) {
      stable++;
    } else {
      stable = 0;
      prev = h;
    }
    window.scrollTo(0, h);
    await new Promise((r) => setTimeout(r, 1200));
    collect();
  }
  if (SCROLL_BACK_TO_TOP) window.scrollTo(0, 0);

  const posts = [...allLinks].reduce((map, p) => {
    map.set(p.shortcode, p);
    return map;
  }, new Map());

  console.log(
    `%c[scraper] posts encontrados: ${posts.size}`,
    'color:#0095f6;font-weight:bold'
  );

  // --- 3. Obtener info de cada post vía la página embebida ---
  // Instagram inyecta JSON en <script type="application/ld+json"> y en window._sharedData
  // pero en las versiones actuales lo más confiable es leer la meta `og:image` + `og:description`
  // de la página individual del post.
  const fetchPostInfo = async (shortcode) => {
    const url = `https://www.instagram.com/p/${shortcode}/`;
    try {
      const html = await fetch(url, { credentials: 'include' }).then((r) =>
        r.text()
      );

      const og = (prop) => {
        const m = html.match(
          new RegExp(`<meta property="${prop}" content="([^"]+)"`)
        );
        return m ? decodeHtml(m[1]) : null;
      };

      const ogImage = og('og:image');
      const ogDescription = og('og:description'); // "1,234 likes, 56 comments - edgesilvame on May 1, 2025: \"caption…\""
      const ogTitle = og('og:title');

      // Parsear ogDescription
      let likes = null,
        comments = null,
        date = null,
        caption = '';
      if (ogDescription) {
        const numM = ogDescription.match(
          /([\d,\.]+)\s+likes?,\s+([\d,\.]+)\s+comments?\s+-\s+[\w.]+\s+on\s+([^:]+):\s+"([\s\S]+)"/
        );
        if (numM) {
          likes = parseInt(numM[1].replace(/[^\d]/g, ''), 10);
          comments = parseInt(numM[2].replace(/[^\d]/g, ''), 10);
          date = numM[3].trim();
          caption = numM[4].trim();
        } else {
          // fallback: solo caption en title
          caption = ogTitle || '';
        }
      }

      return {
        shortcode,
        url,
        image: ogImage,
        likes,
        comments,
        date,
        caption,
      };
    } catch (err) {
      console.warn(`[scraper] fallo en ${shortcode}:`, err.message);
      return null;
    }
  };

  // --- 4. Pipeline con concurrencia limitada ---
  const list = [...posts.values()];
  const results = [];
  let done = 0;

  const runBatch = async (start) => {
    const slice = list.slice(start, start + CONCURRENCY);
    const part = await Promise.all(
      slice.map(async (p) => {
        const info = await fetchPostInfo(p.shortcode);
        done++;
        console.log(
          `[scraper] ✓ ${done}/${list.length}  ${p.shortcode}  ${
            info?.likes ?? '?'
          } ❤`
        );
        if (info) info.type = p.type;
        return info;
      })
    );
    results.push(...part.filter(Boolean));
    if (start + CONCURRENCY < list.length) {
      // pequeña pausa para no triggear throttle
      await new Promise((r) => setTimeout(r, 600));
      await runBatch(start + CONCURRENCY);
    }
  };
  await runBatch(0);

  // --- 5. Descargar imágenes ---
  console.log('%c[scraper] descargando imágenes…', 'color:#0095f6');
  const zip = new JSZip();
  const imgFolder = zip.folder('obras');

  let imgDone = 0;
  const fetchImg = async (post, idx) => {
    if (!post.image) return null;
    try {
      const blob = await fetch(post.image).then((r) => r.blob());
      const filename = `${String(idx + 1).padStart(3, '0')}-${post.shortcode}.jpg`;
      imgFolder.file(filename, blob);
      post.localFile = `/obras/${filename}`;
      imgDone++;
      console.log(`[scraper] 🖼 ${imgDone}/${results.length}  ${filename}`);
    } catch (err) {
      console.warn(`[scraper] no se pudo bajar imagen ${post.shortcode}`);
    }
  };

  // Procesa imágenes en lotes
  for (let i = 0; i < results.length; i += CONCURRENCY) {
    await Promise.all(
      results.slice(i, i + CONCURRENCY).map((p, k) => fetchImg(p, i + k))
    );
  }

  // --- 6. Generar el bloque listo para data.ts ---
  const formatted = results.map((p, i) => ({
    id: i + 1,
    title: titleFromCaption(p.caption) || `Obra ${i + 1}`,
    caption: p.caption || '',
    medium: 'Obra',
    year: p.date ? new Date(p.date).getFullYear() : new Date().getFullYear(),
    image: p.localFile || p.image,
    likes: p.likes ?? 0,
    comments: [],
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

  zip.file(`${SLUG}-posts.json`, JSON.stringify(payload, null, 2));

  // --- 7. Empaquetar y descargar ---
  console.log('%c[scraper] empaquetando zip…', 'color:#0095f6');
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(zipBlob, `${SLUG}-export.zip`);

  // También JSON suelto por si falla el zip en algún navegador
  const jsonBlob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  triggerDownload(jsonBlob, `${SLUG}-posts.json`);

  console.log(
    `%c[scraper] LISTO — ${results.length} posts exportados`,
    'color:#10b981;font-weight:bold;font-size:14px'
  );
  console.log(
    `%c→ Descomprime el zip y mueve la carpeta /obras a /public/ del proyecto`,
    'color:#10b981'
  );
  console.log(
    `%c→ Reemplaza el array \`posts\` en src/data.ts con el contenido de \`posts\` del JSON`,
    'color:#10b981'
  );

  // exponer en window para inspección
  window.__scraperResult = payload;
  return payload;
})();

// ============================================================================
// Helpers
// ============================================================================
function decodeHtml(s) {
  const div = document.createElement('div');
  div.innerHTML = s;
  return div.textContent || '';
}

function titleFromCaption(caption) {
  if (!caption) return null;
  // primera oración o primeras 6 palabras
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
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
