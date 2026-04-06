import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface SlidePageProps {
  params: { slideId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// This would be replaced with actual slide data fetching
export async function generateStaticParams() {
  // Generate paths for all slides at build time
  return [
    { slideId: '01-introduction' },
    { slideId: '02-market-opportunity' },
    { slideId: '03-solution-overview' },
    { slideId: '04-technical-architecture' },
    { slideId: '05-business-model' },
    { slideId: '06-implementation-roadmap' },
  ];
}

export async function generateMetadata(
  { params }: SlidePageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  // This would be replaced with actual slide data fetching
  const slideData = {
    title: 'Slide',
    description: 'Presentation slide',
  };

  // Update title based on slide ID
  switch (params.slideId) {
    case '01-introduction':
      slideData.title = 'Introduction | Longevity AI Coach';
      slideData.description = 'Introduction to the Longevity AI Coach platform';
      break;
    case '02-market-opportunity':
      slideData.title = 'Market Opportunity | Longevity AI Coach';
      slideData.description = 'Market analysis and opportunity for Longevity AI Coach';
      break;
    case '03-solution-overview':
      slideData.title = 'Solution Overview | Longevity AI Coach';
      slideData.description = 'Overview of the Longevity AI Coach solution';
      break;
    case '04-technical-architecture':
      slideData.title = 'Technical Architecture | Longevity AI Coach';
      slideData.description = 'Technical architecture of the Longevity AI Coach platform';
      break;
    case '05-business-model':
      slideData.title = 'Business Model | Longevity AI Coach';
      slideData.description = 'Business model and revenue streams for Longevity AI Coach';
      break;
    case '06-implementation-roadmap':
      slideData.title = 'Implementation Roadmap | Longevity AI Coach';
      slideData.description = 'Development and launch roadmap for Longevity AI Coach';
      break;
    default:
      return {};
  }

  return {
    title: slideData.title,
    description: slideData.description,
    openGraph: {
      title: slideData.title,
      description: slideData.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: slideData.title,
      description: slideData.description,
    },
  };
}

// This would be replaced with actual slide data fetching
async function getSlideContent(slideId: string) {
  // In a real app, this would fetch the slide content from a CMS or MDX file
  const slides: Record<string, { title: string; component: React.ComponentType }> = {
    '01-introduction': {
      title: 'Introduction',
      component: () => (
        <div className="prose dark:prose-invert max-w-none">
          <h1>Introduction to Longevity AI Coach</h1>
          <p>Content for the introduction slide would be loaded here.</p>
        </div>
      ),
    },
    '02-market-opportunity': {
      title: 'Market Opportunity',
      component: () => (
        <div className="prose dark:prose-invert max-w-none">
          <h1>Market Opportunity</h1>
          <p>Content for the market opportunity slide would be loaded here.</p>
        </div>
      ),
    },
    // Add other slides here
  };

  return slides[slideId] || null;
}

export default async function SlidePage({ params }: SlidePageProps) {
  const slide = await getSlideContent(params.slideId);

  if (!slide) {
    notFound();
  }

  const SlideComponent = slide.component;
  const slideIndex = parseInt(params.slideId.split('-')[0], 10);
  const nextSlideId = `0${slideIndex + 1}-${['introduction', 'market-opportunity', 'solution-overview', 'technical-architecture', 'business-model', 'implementation-roadmap'][slideIndex] || ''}`;
  const prevSlideId = `0${slideIndex - 1}-${['introduction', 'market-opportunity', 'solution-overview', 'technical-architecture', 'business-model', 'implementation-roadmap'][slideIndex - 2] || ''}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <nav className="flex justify-between items-center mb-8">
            <a
              href="/presentation"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Presentation
            </a>
            <div className="text-sm text-gray-600 dark:text-gray-400">Slide {slideIndex} of 6</div>
          </nav>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <SlideComponent />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between">
                {slideIndex > 1 ? (
                  <a
                    href={`/presentation/slides/${prevSlideId}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Previous
                  </a>
                ) : (
                  <div></div>
                )}

                {slideIndex < 6 ? (
                  <a
                    href={`/presentation/slides/${nextSlideId}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ) : (
                  <a
                    href="/presentation"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Back to Presentation
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/presentation"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              View in presentation mode
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
