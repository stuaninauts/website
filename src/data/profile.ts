import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

import cnpq from '../assets/orgs/cnpq.png';
import econodata from '../assets/orgs/econodata.png';
import petrobras from '../assets/orgs/petrobras.png';

// Símbolos oficiais em src/assets/orgs/ (176px, quadrados). Sem logo, a experiência mostra as iniciais (OrgMark.astro).
const logos: Partial<Record<string, ImageMetadata>> = { cnpq, econodata, petrobras };

export const person = {
  name: 'Eduardo Stuani',
  handle: 'stuaninauts',
  // Aliases do Cloudflare Email Routing, um por idioma (encaminham para o email pessoal, que nunca aparece no site).
  // Só são montados no navegador (ver Contact.astro), para não ficarem crus no HTML.
  emailUser: { en: 'contact', pt: 'contato' } satisfies Record<Lang, string>,
  emailDomain: 'stuaninauts.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/eduardostuani',
    github: 'https://github.com/stuaninauts',
    source: 'https://github.com/stuaninauts/website',
  },
};

type Role = { title: string; period: string; points: string[] };
/** about: o que é a organização, em uma frase. context: vínculo e local. */
type Job = { org: string; about: string; context: string; roles: Role[]; logo?: ImageMetadata };
type Item = { title: string; detail: string; period: string };

type Profile = {
  about: string[];
  focus: string[];
  experience: Job[];
  education: Item[];
  certifications: Item[];
  stack: { group: string; items: string[] }[];
};

const en: Profile = {
  about: [
    'Data Engineer at Econodata, working where large-scale data pipelines meet applied AI. I build the systems that turn public and web data into intelligence on millions of Brazilian companies, from ETL on Airflow and Kubernetes to LLM agents in production.',
    'I care about what holds up with real data: pipelines that run faster, cost less and fail loudly instead of silently, and models that earn their cost. That’s why I measure before I choose, as in the benchmarks below.',
  ],
  focus: ['AI agents', 'LLMOps', 'RAG', 'LLM evaluation', 'Information retrieval', 'Data infrastructure'],
  experience: [
    {
      org: 'Econodata',
      about: 'B2B SaaS platform with data and intelligence on millions of Brazilian companies.',
      context: 'Full-time · Remote',
      logo: logos.econodata,
      roles: [
        {
          title: 'Data Engineer',
          period: 'Jun 2026 – now',
          points: [
            'Designed, evaluated and deployed LLM-based agents for large-scale company data inference, choosing production configurations on a cost-versus-accuracy basis.',
            'Delivered LLM-generated data to production at scale, with dual writes to relational and search databases, auditability and safeguards for existing data sources.',
            'Improved and validated production machine learning models serving data for millions of companies.',
            'Established evaluation and governance practices for AI experimentation; reported analyses and technical recommendations to the CEO.',
          ],
        },
        {
          title: 'Junior Data Engineer',
          period: 'Jan 2026 – May 2026',
          points: [
            'Optimized heavy ETL workloads on Airflow and Kubernetes, redesigning processing strategies to cut runtime and memory footprint.',
            'Built monitoring and cost alerting for LLM API usage across providers.',
            'Scaled and stabilized the AI services running on top of the vector database, fixing retrieval issues in production.',
          ],
        },
        {
          title: 'Data Engineer Intern',
          period: 'Aug 2024 – Jan 2026',
          points: [
            'Built from scratch a natural-language search microservice in FastAPI with hybrid search (Elasticsearch + vectors), integrated into the platform’s main page.',
            'Implemented monitoring and alerting with Grafana and Prometheus across VMs, Kubernetes clusters and microservices.',
            'Built and maintained web crawlers and ETL pipelines over structured and unstructured data.',
          ],
        },
      ],
    },
    {
      org: 'Petrobras',
      about: 'Brazil’s largest oil company.',
      context: 'Research scholarship · Geológi-QA project',
      logo: logos.petrobras,
      roles: [
        {
          title: 'Undergraduate Researcher',
          period: 'Dec 2023 – Aug 2024',
          points: ['Built a RAG-based question-answering tool and improved information retrieval over structured and unstructured energy-sector data.'],
        },
      ],
    },
    {
      org: 'CNPq',
      about: 'Brazil’s National Council for Scientific and Technological Development.',
      context: 'Research scholarship',
      logo: logos.cnpq,
      roles: [
        {
          title: 'Undergraduate Researcher',
          period: 'Sep 2022 – Jan 2023',
          points: ['Collected and analyzed Twitter data on Brazil’s 2022 elections, using data mining and network analysis in Python.'],
        },
      ],
    },
  ],
  education: [{ title: 'BSc in Computer Science', detail: 'Universidade Federal do Rio Grande do Sul (UFRGS)', period: '2022 – 2026' }],
  certifications: [
    { title: 'Preparing for Google Cloud Certification: Cloud Engineer', detail: 'Google Cloud', period: '2024' },
  ],
  stack: [
    { group: 'AI', items: ['LLMs', 'AI agents', 'Tool calling', 'MCP', 'RAG', 'Embeddings', 'LLM evals', 'LangChain', 'LangSmith', 'Fine-tuning'] },
    { group: 'Data', items: ['Python', 'SQL', 'Apache Airflow', 'PostgreSQL', 'Elasticsearch', 'Milvus', 'Neo4j', 'ETL/ELT'] },
    { group: 'Platform', items: ['Google Cloud', 'Kubernetes (GKE)', 'Docker', 'FastAPI', 'CI/CD', 'Git'] },
    { group: 'Observability', items: ['Grafana', 'Prometheus', 'Cost alerting'] },
  ],
};

const pt: Profile = {
  about: [
    'Engenheiro de Dados na Econodata, trabalhando onde pipelines de dados em larga escala encontram IA aplicada. Construo os sistemas que transformam dados públicos e da web em inteligência sobre milhões de empresas brasileiras, do ETL em Airflow e Kubernetes a agentes com LLM em produção.',
    'Me importa o que aguenta o contato com dados reais: pipelines que rodam mais rápido, custam menos e falham de forma visível em vez de silenciosa, e modelos que valem o que custam. Por isso eu meço antes de escolher, como nos benchmarks abaixo.',
  ],
  focus: ['Agentes de IA', 'LLMOps', 'RAG', 'Avaliação de LLMs', 'Recuperação de informação', 'Infraestrutura de dados'],
  experience: [
    {
      org: 'Econodata',
      about: 'Plataforma SaaS B2B de dados e inteligência sobre milhões de empresas brasileiras.',
      context: 'Tempo integral · Remoto',
      logo: logos.econodata,
      roles: [
        {
          title: 'Engenheiro de Dados',
          period: 'jun 2026 – atual',
          points: [
            'Projetei, avaliei e implantei agentes baseados em LLM para inferência de dados de empresas em larga escala, escolhendo configurações de produção por custo versus acurácia.',
            'Entreguei dados gerados por LLM em produção em escala, com dual write em bancos relacional e de busca, auditabilidade e salvaguardas para as fontes existentes.',
            'Melhorei e validei modelos de machine learning em produção que servem dados de milhões de empresas.',
            'Estabeleci práticas de avaliação e governança para experimentação com IA; reportei análises e recomendações técnicas ao CEO.',
          ],
        },
        {
          title: 'Engenheiro de Dados Júnior',
          period: 'jan 2026 – mai 2026',
          points: [
            'Otimizei cargas pesadas de ETL em Airflow e Kubernetes, redesenhando estratégias de processamento para reduzir tempo de execução e memória.',
            'Construí monitoramento e alertas de custo do uso de APIs de LLM entre provedores.',
            'Escalei e estabilizei os serviços de IA sobre o banco vetorial, corrigindo problemas de recuperação em produção.',
          ],
        },
        {
          title: 'Estagiário de Engenharia de Dados',
          period: 'ago 2024 – jan 2026',
          points: [
            'Desenvolvi do zero, em FastAPI, um microsserviço de busca em linguagem natural com busca híbrida (Elasticsearch + vetorial), integrado à página principal da plataforma.',
            'Implementei monitoramento e alertas com Grafana e Prometheus em VMs, clusters Kubernetes e microsserviços.',
            'Construí e mantive web crawlers e pipelines de ETL sobre dados estruturados e não estruturados.',
          ],
        },
      ],
    },
    {
      org: 'Petrobras',
      about: 'A maior empresa de petróleo do Brasil.',
      context: 'Iniciação científica · projeto Geológi-QA',
      logo: logos.petrobras,
      roles: [
        {
          title: 'Bolsista de Iniciação Científica',
          period: 'dez 2023 – ago 2024',
          points: ['Construí uma ferramenta de perguntas e respostas baseada em RAG e melhorei a recuperação de informação sobre dados estruturados e não estruturados do setor de energia.'],
        },
      ],
    },
    {
      org: 'CNPq',
      about: 'Conselho Nacional de Desenvolvimento Científico e Tecnológico.',
      context: 'Iniciação científica',
      logo: logos.cnpq,
      roles: [
        {
          title: 'Bolsista de Iniciação Científica',
          period: 'set 2022 – jan 2023',
          points: ['Coletei e analisei dados do Twitter sobre as eleições de 2022, com mineração de dados e análise de redes em Python.'],
        },
      ],
    },
  ],
  education: [{ title: 'Bacharelado em Ciência da Computação', detail: 'Universidade Federal do Rio Grande do Sul (UFRGS)', period: '2022 – 2026' }],
  certifications: [
    { title: 'Preparing for Google Cloud Certification: Cloud Engineer', detail: 'Google Cloud', period: '2024' },
  ],
  stack: [
    { group: 'IA', items: ['LLMs', 'Agentes de IA', 'Tool calling', 'MCP', 'RAG', 'Embeddings', 'Avaliação de LLMs', 'LangChain', 'LangSmith', 'Fine-tuning'] },
    { group: 'Dados', items: ['Python', 'SQL', 'Apache Airflow', 'PostgreSQL', 'Elasticsearch', 'Milvus', 'Neo4j', 'ETL/ELT'] },
    { group: 'Plataforma', items: ['Google Cloud', 'Kubernetes (GKE)', 'Docker', 'FastAPI', 'CI/CD', 'Git'] },
    { group: 'Observabilidade', items: ['Grafana', 'Prometheus', 'Alertas de custo'] },
  ],
};

export const profile: Record<Lang, Profile> = { en, pt };
