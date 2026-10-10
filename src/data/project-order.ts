// Ordem de exibição na home e em /projects, por categoria. Edite com a skill /ordenar-projetos.
// Cada slug (nome do .md, igual em EN e PT) aparece uma única vez; o build falha se faltar ou sobrar algum.
export const projectOrder = {
  projects: ['fipe', 'enem'],
  benchmarks: ['laya-vs-llms'],
} as const satisfies Record<string, readonly string[]>;

export type ProjectCategory = keyof typeof projectOrder;
