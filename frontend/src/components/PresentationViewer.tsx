'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type SlideDirection = 'left' | 'right';

interface SlideProps {
  title: string;
  description: string;
  slide: number;
  content: React.ReactNode;
  background?: string;
  theme?: 'light' | 'dark';
}

interface PresentationViewerProps {
  initialSlide?: number;
  onSlideChange?: (slideNumber: number) => void;
}

function PresentationViewer({ initialSlide = 1, onSlideChange }: PresentationViewerProps) {
  const searchParams = useSearchParams();
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [slides, setSlides] = useState<SlideProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<Error | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('right');
  const prevSlideRef = useRef(initialSlide);

  // Load slides dynamically
  useEffect(() => {
    const loadSlides = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // This would be replaced with dynamic imports based on your slide files
        // For now, we'll use the slide components directly
        const loadedSlides: SlideProps[] = [
          {
            title: 'Introduction',
            description: 'Overview of the Longevity AI Coach platform',
            slide: 1,
            content: (
              <div className="h-full flex flex-col items-center justify-center p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to Longevity AI Coach
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
                  An intelligent platform for personalized health and longevity optimization
                </p>
              </div>
            ),
            theme: 'light',
          },
          {
            title: 'Our Mission',
            description: 'Helping you achieve optimal health and longevity',
            slide: 2,
            content: (
              <div className="h-full flex flex-col items-center justify-center p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personalized health insights based on your biomarkers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>AI-powered recommendations for longevity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Data-driven approach to health optimization</span>
                  </li>
                </ul>
              </div>
            ),
            theme: 'light',
          },
          // Add more slides as they're created
        ];

        setSlides(loadedSlides);
      } catch (err) {
        console.error('Error loading slides:', err);
        setError(err instanceof Error ? err : new Error('Failed to load presentation'));
      } finally {
        setIsLoading(false);
      }
    };

    loadSlides();
  }, []);

  const updateURL = useCallback((slideNumber: number) => {
    // Update URL without page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('slide', slideNumber.toString());
      window.history.pushState({}, '', url.toString());
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length) {
      setSlideDirection('right');
      prevSlideRef.current = currentSlide;
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      updateURL(newSlide);
      if (onSlideChange) {
        onSlideChange(newSlide);
      }
    }
  }, [currentSlide, slides.length, updateURL, onSlideChange]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) {
      setSlideDirection('left');
      prevSlideRef.current = currentSlide;
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      updateURL(newSlide);
      if (onSlideChange) {
        onSlideChange(newSlide);
      }
    }
  }, [currentSlide, updateURL, onSlideChange]);

  const goToSlide = useCallback(
    (slideNumber: number) => {
      if (slideNumber >= 1 && slideNumber <= slides.length) {
        setSlideDirection(slideNumber > currentSlide ? 'right' : 'left');
        prevSlideRef.current = currentSlide;
        setCurrentSlide(slideNumber);
        updateURL(slideNumber);
        if (onSlideChange) {
          onSlideChange(slideNumber);
        }
      }
    },
    [currentSlide, slides.length, updateURL, onSlideChange]
  );

  const toggleFullscreen = useCallback(() => {
    if (typeof document !== 'undefined') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err: Error) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      } else if (document.exitFullscreen) {
        document.exitFullscreen().catch((err: Error) => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
        setIsFullscreen(false);
      }
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          setShowThumbnails((prev) => !prev);
          break;
        case 'Escape':
          if (isFullscreen && typeof document !== 'undefined' && document.exitFullscreen) {
            document.exitFullscreen().catch(console.error);
            setIsFullscreen(false);
          } else if (showThumbnails) {
            setShowThumbnails(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, toggleFullscreen, isFullscreen, showThumbnails]);

  // Initialize from URL
  useEffect(() => {
    if (slides.length > 0) {
      const slideParam = searchParams?.get('slide');
      if (slideParam) {
        const slideNum = parseInt(slideParam, 10);
        if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= slides.length) {
          setCurrentSlide(slideNum);
          prevSlideRef.current = slideNum;
        }
      }
    }
  }, [searchParams, slides.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentSlideData = slides.find((slide) => slide.slide === currentSlide) || slides[0];

  return (
    <div className="relative w-full h-full bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm p-2 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 1}
            className={`p-2 rounded-md ${currentSlide === 1 ? 'text-gray-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Slide {currentSlide} of {slides.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentSlide === slides.length}
            className={`p-2 rounded-md ${currentSlide === slides.length ? 'text-gray-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            title="Toggle thumbnails"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 16v-5h2v3h3v2H5zm0-14h5v2H7v3H5V2zm10 5h2V5h-2V2h-3v2h3v3zm-2 7h2v-3h-2v3z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-4 px-4 h-full overflow-auto">
        <div
          key={currentSlide}
          className="h-full"
          style={{
            position: 'relative',
            opacity: currentSlideData ? 1 : 0,
            transform: `translateX(${slideDirection === 'right' ? '5%' : '-5%'})`,
            transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
            willChange: 'transform, opacity',
          }}
          onTransitionEnd={() => {
            // Reset transform after animation completes
            const element = document.querySelector('[data-slide-animation]') as HTMLElement;
            if (element) {
              element.style.transform = 'translateX(0)';
            }
          }}
          data-slide-animation
        >
          {currentSlideData?.content || (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No slide content available</p>
            </div>
          )}
        </div>
      </div>

      {/* Slide Navigation (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">{currentSlideData?.title}</div>
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(10, slides.length) }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => goToSlide(num)}
                className={`w-3 h-1 rounded-full ${currentSlide === num ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-label={`Go to slide ${num}`}
              />
            ))}
            {slides.length > 10 && (
              <span className="text-xs text-gray-500 ml-1">+{slides.length - 10}</span>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails Sidebar */}
      {showThumbnails && (
        <div className="absolute top-16 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 overflow-y-auto p-4 z-20">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Slides</h3>
            <button
              onClick={() => setShowThumbnails(false)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Close thumbnails"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            {slides.map((slide) => (
              <button
                key={slide.slide}
                onClick={() => {
                  goToSlide(slide.slide);
                  setShowThumbnails(false);
                }}
                className={`w-full p-2 text-left rounded-md text-sm ${
                  currentSlide === slide.slide
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{slide.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {slide.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PresentationViewer;
