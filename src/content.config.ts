import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Um arquivo por projeto e idioma: src/content/projects/<en|pt>/<slug>.md
// O id vira "en/fipe"; o slug é a parte depois da barra e é o mesmo nos dois idiomas.
// Ordem e categoria (projeto ou benchmark) ficam em src/data/project-order.ts.
// Formato e limites de cada bloco: docs/decisions/0002-apresentacao-dos-projetos.md.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => {
    const shot = z.object({ src: image(), alt: z.string(), caption: z.string().max(90) });
    const metric = z.object({
      value: z.string().max(14), // "82.2%", "US$ 35", "374k" (decimal do idioma)
      label: z.string().max(32),
      note: z.string().max(60).optional(), // só na página
    });
    return z
      .object({
        title: z.string().max(40),
        summary: z.string().max(120), // o que o projeto faz ou testa, sem números: card, topo da página e meta description
        question: z.string().max(90).optional(), // pergunta que o benchmark responde (obrigatória em benchmark)
        metrics: z.array(metric).max(4).default([]), // stat tiles, só na página (até 4)
        year: z.number().int(),
        context: z.string().max(60).optional(), // ex.: "Personal project", "Team project with @x"
        stack: z.array(z.string()).min(1).max(8), // o card mostra os 3 primeiros
        repo: z.string().optional(),
        demo: z.string().optional(),
        writeup: z.string().optional(), // post ou artigo sobre o projeto
        cover: image().optional(), // sem cover, entra a capa provisória
        coverAlt: z.string().optional(),
        figure: shot.optional(), // gráfico-chave do benchmark, sempre visível
        gallery: z.array(shot).max(6).default([]), // carrossel a partir de 2 imagens
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.cover || d.coverAlt, { message: 'coverAlt é obrigatório quando há cover', path: ['coverAlt'] });
  },
});

export const collections = { projects };
