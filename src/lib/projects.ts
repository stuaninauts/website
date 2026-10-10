import { getCollection, type CollectionEntry } from 'astro:content';
import { projectOrder, type ProjectCategory } from '../data/project-order';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;
export type Grouped = Record<ProjectCategory, Project[]>;

export const projectSlug = (p: Project) => p.id.split('/')[1];
export const categories = Object.keys(projectOrder) as ProjectCategory[];

/** Projetos de um idioma, agrupados e ordenados por src/data/project-order.ts (falha se o arquivo e o conteúdo divergirem). */
export async function getProjects(lang: Lang): Promise<Grouped> {
  const list = await getCollection('projects', (e) => e.id.startsWith(`${lang}/`) && !e.data.draft);
  const bySlug = new Map(list.map((p) => [projectSlug(p), p]));
  const ordered = categories.flatMap((c) => projectOrder[c] as readonly string[]);
  const missing = [...bySlug.keys()].filter((s) => !ordered.includes(s));
  const unknown = ordered.filter((s) => !bySlug.has(s));
  const repeated = ordered.filter((s, i) => ordered.indexOf(s) !== i);
  if (missing.length || unknown.length || repeated.length) {
    throw new Error(
      `src/data/project-order.ts não bate com src/content/projects/${lang}/: ` +
        [missing.length && `sem posição: ${missing.join(', ')}`, unknown.length && `sem arquivo: ${unknown.join(', ')}`, repeated.length && `repetidos: ${repeated.join(', ')}`]
          .filter(Boolean)
          .join(' · '),
    );
  }
  const grouped = Object.fromEntries(categories.map((c) => [c, (projectOrder[c] as readonly string[]).map((s) => bySlug.get(s)!)])) as Grouped;
  // Benchmark precisa responder uma pergunta com números (ver docs/decisions/0002).
  for (const b of grouped.benchmarks) {
    if (!b.data.question || b.data.metrics.length < 3) {
      throw new Error(`benchmark ${b.id}: precisa de \`question\` e de pelo menos 3 \`metrics\``);
    }
  }
  return grouped;
}

export async function projectPaths(lang: Lang) {
  const grouped = await getProjects(lang);
  return categories.flatMap((category) =>
    grouped[category].map((project, i, list) => ({
      params: { slug: projectSlug(project) },
      props: { project, category, prev: list[i - 1], next: list[i + 1] },
    })),
  );
}
