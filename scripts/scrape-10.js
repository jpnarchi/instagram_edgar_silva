/* ============================================================================
 *  DESCARGAR 10 POSTS DE INSTAGRAM — versión mínima
 *  ---------------------------------------------------------------------------
 *  1. Ve a https://www.instagram.com/edgesilvame/ logueado.
 *  2. Abre la consola (Cmd+Opt+J en Chrome).
 *  3. Pega ESTE archivo completo. Enter.
 *  4. Chrome pedirá permiso para descargar múltiples archivos al primer intento:
 *     click el icono de descarga arriba a la derecha y dale "Permitir".
 *     Después corre el script de nuevo (recarga la página y vuelve a pegar).
 *  5. Se descargan 10 JPG + 1 JSON.
 * ============================================================================ */

(async () => {
  const LIMIT = 10;
  const log = (m, c = '#0095f6') =>
    console.log(`%c[10] ${m}`, `color:${c};font-weight:bold`);

  // 1) Recolectar shortcodes visibles del feed (sin scroll auto: usa los que ya hay)
  const shortcodes = [];
  document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]').forEach((a) => {
    const m = a.getAttribute('href').match(/\/(p|reel)\/([^/?]+)/);
    if (m && !shortcodes.find((s) => s.code === m[2])) {
      shortcodes.push({ code: m[2], type: m[1] });
    }
  });

  if (shortcodes.length < LIMIT) {
    log(`solo hay ${shortcodes.length} posts visibles, haz scroll un poco antes`, '#f59e0b');
  }
  const selected = shortcodes.slice(0, LIMIT);
  log(`procesando ${selected.length} posts…`, '#10b981');

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // 2) Fetch info y descarga, uno por uno (más confiable contra throttling)
  const results = [];
  for (let i = 0; i < selected.length; i++) {
    const { code, type } = selected[i];
    const idx = String(i + 1).padStart(2, '0');
    try {
      // info de la página del post
      const html = await fetch(`https://www.instagram.com/${type}/${code}/`, {
        credentials: 'include',
      }).then((r) => r.text());

      const og = (prop) => {
        const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]+)"`));
        return m ? decodeHtml(m[1]) : null;
      };
      const image = og('og:image');
      const desc = og('og:description') || '';

      let likes = 0, comments = 0, date = null, caption = '';
      const m = desc.match(
        /([\d,\.]+)\s+likes?,\s+([\d,\.]+)\s+comments?\s+-\s+[\w.]+\s+on\s+([^:]+):\s+"([\s\S]+)"/
      );
      if (m) {
        likes = parseInt(m[1].replace(/[^\d]/g, ''), 10);
        comments = parseInt(m[2].replace(/[^\d]/g, ''), 10);
        date = m[3].trim();
        caption = m[4].trim();
      }

      if (!image) {
        log(`✗ ${idx} ${code}: sin imagen og:image`, '#ef4444');
        continue;
      }

      // descargar imagen como blob → trigger <a download>
      const blob = await fetch(image, { credentials: 'omit' }).then((r) => r.blob());
      const filename = `${idx}-${code}.jpg`;
      triggerDownload(blob, filename);
      log(`✓ ${idx}/${selected.length}  ${filename}  (${likes} ❤  ${comments} 💬)`, '#10b981');

      results.push({
        id: i + 1,
        title: titleFromCaption(caption) || `Obra ${i + 1}`,
        caption,
        medium: 'Obra',
        year: date ? new Date(date).getFullYear() : new Date().getFullYear(),
        image: `/obras/${filename}`,
        likes,
        commentsCount: comments,
        comments: [],
        isReel: type === 'reel',
        isCarousel: false,
        time: relativeTime(date),
        sourceUrl: `https://www.instagram.com/${type}/${code}/`,
      });

      await sleep(800); // pausa entre cada uno
    } catch (err) {
      log(`✗ ${idx} ${code}: ${err.message}`, '#ef4444');
    }
  }

  // 3) JSON final
  const json = JSON.stringify(
    { profile: { username: 'edgesilvame', count: results.length }, posts: results },
    null,
    2
  );
  triggerDownload(new Blob([json], { type: 'application/json' }), 'edgesilvame-10.json');

  log(`LISTO — ${results.length} imágenes + 1 JSON descargados`, '#10b981');
  log(`Si Chrome bloqueó, autoriza "Descargas automáticas" y corre de nuevo.`, '#f59e0b');
  window.__scraped = results;
  return results;
})();

function decodeHtml(s) {
  const d = document.createElement('div');
  d.innerHTML = s;
  return d.textContent || '';
}
function titleFromCaption(c) {
  if (!c) return null;
  const w = c.replace(/\s+/g, ' ').split(/[.\n·—]/)[0].trim().split(' ');
  return w.slice(0, 6).join(' ') + (w.length > 6 ? '…' : '');
}
function relativeTime(s) {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d)) return '';
  const days = Math.floor((Date.now() - d) / 86400000);
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
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 3000);
}
