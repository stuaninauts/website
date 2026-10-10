// Gera src/styles/kanji.css + public/fonts/IBMPlexSansJP-*-kanji.woff2 só com os kanji usados em src/
// (e letras latinas com macron, como ō/ū de ensō/chū, que ficam fora do subset latino).
// Rode depois de adicionar kanji novos:  npm run fonts:kanji   (precisa de internet só nessa hora)
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const EXT = new Set(['.astro', '.ts', '.md', '.mjs', '.js', '.css']);
const UA = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126' };

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(p))) yield p;
  }
}

let text = '';
for await (const f of walk(join(ROOT, 'src'))) if (!f.endsWith('kanji.css')) text += await readFile(f, 'utf8');
const pick = (re) => [...new Set([...text].filter((c) => re.test(c)))].sort().join('');
const cjk = pick(/[　-鿿＀-￯]/);
// A Plex Sans JP monta ō/ū com acento combinante (fica torto); a Plex Sans tem os glifos prontos.
const ext = pick(/[Ā-ɏ]/);
if (!cjk) throw new Error('nenhum kanji encontrado em src/');

const toRange = (chars) => [...chars].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(', ');
const subsets = [
  { chars: cjk, family: 'IBM+Plex+Sans+JP', file: (w) => `IBMPlexSansJP-${w}-kanji.woff2` },
  { chars: ext, family: 'IBM+Plex+Sans', file: (w) => `IBMPlexSans-${w}-latinext.woff2` },
].filter((s) => s.chars);

const faces = [];
for (const { chars, family, file } of subsets) {
  for (const weight of [400, 500]) {
    const api = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(chars)}`;
    const css = await (await fetch(api, { headers: UA })).text();
    const src = css.match(/url\((https:\/\/[^)]+)\)/)?.[1];
    if (!src) throw new Error(`resposta inesperada do Google Fonts:\n${css}`);
    await writeFile(join(ROOT, 'public/fonts', file(weight)), Buffer.from(await (await fetch(src)).arrayBuffer()));
    faces.push(`@font-face { font-family: 'IBM Plex Sans JP'; font-style: normal; font-weight: ${weight}; font-display: swap; src: url(/fonts/${file(weight)}) format('woff2'); unicode-range: ${toRange(chars)}; }`);
  }
}

await writeFile(join(ROOT, 'src/styles/kanji.css'), `/* Gerado por scripts/subset-kanji.mjs, não edite à mão. Caracteres: ${cjk}${ext} */\n${faces.join('\n')}\n`);
console.log(`${cjk.length} kanji: ${cjk}` + (ext ? ` · latino estendido: ${ext}` : ''));
