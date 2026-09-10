import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Health Projects',
  description:
    'Real-world health technology projects building the future of personal wellbeing and connected health',
};

type Screenshot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

// Tailwind only emits classes it can see as complete strings, so the accent
// colours have to be written out rather than interpolated per project.
const accents = {
  teal: {
    tagline: 'text-teal-700 dark:text-teal-400',
    bullet: 'text-teal-500',
    button: 'bg-teal-700 hover:bg-teal-800',
    outlineButton:
      'border border-teal-700 text-teal-700 hover:bg-teal-50 dark:text-teal-300 dark:border-teal-400 dark:hover:bg-teal-950',
  },
  blue: {
    tagline: 'text-blue-700 dark:text-blue-400',
    bullet: 'text-blue-500',
    button: 'bg-blue-700 hover:bg-blue-800',
    outlineButton:
      'border border-blue-700 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-400 dark:hover:bg-blue-950',
  },
  cyan: {
    tagline: 'text-cyan-700 dark:text-cyan-400',
    bullet: 'text-cyan-500',
    button: 'bg-cyan-700 hover:bg-cyan-800',
    outlineButton:
      'border border-cyan-700 text-cyan-700 hover:bg-cyan-50 dark:text-cyan-300 dark:border-cyan-400 dark:hover:bg-cyan-950',
  },
} as const;

type Project = {
  name: string;
  slug: string;
  tagline: string;
  status: 'Live' | 'Beta';
  award?: string;
  url: string;
  urlLabel: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  description: string;
  features: string[];
  screenshots: Screenshot[];
  screenshotClassName?: string;
  gradient: string;
  accentColor: keyof typeof accents;
  icon: React.ReactNode;
};

const projects: Project[] = [
  {
    name: 'TwoBreath',
    slug: 'twobreath',
    tagline: 'Couples Breathing Ritual App',
    status: 'Live',
    url: 'https://apps.apple.com/app/id6761666145',
    urlLabel: 'Download on the App Store',
    secondaryUrl: 'https://www.twobreath.com/',
    secondaryUrlLabel: 'twobreath.com',
    description:
      'A daily breathing ritual app for couples that uses Apple Watch to measure physiological synchrony — tracking heart rate, HRV, and respiratory alignment between partners. Built around guided 7–15 minute sessions with animated breathing visualization, shared poetry, and eye-contact rituals.',
    features: [
      'Apple Watch HRV & sync score',
      'Multi-language: EN, DE, JP',
      'CGM & biomarker integration',
      'Audio-first, breath-led design',
    ],
    screenshots: [
      {
        src: '/projects/twobreath/twobreath-home.jpeg',
        alt: 'TwoBreath iPhone home screen showing the daily ritual, streak and Start Together button',
        caption: 'Daily ritual & streak',
        width: 602,
        height: 1308,
      },
      {
        src: '/projects/twobreath/twobreath-health-dashboard.jpeg',
        alt: 'TwoBreath health dashboard showing heart rate variability and resting heart rate trends',
        caption: 'HRV & resting HR trends',
        width: 602,
        height: 1308,
      },
    ],
    // Portrait phone screenshots, cropped so the cards stay a similar height.
    screenshotClassName: 'h-72 object-cover object-top',
    gradient: 'from-teal-800 to-teal-600',
    accentColor: 'teal',
    icon: (
      <div className="text-center">
        <div className="flex gap-3 justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-teal-400/40 border-2 border-teal-300" />
          <div className="w-10 h-10 rounded-full bg-amber-400/40 border-2 border-amber-300 -ml-4" />
        </div>
        <p className="text-teal-100 text-xs tracking-widest uppercase mt-2">
          Couples Breathing Ritual
        </p>
      </div>
    ),
  },
  {
    name: 'EHDS Demo',
    slug: 'ehds',
    tagline: 'Interactive Demo & Integration Platform',
    status: 'Live',
    url: 'https://ma3u.github.io/ehds',
    urlLabel: 'Open Demo',
    description:
      'An EHDS integration platform you can run, fork, and wire into your own stack. It shows how the regulation enables secure cross-border health data sharing — publishing clinical datasets, negotiating access contracts under ODRL, and transferring FHIR / OMOP data through the Dataspace Protocol. Every flow is exposed as a REST API, backed by a Neo4j knowledge graph of 5,300+ nodes and 127 synthetic patient profiles.',
    features: [
      '7 demo personas, 127 synthetic patients',
      '5,300+ knowledge graph nodes (Neo4j)',
      'FHIR R4 & OMOP CDM compliant',
      'EHDS Art. 3–51 regulation coverage',
    ],
    screenshots: [
      {
        src: '/projects/ehds/ehds-knowledge-graph.png',
        alt: 'EHDS demo knowledge graph explorer showing organizations, contracts and data transfers between EU member states',
        caption:
          'Knowledge graph explorer — participants, contracts and cross-border data transfers.',
        width: 1600,
        height: 1000,
      },
    ],
    gradient: 'from-blue-900 to-blue-700',
    accentColor: 'blue',
    icon: (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {['FHIR R4', 'OMOP CDM', 'ODRL', 'HealthDCAT-AP'].map((c) => (
            <span key={c} className="px-2 py-1 bg-white/10 rounded text-white text-xs font-mono">
              {c}
            </span>
          ))}
        </div>
        <p className="text-blue-200 text-xs tracking-widest uppercase">
          European Health Data Space
        </p>
      </div>
    ),
  },
  {
    name: 'HealthGraph Agent',
    slug: 'healthgraph-agent',
    tagline: 'Longevity reasoning over your own health graph',
    status: 'Live',
    award: '5th place — Neo4j Aura Agent Hackathon 2026',
    url: 'https://github.com/ma3u/healthgraph-agent',
    urlLabel: 'View on GitHub',
    secondaryUrl: 'https://ma3u.github.io/healthgraph-agent/',
    secondaryUrlLabel: 'Live Site',
    description:
      'Apple Health stores thousands of data points a day as flat, disconnected time series. HealthGraph Agent turns an Apple Health export into a Neo4j Aura knowledge graph that captures the relationships between those metrics, then puts a Neo4j Aura Agent on top — answering questions like "am I overtraining?" with your actual numbers, grounded in Cypher.',
    features: [
      'Aura Agent: 6 tools, MCP-enabled, defined as code',
      'NeoDash dashboard: 5 pages, 35 panels',
      'GraphQL Data API with @cypher mutations',
      'Swift 6 iPhone app syncing HealthKit deltas',
    ],
    screenshots: [
      {
        src: '/projects/healthgraph/01-aura-agent-playground-longevity-question.png',
        alt: 'Neo4j Aura Agent playground answering a longevity question with real metrics from the health graph',
        caption: 'The Aura Agent grounding longevity advice in real numbers.',
        width: 1922,
        height: 1317,
      },
      {
        src: '/projects/healthgraph/02-aura-dashboard-whoop-recovery.png',
        alt: 'Whoop-style NeoDash Recovery dashboard running inside Neo4j Aura',
        caption: 'Whoop-style Recovery view, served from Aura.',
        width: 1918,
        height: 1448,
      },
    ],
    gradient: 'from-slate-900 to-cyan-800',
    accentColor: 'cyan',
    icon: (
      <div className="text-center">
        <p className="text-cyan-100 text-xs tracking-widest uppercase">
          Apple Health → Neo4j Knowledge Graph → AI Agent
        </p>
      </div>
    ),
  },
];

// next/image leaves src untouched when images.unoptimized is set, so the
// GitHub Pages base path has to be applied here.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const statusBadge: Record<string, string> = {
  Beta: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  Live: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
};

const externalLinkIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function ProjectsPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Health Projects
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Real-world tools at the intersection of health science and technology — moving beyond
            research into products that help people live better.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
          {projects.map((project) => {
            const accent = accents[project.accentColor];

            return (
              <div
                key={project.slug}
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Preview header */}
                <div
                  className={`bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center min-h-[180px]`}
                >
                  {project.icon}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h2>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {project.award && (
                    <p className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      🏆 {project.award}
                    </p>
                  )}

                  <p className={`text-sm font-medium mb-3 ${accent.tagline}`}>{project.tagline}</p>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>

                  <div
                    className={`grid gap-3 mb-5 ${project.screenshots.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
                  >
                    {project.screenshots.map((shot) => (
                      <figure key={shot.src}>
                        <Image
                          src={`${basePath}${shot.src}`}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          loading="lazy"
                          className={`rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm w-full ${project.screenshotClassName ?? 'h-auto'}`}
                        />
                        <figcaption className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                          {shot.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>

                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className={`${accent.bullet} mt-0.5`}>✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors text-sm font-medium ${accent.button}`}
                    >
                      {project.urlLabel}
                      {externalLinkIcon}
                    </a>

                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${accent.outlineButton}`}
                      >
                        {project.secondaryUrlLabel}
                        {externalLinkIcon}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Interested in collaborating?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            These projects are actively developed and open to beta testers, contributors, and
            healthcare partners.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
