# stuaninauts.com

Site pessoal e portfólio de Eduardo Stuani (Data & AI Engineer). Astro 7 estático, EN padrão + PT em `/pt`,
deploy na Cloudflare (Workers static assets). Repositório público: tudo aqui é lido por qualquer pessoa.

## Comandos
- Node: versão em `.node-version` (24 LTS). `npm install` também instala os git hooks (lefthook).
- `npm run dev` · `npm run check` (astro check) · `npm run build` · `npm run preview`
- A CSP só existe no build: valide com `npm run build && npm run preview`, nunca só no `dev`.
- `npm run fonts:kanji` depois de usar kanji ou letra com macron (ō, ū) nova em `src/`, senão o glifo cai na fonte do sistema.
- Antes de qualquer PR: `npm run check && npm run build` precisam passar.

## Onde mora cada coisa
- Rotas finas em `src/pages/` (EN na raiz, PT em `src/pages/pt/`) que só chamam uma view de `src/views/` com `lang`.
- Textos de interface: `src/i18n/ui.ts` (o objeto `pt` é tipado pelas chaves de `en`: chave nova nos dois).
- Perfil, experiência e stack: `src/data/profile.ts` (um objeto por idioma).
- Projetos: `src/content/projects/<en|pt>/<slug>.md`, schema em `src/content.config.ts`. Mesmo slug nos dois idiomas.
- Ordem e categoria (projetos / benchmarks) dos cards: `src/data/project-order.ts`, editado pela skill `/ordenar-projetos`.
  Projeto novo precisa entrar ali, senão o build falha.
- Formato dos projetos: `docs/decisions/0002-apresentacao-dos-projetos.md`. `summary` (≤ 120) é o resultado no benchmark e o que o projeto faz no projeto;
  `metrics` são os números (até 4 na página; no card, só em benchmark); benchmark exige `question` e 3+ `metrics`. Só fatos do repo do projeto.
- Capas: imagem temática japonesa por projeto, sem texto nem números (prompts em `prompts/`, fora do git). Sem `cover`, entra a capa provisória.
- Imagens otimizadas em `src/assets/` via `<Image />`; `public/` é copiado sem otimização.
- Headers HTTP: `public/_headers`. CSP de script/style: `security.csp` em `astro.config.mjs`.
- Decisões de arquitetura: `docs/decisions/`. Pesquisa de boas práticas com fontes: `docs/research/`.

## Regras
- Toda página e todo texto existem em EN **e** PT. Projeto novo = dois arquivos `.md` com o mesmo slug + entrada em `project-order.ts`.
- Nenhum script inline sem hash na CSP. O único inline é `src/scripts/theme-init.js`, cujo hash é calculado no config.
  Nada de CDN externa (fontes são self-hosted em `public/fonts/`).
- Nunca expor telefone, endereço ou email cru no HTML. Email: `contact@` (EN) e `contato@` (PT), aliases do Email Routing,
  montados no navegador (`Contact.astro`).
- Foto ou imagem nova: remover metadados antes de commitar (`exiftool -all= -overwrite_original <arquivo>`), porque o original fica público no repo.
- `alt` em toda imagem; contraste AA nos dois temas; alvos de toque ≥ 24px; kanji decorativo com `aria-hidden`.
- Kanji é tempero, não tema: rótulos pequenos de seção e o carimbo 宙. Não espalhar kanji por componentes novos.
- Textos em PT seguem o tom dos existentes; em EN, inglês natural (não tradução literal).
- Nunca use o travessão longo (em dash) em textos, comentários, docs ou commits. Use vírgula, dois-pontos, parênteses ou ponto.

## Git (GitHub Flow)
- IMPORTANT: nunca commitar nem dar push na `main`. Branch `tipo/descricao` → PR → CI verde → merge (squash).
- Commit, push e PR só quando o autor pedir: ele define os marcos e o que entra. Ao terminar uma etapa, deixe as
  mudanças no working tree, liste os arquivos e sugira a mensagem.
- Commits em Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `refactor:`).
- PRs: skill `/pr` (`.claude/skills/pr/`): gate de testes, push e PR aberto/atualizado direto pelo terminal,
  com `.github/pull_request_template.md` preenchido só com o que foi testado de fato.
- GitHub CLI: sempre `bash scripts/gh.sh ...` (conta dona do repo, config isolada). `gh` direto é bloqueado pelo hook,
  porque a conta padrão do `gh` pode não ser a dona do repo.
- Deploy é automático no merge na `main` (Workers Builds). Nunca `wrangler deploy` manual.
- `.claude/hooks/guard-bash.sh` bloqueia push na main, force push, `reset --hard`, `rm -rf`, `--no-verify`, deploy manual e `gh` direto.
  Testes do hook: `bash .claude/hooks/test-guard-bash.sh`.
- O pre-commit roda gitleaks. Se ele apontar algo, não contorne: remova o segredo e avise o humano.
