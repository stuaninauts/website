# 0001: Fundação do site

**Data:** 2026-10-08 · **Status:** aceita

## Decisões
- **Astro estático** em vez de HTML puro: projetos viram arquivos Markdown (fácil de adicionar, inclusive por agentes),
  i18n nativo e imagens otimizadas no build. Sem framework de UI: JS só onde precisa (tema, email, aviso de idioma).
- **EN padrão, PT em `/pt`:** EN para recrutadores de fora e para a URL sem prefixo; PT completo para empresas brasileiras.
  Sem redirecionamento automático por idioma (atrapalha buscadores); há um aviso discreto para navegadores em português.
- **Cloudflare Workers static assets + Workers Builds:** o domínio já está na Cloudflare; a Cloudflare recomenda Workers
  (não Pages) para projetos novos; o deploy via integração com Git não guarda token da Cloudflare no GitHub.
- **GitHub Flow** com PR obrigatório (0 aprovações) e CI como status check; o histórico de PRs registra cada mudança.
- **Tema japonês discreto:** paleta de cores tradicionais (yoru/sakura), ensō e carimbo 宙. Kanji só como ornamento
  `aria-hidden`, para não parecer site em japonês. O porquê está no card "Why stuaninauts?".
- **Repositório novo** em vez de reaproveitar o antigo: o histórico antigo (44 MB, EC2 desativada) ficou em
  `website-legacy`, privado e arquivado, para não vazar nada ao tornar este público.

Fontes das boas práticas: `docs/research/boas-praticas.md`.
