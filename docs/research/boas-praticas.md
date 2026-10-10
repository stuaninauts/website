# Boas práticas: repo público + Claude Code + Astro na Cloudflare

**Data:** 2026-10-08 · **Escopo:** github.com/stuaninauts/website (Astro estático, i18n EN/PT, deploy Cloudflare, domínio stuaninauts.com)
**Método:** só fontes primárias (docs oficiais, specs, READMEs dos projetos). O que não foi confirmado na fonte está marcado **(não verificado)**.

> Estado atual do repo, lido em 2026-10-08: Astro 7.3.8, Node 24.21.0 (`.node-version`), `security.csp` já ligado, sitemap com i18n, `.gitignore` já cobre `.env*`, `CLAUDE.local.md`, `.claude/settings.local.json` e `.wrangler/`. Ainda não existem `CLAUDE.md` nem `.claude/`. As imagens em `src/assets` e `public` não têm EXIF de GPS nem de câmera (verificado com exiftool).

## Resumo (5 linhas)

1. **Claude Code:** `CLAUDE.md` curto (menos de 200 linhas) e versionado. As regras que precisam valer sempre ficam em `.claude/settings.json` (permissões `deny`/`ask`) e num hook `PreToolUse`. O que é pessoal fica fora do git (`settings.local.json`, `CLAUDE.local.md`).
2. **Proteção de `main` no servidor, não só local:** um ruleset com PR obrigatório (**0 aprovações**, porque o autor não pode aprovar o próprio PR), status check do CI, bloqueio de force push e de deleção. O secret scanning e a push protection são grátis em repo público.
3. **Fluxo de trabalho:** GitHub Flow com Conventional Commits e PR mesmo trabalhando sozinho. O CI no GitHub Actions roda `astro check` e `build`, com actions pinadas por SHA e `permissions: contents: read`.
4. **Deploy:** Workers com static assets (a Cloudflare recomenda Workers, e não Pages, para projetos novos) via **Workers Builds**, a integração com Git. Assim nenhum token da Cloudflare fica guardado no GitHub.
5. **Site:** headers no `public/_headers` (só o que meta CSP não cobre: `frame-ancestors`, HSTS, nosniff, Referrer-Policy, Permissions-Policy). Nada de telefone ou endereço na página, um alias de e-mail no próprio domínio, hreflang/canonical/og completos, metas de WCAG 2.2 AA, imagens via `astro:assets` e fontes self-hosted.

---

## A. Claude Code (docs oficiais da Anthropic)

### CLAUDE.md
- **Tamanho:** mire em menos de 200 linhas por arquivo. Arquivos mais longos consomem contexto e reduzem a aderência. `@imports` organizam o conteúdo, mas **não economizam contexto**, porque também carregam no início da sessão. [memory](https://code.claude.com/docs/en/memory)
- **O que incluir:** comandos bash que o Claude não adivinha, regras de estilo que fogem do padrão, como rodar testes, etiqueta do repo (nomes de branch, convenção de PR), decisões de arquitetura e pegadinhas. **O que evitar:** o que dá para inferir do código, convenções-padrão da linguagem, docs longas, coisas que mudam com frequência, descrição arquivo por arquivo e frases óbvias como "write clean code". Teste para cada linha: "remover isto faria o Claude errar?". Use "IMPORTANT" em **uma** linha só, quando precisar. [best-practices](https://code.claude.com/docs/en/best-practices)
- **Escreva instruções verificáveis.** Por exemplo, "Run `npm test` before committing" em vez de "Test your changes". [memory](https://code.claude.com/docs/en/memory)
- **Imports:** a sintaxe é `@path/to/file`. Caminhos relativos resolvem a partir do arquivo que importa. A profundidade máxima é de **4 saltos**. Dentro de crases ou blocos de código o `@` não é importado. Imports de fora do projeto pedem aprovação. [memory](https://code.claude.com/docs/en/memory)
- **`CLAUDE.local.md`:** preferências pessoais do projeto, na raiz. É carregado depois do `CLAUDE.md` e **deve ir para o `.gitignore`**. [memory](https://code.claude.com/docs/en/memory)
- **Subpastas:** um `CLAUDE.md` numa subpasta carrega **sob demanda**, quando o Claude lê ou edita um arquivo daquela pasta. Para regras por tipo de arquivo, use `.claude/rules/*.md` com frontmatter `paths:`. [memory](https://code.claude.com/docs/en/memory)
- **CLAUDE.md é contexto, não enforcement.** Para bloquear algo de verdade, use hook `PreToolUse` ou permissão. [memory](https://code.claude.com/docs/en/memory) · [permissions](https://code.claude.com/docs/en/permissions)
- **Repo público:** tudo no `CLAUDE.md` fica público. Não coloque e-mail pessoal, telefone, URLs internas nem caminhos da sua máquina.

Esqueleto sugerido (cerca de 30 linhas):

```markdown
# stuaninauts.com: site pessoal (Astro estático, EN padrão + PT)

## Comandos
- `npm run dev` · `npm run check` (astro check) · `npm run build` · `npm run preview`
- CSP só funciona em build: valide com `npm run build && npm run preview`

## Estrutura
- Páginas: `src/pages/` (EN na raiz, PT em `src/pages/pt/`); textos de UI em `src/i18n/`
- Imagens otimizadas em `src/assets/` (usar `<Image />`/`<Picture />`); `public/` não é otimizado
- Headers HTTP: `public/_headers`; CSP de script/style: `security.csp` em `astro.config.mjs`

## Regras
- Toda página nova existe em EN **e** PT, com hreflang/canonical corretos
- Nunca script inline sem hash na CSP (ver astro.config.mjs); sem CDNs externas
- `alt` obrigatório; contraste AA; alvo de toque ≥ 24×24px
- Nunca expor telefone, endereço ou e-mail pessoal no HTML

## Git
- IMPORTANT: nunca commitar em `main`; criar branch `tipo/descricao` e abrir PR com `gh pr create`
- Mensagens no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...)
- Antes do PR: `npm run check && npm run build` precisam passar
```

### `.claude/`: o que vai para o git
| Caminho | Commitar? | Por quê / fonte |
|---|---|---|
| `CLAUDE.md`, `.claude/rules/` | Sim | instruções compartilhadas ([memory](https://code.claude.com/docs/en/memory)) |
| `.claude/settings.json` | Sim | permissões e hooks do projeto ([settings](https://code.claude.com/docs/en/settings)) |
| `.claude/settings.local.json` | **Não** | pessoal. O Claude Code o põe no excludes global do git quando cria o arquivo; se você criar à mão, ponha no `.gitignore` ([settings](https://code.claude.com/docs/en/settings)) |
| `.claude/hooks/*.sh` | Sim | precisam ser executáveis (`chmod +x`) ([hooks-guide](https://code.claude.com/docs/en/hooks-guide)) |
| `.claude/agents/*.md` | Sim | a doc recomenda versionar ([sub-agents](https://code.claude.com/docs/en/sub-agents)) |
| `.claude/skills/<nome>/SKILL.md` | Sim | "Commit `.claude/skills/`" ([skills](https://code.claude.com/docs/en/skills)) |
| `.claude/worktrees/` | **Não** | a doc manda pôr no `.gitignore` ([worktrees](https://code.claude.com/docs/en/worktrees)) |
| `.mcp.json` | Só sem segredos | use `${VAR}` para chaves ([mcp](https://code.claude.com/docs/en/mcp)) |
| `CLAUDE.local.md` | **Não** | ([memory](https://code.claude.com/docs/en/memory)) |

- **Precedência:** managed, depois `--settings`, depois `.claude/settings.local.json`, depois `.claude/settings.json`, depois `~/.claude/settings.json`. Os arquivos são JSON estrito: sem comentários e sem vírgula final. [settings](https://code.claude.com/docs/en/settings)
- **Workspace trust:** regras `allow` de um `settings.json` commitado só valem depois que quem clonou confia na pasta. `deny` e `ask` valem na hora. [settings](https://code.claude.com/docs/en/settings)
- **Skills:** o `allowed-tools` de uma skill **concede** permissão no turno em que ela é invocada, e isso não depende de workspace trust. Revise o que você commita. Use `disable-model-invocation: true` em skills com efeito colateral, como deploy. [skills](https://code.claude.com/docs/en/skills)
- **Subagents:** arquivo Markdown com frontmatter (`name` e `description` são obrigatórios; `tools`, `model` e outros são opcionais). Um agente de projeto sobrepõe um de usuário com o mesmo nome. [sub-agents](https://code.claude.com/docs/en/sub-agents)

### Permissões: sintaxe exata
- A ordem de avaliação é **deny, depois ask, depois allow**. Ganha o primeiro match. Um `allow` não abre exceção dentro de um `deny`. [permissions](https://code.claude.com/docs/en/permissions)
- O formato é `Tool` ou `Tool(especificador)`. Exemplos: `Bash(npm run *)` (o espaço antes do `*` conta), `Read(./.env)`, `WebFetch(domain:example.com)`. Ponha o `*` **depois** do subcomando, como em `Bash(git log *)`. [permissions](https://code.claude.com/docs/en/permissions)
- **Caminhos em Read/Edit:** `//abs`, `~/home`, `/relativo-ao-settings` e `./relativo-ao-cwd`, todos com sintaxe de gitignore. Um `deny` de `Read` também bloqueia Edit/Write no mesmo caminho. `.claudeignore` não tem efeito. [permissions](https://code.claude.com/docs/en/permissions)
- **Limite:** uma regra Bash casa com o texto do comando. `Bash(git push *)` não pega `git -C . push` nem `sh -c '...'`. Para enforcement real de arquivo ou rede, use sandbox. Para lógica própria, use hook. [permissions](https://code.claude.com/docs/en/permissions)
- **Exemplo oficial:** `"deny": ["Read(./.env)", "Read(./.env.*)"]`. [settings](https://code.claude.com/docs/en/settings)

### Hooks como guardrail
- O hook `PreToolUse` roda **antes** do prompt de permissão e em **todos** os modos, inclusive `bypassPermissions`. Um `deny` vindo de hook não é contornado pelo modo. [hooks-guide](https://code.claude.com/docs/en/hooks-guide)
- **Entrada:** JSON no stdin, com `tool_name`, `tool_input.command`, `cwd` e outros campos. [hooks](https://code.claude.com/docs/en/hooks)
- **Saída:**
  - **exit 2** bloqueia, e o stderr vira feedback para o Claude.
  - **exit 0** significa "sem objeção" (segue o fluxo normal), ou pode vir acompanhado de JSON `{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"..."}}`.
  - **Qualquer outro código** é erro não bloqueante.
  - Escolha **um** estilo por hook. [hooks-guide](https://code.claude.com/docs/en/hooks-guide) · [hooks](https://code.claude.com/docs/en/hooks)
- **Referencie o script por `"$CLAUDE_PROJECT_DIR"`.** O filtro `if` (por exemplo `"Bash(git *)"`) é *best-effort*. Para um guardrail, prefira rodar o hook em todo `Bash`. [hooks-guide](https://code.claude.com/docs/en/hooks-guide)
- **Um hook é guardrail, não fronteira de segurança.** A proteção real de `main` é o ruleset no GitHub (seção B).

`.claude/settings.json` (pronto):

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npx astro check)",
      "Bash(git switch *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(gh pr create *)",
      "Bash(gh pr view *)"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(npm install *)",
      "Bash(npx wrangler *)",
      "Bash(gh pr merge *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./.dev.vars)",
      "Read(./.dev.vars.*)",
      "Read(~/.ssh/**)",
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Bash(rm -rf *)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/guard-bash.sh" }
        ]
      }
    ]
  }
}
```

`.claude/hooks/guard-bash.sh` (testado localmente com 18 casos; precisa de `jq`, como os exemplos oficiais):

```bash
#!/usr/bin/env bash
# PreToolUse(Bash): bloqueia comandos git/rm destrutivos. Guardrail, não fronteira de segurança.
set -uo pipefail
command -v jq >/dev/null || { echo "guard-bash: jq ausente, bloqueando por segurança" >&2; exit 2; }
INPUT=$(cat)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')
CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // empty')

block() { echo "Bloqueado por .claude/hooks/guard-bash.sh: $1. Se for intencional, o humano roda manualmente." >&2; exit 2; }
has() { printf '%s' "$CMD" | grep -Eq -- "$1"; }

# rm recursivo + forçado (-rf, -fr, -r -f, --recursive --force)
if has '(^|[;&|( ])rm[[:space:]]' && has '[[:space:]]-(-recursive|[a-zA-Z]*[rR])' && has '[[:space:]]-(-force|[a-zA-Z]*f)'; then
  block "rm recursivo forçado"
fi
has '\bgit\b.*\breset\b.*--hard' && block "git reset --hard"
has '\bgit\b.*\bclean\b.*[[:space:]]-[a-zA-Z]*f' && block "git clean -f"
if has '\bgit\b.*\bpush\b'; then
  has '(--force|--force-with-lease|--mirror|--delete|[[:space:]]-[a-zA-Z]*[fd]\b|[[:space:]]\+[^[:space:]]+)' && block "git push forçado/destrutivo"
  has '([[:space:]:]|refs/heads/)(main|master)([[:space:]]|$)' && block "git push para main/master (use branch + PR)"
  BRANCH=$(git -C "${CWD:-.}" rev-parse --abbrev-ref HEAD 2>/dev/null || true)
  [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]] && block "git push estando em $BRANCH (use branch + PR)"
fi
exit 0
```

O hook bloqueia `rm -rf x`, `rm -r -f x`, `git reset --hard`, `git clean -fd`, `git push origin main`, `git -C . push origin main`, `git push origin HEAD:main`, `git push -f`/`--force-with-lease`/`+ref`/`--delete`, e um `git push` sem argumentos estando em `main`. Deixa passar `git push -u origin feat/x` e `git push origin feat/main-page`. Rode `chmod +x .claude/hooks/guard-bash.sh`.

---

## B. Segurança de repo público no GitHub

- **Secret scanning:** roda automaticamente e de graça em repos públicos. [about-secret-scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Push protection:** grátis em repos públicos. [about-github-advanced-security](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security)
  - A versão de **usuário** vem ativa por padrão e bloqueia seus pushes com segredo para repos públicos. Ela não gera alerta quando é contornada.
  - A versão de **repositório** vem desligada. Ligue em *Settings → Advanced Security → Secret Protection → Push protection → Enable*.
  - [about-push-protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection) · [enabling-push-protection](https://docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-push-protection-for-your-repository)
- **Se um segredo vazar:** **primeiro revogue ou rotacione**, e só depois reescreva o histórico (`git-filter-repo --sensitive-data-removal`). [removing-sensitive-data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- **E-mail de commit:** use o e-mail `noreply` do GitHub e ative "Keep my email addresses private". [commit email](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)

### gitleaks no pre-commit (sem Python)
- **Status do projeto:** o gitleaks está "feature complete" e recebe só patches de segurança. O autor migrou para o **Betterleaks**, que está em transição v1→v2 (a release estável mais recente que encontrei é a v1.9.0). Para hoje, use **gitleaks v8.30.1**, o binário estável, e reavalie depois. [gitleaks README](https://github.com/gitleaks/gitleaks) · [betterleaks](https://github.com/betterleaks/betterleaks)
- **Instalação sem Python:** binário da [página de releases](https://github.com/gitleaks/gitleaks/releases), `brew install gitleaks`, Docker ou `go install`. [gitleaks README](https://github.com/gitleaks/gitleaks)
- **Comando de pre-commit**, o mesmo que o próprio projeto usa: `gitleaks git --pre-commit --redact --staged --verbose`. [.pre-commit-hooks.yaml](https://github.com/gitleaks/gitleaks/blob/master/.pre-commit-hooks.yaml)
- **Antes de tornar o repo público,** varra o histórico inteiro com `gitleaks git -v`. [gitleaks README](https://github.com/gitleaks/gitleaks)

| Opção | Precisa de | Prós | Contras |
|---|---|---|---|
| framework `pre-commit` | Python | integração oficial do gitleaks | Python |
| **lefthook** (recomendado) | npm (`npm i -D lefthook`) ou binário | YAML simples, roda jobs em paralelo, v2.2.1 | mais uma dependência |
| husky | npm (`npx husky init`) | é o mais comum em projetos JS; o hook é um script shell | um arquivo por hook |

Fontes: [lefthook](https://github.com/evilmartians/lefthook) · [husky](https://typicode.github.io/husky/get-started.html)

`lefthook.yml` (depois rode `npx lefthook install`; o binário `gitleaks` precisa estar no PATH):

```yaml
pre-commit:
  jobs:
    - name: gitleaks
      run: gitleaks git --pre-commit --redact --staged --verbose
```

- Hooks locais podem ser pulados com `git commit --no-verify` ([githooks](https://git-scm.com/docs/githooks)). Por isso a push protection do servidor é a rede de segurança.

### .gitignore
O atual já está bom. Faltam estas linhas ([worktrees](https://code.claude.com/docs/en/worktrees); o `.dev.vars` segue a convenção de segredos locais do Wrangler **(não verificado)**):
```gitignore
.claude/worktrees/
.dev.vars
.dev.vars.*
```

### Dependabot
- **Dependabot alerts:** fazem parte do plano Free. [githubs-plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)
- **Version updates:** o arquivo `.github/dependabot.yml` começa com `version: 2`. Para actions, use `directory: "/"`. [configuring version updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates) · [auto-update-actions](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/auto-update-actions)
- **Cooldown:** já existe um padrão de **3 dias** para version updates. `groups` junta várias atualizações em um PR. [options reference](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference)
- **Actions pinadas por SHA:** o Dependabot atualiza o comentário de versão ao lado do SHA ([changelog GitHub](https://github.blog/changelog/2022-10-31-dependabot-now-updates-comments-in-github-actions-workflows-referencing-action-versions/)). Os *alerts*, porém, não cobrem actions pinadas por SHA. [secure-use](https://docs.github.com/en/actions/reference/security/secure-use)

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    cooldown:
      default-days: 7
    groups:
      npm-minor-patch:
        update-types: ["minor", "patch"]
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      actions:
        patterns: ["*"]
```

### Ruleset para `main` (conta pessoal grátis, sem se trancar)
- **Disponibilidade:** rulesets existem em repos **públicos** no GitHub Free. [about-rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- **O ponto que causa o problema:** "Pull request authors cannot approve their own pull requests." [approving PRs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews)
- **A saída:** use "Require a pull request before merging" com **Required approvals = 0**. A doc diz que o PR "doesn't necessarily have to be approved, but it must be opened" e cita explicitamente repos que usam PR "as a record of changes rather than to gate on approvals". [available-rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)

Configuração (*Settings → Rules → Rulesets → New branch ruleset*):

| Campo | Valor |
|---|---|
| Target | Default branch |
| Enforcement | Active |
| Restrict deletions | ligado (padrão) |
| Block force pushes | ligado (padrão) |
| Require a pull request before merging | approvals = **0** |
| Require status checks to pass | `build` (o job do CI) |
| Require linear history | opcional (precisa de squash ou rebase habilitado) |
| Bypass list | **vazio** |

- **Por que deixar o bypass vazio:** como admin você sempre pode editar ou desativar o ruleset numa emergência, e esse é o "escape". Admins de repositório podem entrar na bypass list se você quiser. [creating-rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)
- **Status check em modo "Strict"** (branch atualizada antes do merge) é o padrão. Para um projeto solo, "Loose" reduz rebuilds. [available-rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)

### SECURITY.md
- Ative o **Private vulnerability reporting** (disponível para repos públicos) e crie o `SECURITY.md` em *Security → Policy*. [private vulnerability reporting](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configuring-private-vulnerability-reporting-for-a-repository) · [security policy](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository)

```markdown
# Security Policy
Only the latest version deployed at https://stuaninauts.com is supported.
Please report vulnerabilities privately via GitHub: Security → "Report a vulnerability".
Do not open public issues for security problems.
```

### Licença: código MIT + conteúdo com direitos reservados
- **Sem licença,** vale o copyright padrão: ninguém pode reproduzir nem derivar. A detecção de licença do GitHub (Licensee) lê **um** `LICENSE`. Se você misturar licenças nele, ela falha. A recomendação é "simplify your LICENSE file and note the complexity somewhere else, such as your README". [licensing-a-repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
- **Creative Commons não serve para software.** Para mídia, ela recomenda licenças CC e manda "clearly mark which parts are under the CC license and which parts are not". [CC FAQ](https://creativecommons.org/faq/) · [choosealicense non-software](https://choosealicense.com/non-software/)
- **Recomendação:**
  - `LICENSE` com o texto MIT, que o GitHub reconhece.
  - Uma seção "License" no README: código sob MIT; textos em `src/content/**` e fotos em `src/assets/**` com **todos os direitos reservados**. Prefira isso a CC BY-NC para fotos pessoais, porque NC ainda permite redistribuir o seu rosto. Se quiser permitir reuso dos textos, use CC BY-NC 4.0.
- **Opcional e formal:** a [especificação REUSE 3.3](https://reuse.software/spec-3.3/) usa `REUSE.toml` com `[[annotations]] path = "src/content/**"` e `SPDX-License-Identifier = "LicenseRef-AllRightsReserved"`, e coloca os textos em `LICENSES/`.

---

## C. Fluxo git para projeto solo

- **GitHub Flow, não git-flow.** O próprio autor do git-flow escreve que, para software entregue continuamente (como web apps), deve-se adotar "a much simpler workflow (like GitHub flow)". [nvie, note of reflection](https://nvie.com/posts/a-successful-git-branching-model/) · [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- **Os passos:** criar a branch, commitar, abrir o PR (pode ser draft), esperar os checks, fazer merge e apagar a branch. [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- **PR mesmo sozinho:** é onde o CI e o preview do Workers Builds rodam antes de chegar em `main`, e o histórico do PR fica guardado. [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) · [Workers GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
- **Conventional Commits 1.0.0:** o formato é `<type>[optional scope]: <description>`. `feat` corresponde a MINOR, `fix` a PATCH, e `!` ou `BREAKING CHANGE:` a MAJOR. `docs`, `chore`, `ci`, `refactor` e outros são permitidos. [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)

### CI (GitHub Actions)
- **Permissões do token:** deixe o `GITHUB_TOKEN` com **leitura** por padrão e eleve por job só quando precisar. [secure-use](https://docs.github.com/en/actions/reference/security/secure-use) · [GITHUB_TOKEN](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token)
- **Pinagem:** fixe cada action por **SHA completo**. É "the only way to use an action as an immutable release". Existe uma política de repositório que exige SHA. [secure-use](https://docs.github.com/en/actions/reference/security/secure-use)
- **`astro check` no CI:** a doc diz que ele "is intended to be used in CI workflows" e que sai com código 1 quando encontra erro. [CLI reference](https://docs.astro.build/en/reference/cli-reference/)
- **Versão do Node:** o Astro exige Node ≥ 22.12 e não suporta versões ímpares. [install](https://docs.astro.build/en/install-and-setup/)
- **SHAs:** os SHAs abaixo foram resolvidos via API do GitHub em 2026-10-08. `node-version-file` aceita `.node-version`. [setup-node action.yml](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/action.yml)

`.github/workflows/ci.yml`:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
      - uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0
        with:
          node-version-file: .node-version
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

### Deploy: Workers Builds vs wrangler-action
- **Workers ou Pages?** A Cloudflare diz: "If you are starting a new project, use Workers instead of Pages", e "Workers Static Assets is the recommended way to deploy static sites". [Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- **Adapter:** um site estático **não** precisa do adapter `@astrojs/cloudflare`. [Astro deploy Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- **Recomendação: Workers Builds** (integração com Git), por ser o caminho mais simples e mais seguro:
  - O GitHub App é instalado só no repositório escolhido ("Only select repositories").
  - Os builds aparecem como **check runs** no GitHub, e o PR recebe comentário com a URL de preview.
  - **Nenhum token da Cloudflare fica no GitHub.**
  - [Workers GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
  - O deploy padrão é `npx wrangler deploy` na branch de produção (`main`). Outras branches geram preview, e a versão do Wrangler vem do `package.json`. [builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- **wrangler-action:** exige guardar `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` como secrets do GitHub, com escopo "Edit Cloudflare Workers" e o mínimo de contas e zonas. Só vale a pena se você quiser o deploy condicionado ao CI dentro do mesmo workflow. [external CI/CD](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
- **Custom domain:** `custom_domain: true` cria o DNS e o certificado automaticamente. [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

`wrangler.jsonc` (não precisa de `main`, porque o site é só assets):

```jsonc
{
  "name": "stuaninauts-website",
  "compatibility_date": "2026-10-08",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  },
  "routes": [{ "pattern": "stuaninauts.com", "custom_domain": true }]
}
```

- Fontes: [Cloudflare Astro guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/) e [migração Pages→Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/), que diz que o 404 precisa ser configurado explicitamente no Workers. O valor `"404-page"` está **(não verificado)**.
- `workers_dev: false`, para não servir o site duplicado em `*.workers.dev`, também está **(não verificado)**.

---

## D. Site estático: headers, privacidade, SEO, a11y, performance

### Headers de segurança
- **Formato do `_headers`:** funciona nativamente em Workers static assets e deve estar no diretório de assets. No Astro isso significa `public/_headers`, que é copiado para `dist/`. Limites: 100 regras e 2.000 caracteres por linha. Não se aplica a respostas geradas por código de Worker. [Workers headers](https://developers.cloudflare.com/workers/static-assets/headers/) · [migração](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)
- **CSP no Astro (`security.csp`):** gera um `<meta>` com hashes de `script-src` e `style-src`. Não funciona em `dev`, então teste com `build` + `preview`. Não suporta `<ClientRouter />` nem Shiki. Se você incluir `'unsafe-inline'`, os hashes são suprimidos. O repo já usa isso, com hash manual para o `theme-init.js`. [config reference](https://docs.astro.build/en/reference/configuration-reference/)
- **`frame-ancestors` não funciona em `<meta>`.** Precisa ir no header HTTP. [MDN frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- **Combinação de políticas:** várias políticas (header + meta) só **restringem mais**. [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)
  - Por isso a CSP do header **não** deve ter `default-src`/`script-src`/`style-src`, senão bloqueia os scripts inline que o meta libera por hash. O Astro inlina scripts pequenos ([client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/)) e CSS menor que 4 kB com `inlineStylesheets: 'auto'` ([config reference](https://docs.astro.build/en/reference/configuration-reference/)).
- **HSTS:**
  - Comece com 1 ano e **sem `preload`**. O preload exige `includeSubDomains` e `max-age` ≥ 31536000, e é difícil de desfazer. [MDN HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
  - Configure em **um** lugar só: pelo `_headers` ou pelo painel (*SSL/TLS → Edge Certificates → HSTS*). [Cloudflare HSTS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/)
- **Referrer-Policy:** `strict-origin-when-cross-origin` envia só a origem para outros sites e nada em downgrade para HTTP. [MDN Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy)
- **Permissions-Policy:** `()` desliga o recurso. O header é experimental e não Baseline, então trate como defesa extra. [MDN Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy)

`public/_headers`:

```
/*
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
  Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```
- O bloco `/_astro/*` é cache longo para assets com hash no nome **(não verificado no doc atual; confira os nomes no `dist/`)**.
- Se adotar o Web3Forms, acrescente `https://api.web3forms.com` em `form-action`, aqui e no `astro.config.mjs`.
- Depois do deploy, confira com `curl -sI https://stuaninauts.com/`.

### Privacidade
- **Telefone e endereço:** não ponha em lugar nenhum, nem no HTML, nem no `CLAUDE.md`, nem nos commits.
- **E-mail:**
  - Use um **alias no próprio domínio**, por exemplo `contato@stuaninauts.com`, via Cloudflare Email Routing. Ele é grátis e só recebe. [Email Routing](https://developers.cloudflare.com/email-routing/)
  - A **Email Address Obfuscation** da Cloudflare vem ligada por padrão e troca o e-mail no HTML por um link decodificado via JS. Ela não age em atributos (exceto `href` de `<a>`) nem dentro de `<head>`. [Email obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)
  - Se ela atua em respostas de Workers static assets está **(não verificado)**. Confira no HTML servido.
- **Formulário:**
  - A access key do Web3Forms é pública por design ("Access key is public"). [Web3Forms FAQ](https://docs.web3forms.com/getting-started/faq)
  - O hCaptcha integrado é grátis. O Turnstile no Web3Forms é **Pro**. [hCaptcha](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha) · [Turnstile no Web3Forms](https://docs.web3forms.com/getting-started/pro-features/cloudflare-turnstile-captcha)
  - Turnstile próprio **exige validação server-side** (siteverify, com a secret key no backend), o que um site 100% estático não tem. [Turnstile server-side](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
  - Qualquer captcha de terceiro exige liberar os domínios dele na CSP. Para um portfólio, o alias de e-mail basta.
- **EXIF:**
  - O sharp, que o `astro:assets` usa, remove todos os metadados por padrão na saída. [sharp output](https://sharp.pixelplumbing.com/api-output/) · [Astro images](https://docs.astro.build/en/guides/images/)
  - Mas o **original commitado fica público no repo**. Limpe antes de commitar: `exiftool -all= -overwrite_original -r src/assets public`. [exiftool](https://exiftool.org/exiftool_pod.html)
  - Imagens em `public/` "are never optimized". [Astro images](https://docs.astro.build/en/guides/images/)

### SEO
- **`site`:** é obrigatório para o sitemap e as URLs canônicas. [config reference](https://docs.astro.build/en/reference/configuration-reference/) · [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- **Sitemap:** o `@astrojs/sitemap` com `i18n` gera `xhtml:link hreflang` no sitemap. Adicione `<link rel="sitemap" href="/sitemap-index.xml">` e a linha `Sitemap:` no `robots.txt`. [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- **hreflang no HTML:**
  - A doc de i18n do Astro **não diz** que ele gera `hreflang` no HTML, então adicione à mão. [Astro i18n](https://docs.astro.build/en/guides/internationalization/)
  - Regras do Google: cada versão lista **a si mesma e todas as outras**, com URL absoluta e links recíprocos (sem retorno, a tag é ignorada). O `x-default` é opcional. [Google hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- **Canonical:** absoluto, no `<head>`, autorreferente e no mesmo idioma da página. [Google canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- **Open Graph:** `og:title`, `og:type`, `og:image` e `og:url` são obrigatórios. Use `og:image:alt`, `og:locale` (`en_US`/`pt_BR`) e `og:locale:alternate`. [ogp.me](https://ogp.me/)

Trecho de `<head>` (exemplo; ajuste ao `trailingSlash` do projeto):

```astro
---
const path = Astro.url.pathname;
const base = path.replace(/^\/pt(\/|$)/, '/');
const en = new URL(base, Astro.site);
const pt = new URL(base === '/' ? '/pt/' : `/pt${base}`, Astro.site);
---
<link rel="canonical" href={new URL(path, Astro.site)} />
<link rel="alternate" hreflang="en" href={en} />
<link rel="alternate" hreflang="pt-BR" href={pt} />
<link rel="alternate" hreflang="x-default" href={en} />
```

### Acessibilidade: essenciais de WCAG 2.2 AA ([WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [novidades 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/))
- **1.1.1:** texto alternativo em todo conteúdo não textual. O `alt` já é obrigatório no `<Image />`.
- **1.4.3:** contraste de texto de 4.5:1 (3:1 para texto grande). **1.4.11:** contraste de 3:1 em componentes e ícones informativos. Atenção ao tema claro e ao escuro.
- **1.4.4:** zoom de 200% sem perda. **1.4.10:** reflow em 320 px de largura, sem rolagem 2D.
- **2.4.1:** link "pular para o conteúdo". **2.4.7:** foco visível. **2.4.11 (novo na 2.2):** foco não pode ficar totalmente escondido, por exemplo atrás de um header fixo.
- **2.5.8 (novo na 2.2):** alvos de ponteiro com pelo menos 24×24 px CSS. Vale para o seletor de idioma e de tema.
- **3.1.1:** `lang` no `<html>` (`en` / `pt-BR`). **3.1.2:** `lang` em trechos noutro idioma, como os kanji decorativos.
- **3.3.2 e 4.1.2:** labels em formulários; nome e papel acessíveis em botões só com ícone (o toggle de tema).
- A 2.2 removeu o critério 4.1.1 (Parsing).

### Performance
- **Imagens:** guarde-as em `src/` e use `<Image />`/`<Picture />` (`avif`/`webp`). Dimensões e `loading` saem automaticamente. [Astro images](https://docs.astro.build/en/guides/images/)
- **Fontes:**
  - A **Fonts API** (`fonts` no config, `astro@6.0.0+`, documentada fora de "experimental") baixa e self-hospeda as fontes, aceita `subsets` e `fontProviders.local()`, e o `<Font cssVariable=... preload />` deve usar preload com parcimônia. [Astro fonts](https://docs.astro.build/en/guides/fonts/) · [config reference](https://docs.astro.build/en/reference/configuration-reference/)
  - O repo já faz subset manual (`IBMPlex*-latin/kanji.woff2` + `scripts/subset-kanji.mjs`), o que também atende ao requisito. Só migre para a Fonts API se ela simplificar.

---

## CHECKLIST (por prioridade)

### Antes de tornar o repo público
- [ ] Varrer **todo o histórico** com `gitleaks git -v`. Se aparecer algo, **rotacionar ou revogar primeiro** e depois reescrever com `git-filter-repo`.
- [ ] Configurar o e-mail de commit `noreply` e ativar "Keep my email addresses private". Conferir os autores dos commits já existentes.
- [ ] Rodar `exiftool -all= -overwrite_original -r src/assets public` (hoje está limpo) e repetir em toda foto nova.
- [ ] Completar o `.gitignore`: `.claude/worktrees/`, `.dev.vars*` (o resto já está lá).
- [ ] Criar o `CLAUDE.md` (menos de 200 linhas, sem dados pessoais) e o `.claude/settings.json` com `deny` de `.env*` + o hook `guard-bash.sh` (`chmod +x`). Testar com `/hooks` e pedir um `git push origin main`.
- [ ] Revisar o que será commitado em `.claude/`: nada de `settings.local.json`, `CLAUDE.local.md`, tokens ou caminhos pessoais.
- [ ] Instalar o gitleaks (binário v8.30.1) + lefthook com o job `gitleaks git --pre-commit --redact --staged --verbose`.
- [ ] Adicionar o `LICENSE` (MIT) e a seção "License" no README (código MIT; textos e fotos com todos os direitos reservados).
- [ ] Adicionar o `SECURITY.md`.

### Logo depois de tornar público
- [ ] Ligar a **push protection** do repositório e confirmar que o secret scanning está ativo (*Settings → Advanced Security*).
- [ ] Ativar o **Private vulnerability reporting**.
- [ ] Ligar Dependabot alerts e security updates, e commitar o `.github/dependabot.yml`.
- [ ] Em *Settings → Actions*: deixar as permissões padrão de workflow como **read** e ligar a política que exige actions pinadas por SHA.
- [ ] Commitar o `.github/workflows/ci.yml` (SHAs pinados, `contents: read`) e abrir um PR para o check `build` aparecer.
- [ ] Criar o **ruleset** de `main`: PR obrigatório com **0 aprovações**, status check `build`, bloqueio de force push e de deleção, bypass vazio. Testar que o push direto em `main` falha.

### Antes do go-live
- [ ] Commitar o `wrangler.jsonc` (assets `./dist`, custom domain) e adicionar `wrangler` como devDependency.
- [ ] Conectar o **Workers Builds** ao repo, só com "selected repositories". Produção em `main`, build `npm run build`.
- [ ] Criar o `public/_headers`. Validar a CSP com `npm run build && npm run preview` (console sem violações) e os headers com `curl -sI`.
- [ ] HSTS em **um** lugar só (`_headers` **ou** painel), sem `preload` por enquanto.
- [ ] SEO: canonical + hreflang (`en`, `pt-BR`, `x-default`) em todas as páginas, `og:*` com imagem 1200×630 e `alt`, sitemap linkado no `<head>` e no `robots.txt`.
- [ ] A11y: skip link, foco visível e não encoberto, contraste AA nos dois temas, alvos ≥ 24 px, `lang` certo por página.
- [ ] Contato: alias no Email Routing (sem e-mail pessoal nem telefone); confirmar no HTML servido se a ofuscação atuou.
- [ ] Performance: imagens via `astro:assets` e fontes self-hosted com subset (já feito).

### Depois (opcional)
- [ ] Desativar `*.workers.dev` para evitar conteúdo duplicado **(não verificado)**.
- [ ] Avaliar o HSTS `includeSubDomains; preload` depois de algumas semanas estável.
- [ ] Reavaliar a troca do gitleaks pelo Betterleaks quando a v2 dele estiver estável.
