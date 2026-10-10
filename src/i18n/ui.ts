export const languages = { en: 'English', pt: 'Português' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const htmlLang: Record<Lang, string> = { en: 'en', pt: 'pt-BR' };
export const ogLocale: Record<Lang, string> = { en: 'en_US', pt: 'pt_BR' };

const en = {
  'site.description': 'Eduardo Stuani, Data & AI Engineer. Data pipelines at scale and LLM systems in production.',
  'og.alt': 'Eduardo Stuani, Data & AI Engineer, next to an ink ensō circle with a red dot like a star on an orbit',
  'nav.work': 'Work',
  'nav.experience': 'Experience',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to content',
  'nav.home': 'Home',
  'theme.toggle': 'Toggle light/dark theme',
  'lang.switch': 'Ler em português',
  'lang.label': 'Language',
  'lang.hint': 'Prefere ler em português?',
  'lang.hint.go': 'Ver em PT',
  'lang.hint.close': 'Dismiss',
  'seal.title': '宙 (chū): space, the sky',
  'name.title': 'Why “stuaninauts”?',
  'name.p1': 'It’s my username around the web, from GitHub to this domain. It’s a palindrome (it reads the same backwards) and it sounds like astronauts. I’m into astronomy, so the name stuck.',
  'name.p2': 'The Japanese touches, like the traditional colors, the ensō circle and the hanko seal, come from my love of Japanese culture. The seal reads 宙 (chū): space, the sky. Right where both meet.',
  'hero.role': 'Data & AI Engineer · Porto Alegre, Brazil',
  'hero.lead': 'I build data pipelines and LLM systems that survive contact with real data, at scale and under cost constraints.',
  'hero.cta.work': 'See my work',
  'hero.cta.contact': 'Get in touch',
  'hero.photo': 'Portrait of Eduardo Stuani',
  'about.title': 'About',
  'experience.title': 'Experience',
  'experience.education': 'Education',
  'experience.certs': 'Certifications',
  'work.title': 'Work',
  'work.all': 'All projects',
  'work.benchmarks': 'Benchmarks',
  'stack.title': 'Toolbox',
  'contact.title': 'Contact',
  'contact.body': 'Want to talk about data, LLMs or anything on this site? The fastest way to reach me is email or LinkedIn.',
  'project.repo': 'Source code',
  'project.demo': 'Live demo',
  'project.back': 'All projects',
  'project.stack': 'Stack',
  'project.question': 'Question',
  'project.metrics': 'Key numbers',
  'project.screens': 'Screens',
  'project.charts': 'More charts',
  'project.writeup': 'Write-up',
  'carousel.label': 'carousel',
  'carousel.prev': 'Previous image',
  'carousel.next': 'Next image',
  'carousel.of': 'of',
  'carousel.open': 'Open full size',
  'project.prev': 'Previous',
  'project.next': 'Next',
  'nav.breadcrumb': 'Breadcrumb',
  'projects.title': 'Projects',
  'projects.lead': 'Projects and benchmarks I have built.',
  'footer.source': 'Source on GitHub',
  'footer.built': 'Built with Astro',
  '404.title': 'Page not found',
  '404.body': 'This page drifted off into space.',
  '404.back': 'Back home',
};

const pt: Record<keyof typeof en, string> = {
  'site.description': 'Eduardo Stuani, Engenheiro de Dados e IA. Pipelines de dados em escala e sistemas com LLM em produção.',
  'og.alt': 'Eduardo Stuani, Engenheiro de Dados e IA, ao lado de um círculo ensō a nanquim com um ponto vermelho, como uma estrela numa órbita',
  'nav.work': 'Projetos',
  'nav.experience': 'Experiência',
  'nav.about': 'Sobre',
  'nav.contact': 'Contato',
  'nav.skip': 'Pular para o conteúdo',
  'nav.home': 'Início',
  'theme.toggle': 'Alternar tema claro/escuro',
  'lang.switch': 'Read in English',
  'lang.label': 'Idioma',
  'lang.hint': 'Prefere ler em português?',
  'lang.hint.go': 'Ver em PT',
  'lang.hint.close': 'Fechar',
  'seal.title': '宙 (chū): espaço, o céu',
  'name.title': 'Por que “stuaninauts”?',
  'name.p1': 'É o meu nome de usuário na internet, do GitHub a este domínio. É um palíndromo (se lê igual de trás para frente) e soa como astronauts (astronautas). Gosto de astronomia, então o nome pegou.',
  'name.p2': 'Os toques japoneses, como as cores tradicionais, o círculo ensō e o carimbo hanko, vêm do meu gosto pela cultura japonesa. O carimbo diz 宙 (chū): espaço, o céu. Bem onde as duas coisas se encontram.',
  'hero.role': 'Engenheiro de Dados e IA · Porto Alegre, Brasil',
  'hero.lead': 'Construo pipelines de dados e sistemas com LLM que aguentam o contato com dados reais, em escala e com custo sob controle.',
  'hero.cta.work': 'Ver projetos',
  'hero.cta.contact': 'Fale comigo',
  'hero.photo': 'Retrato de Eduardo Stuani',
  'about.title': 'Sobre',
  'experience.title': 'Experiência',
  'experience.education': 'Formação',
  'experience.certs': 'Certificações',
  'work.title': 'Projetos',
  'work.all': 'Todos os projetos',
  'work.benchmarks': 'Benchmarks',
  'stack.title': 'Ferramentas',
  'contact.title': 'Contato',
  'contact.body': 'Quer conversar sobre dados, LLMs ou algo daqui? O jeito mais rápido de falar comigo é por email ou LinkedIn.',
  'project.repo': 'Código-fonte',
  'project.demo': 'Demo ao vivo',
  'project.back': 'Todos os projetos',
  'project.stack': 'Stack',
  'project.question': 'Pergunta',
  'project.metrics': 'Números-chave',
  'project.screens': 'Telas',
  'project.charts': 'Outros gráficos',
  'project.writeup': 'Texto',
  'carousel.label': 'carrossel',
  'carousel.prev': 'Imagem anterior',
  'carousel.next': 'Próxima imagem',
  'carousel.of': 'de',
  'carousel.open': 'Abrir em tamanho real',
  'project.prev': 'Anterior',
  'project.next': 'Próximo',
  'nav.breadcrumb': 'Trilha de navegação',
  'projects.title': 'Projetos',
  'projects.lead': 'Projetos e benchmarks que eu construí.',
  'footer.source': 'Código no GitHub',
  'footer.built': 'Feito com Astro',
  '404.title': 'Página não encontrada',
  '404.body': 'Esta página se perdeu no espaço.',
  '404.back': 'Voltar ao início',
};

export type UiKey = keyof typeof en;
const ui: Record<Lang, Record<UiKey, string>> = { en, pt };

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'pt' ? 'pt' : defaultLang;
}

/** Caminho de uma página no idioma pedido. `path` é sempre o caminho em inglês (sem prefixo). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? '/pt/' : `/pt${clean}`;
}

/** Remove o prefixo de idioma, devolvendo o caminho "base" (inglês). */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/pt(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}
