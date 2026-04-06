import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Health Projects',
  description:
    'Real-world health technology projects building the future of personal wellbeing and connected health',
};

const projects = [
  {
    name: 'TwoBreath',
    slug: 'twobreath',
    tagline: 'Couples Breathing Ritual App',
    status: 'Beta' as const,
    statusColor: 'amber',
    url: 'https://www.twobreath.com/',
    urlLabel: 'twobreath.com',
    description:
      'A daily breathing ritual app for couples that uses Apple Watch to measure physiological synchrony — tracking heart rate, HRV, and respiratory alignment between partners. Built around guided 7–15 minute sessions with animated breathing visualization, shared poetry, and eye-contact rituals.',
    features: [
      'Apple Watch HRV & sync score',
      'Multi-language: EN, DE, JP',
      'CGM & biomarker integration (beta)',
      'Audio-first, breath-led design',
    ],
    gradient: 'from-teal-800 to-teal-600',
    accentColor: 'teal',
    icon: (
      <img
        src="/assets/images/twobreath_icon.svg"
        alt="TwoBreath logo"
        width={96}
        height={64}
        className="opacity-90"
      />
    ),
  },
  {
    name: 'EHDS Demo',
    slug: 'ehds',
    tagline: 'EU Cross-Border Health Data Platform',
    status: 'Live' as const,
    statusColor: 'green',
    url: 'https://ma3u.github.io/ehds',
    urlLabel: 'Open Demo',
    description:
      'An interactive reference implementation of the European Health Data Space regulation — simulating cross-border health data sharing across EU member states. Built on FHIR R4 and OMOP CDM standards with a Neo4j knowledge graph of 5,300+ nodes and 127 synthetic patient profiles.',
    features: [
      '7 demo personas, 127 synthetic patients',
      '5,300+ knowledge graph nodes (Neo4j)',
      'FHIR R4 & OMOP CDM compliant',
      'EHDS Art. 3–51 regulation coverage',
    ],
    gradient: 'from-blue-900 to-blue-700',
    accentColor: 'blue',
    icon: (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          {['AT', 'DE', 'FR', 'PL', 'ES'].map((c) => (
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
];

const statusBadge: Record<string, string> = {
  Beta: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  Live: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
};

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
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

                <p
                  className={`text-sm font-medium mb-3 text-${project.accentColor}-700 dark:text-${project.accentColor}-400`}
                >
                  {project.tagline}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>

                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-5">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={`text-${project.accentColor}-500 mt-0.5`}>✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-${project.accentColor}-700 text-white rounded-md hover:bg-${project.accentColor}-800 transition-colors text-sm font-medium`}
                >
                  {project.urlLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Interested in collaborating?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Both projects are actively developed and open to beta testers, contributors, and
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
