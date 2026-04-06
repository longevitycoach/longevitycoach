'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

// Import PresentationViewer with dynamic import and SSR disabled
const PresentationViewer = dynamic(() => import('@/components/PresentationViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

const PresentationPageContent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-lg text-gray-600 dark:text-gray-400">
          Loading presentation...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Longevity AI Coach Presentation
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="h-[80vh] relative">
              <PresentationViewer />
            </div>
          </div>

          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Presentation Controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keyboard Shortcuts
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">→</kbd>
                    <span className="text-gray-600 dark:text-gray-400">Next slide</span>
                  </li>
                  <li className="flex items-center">
                    <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">←</kbd>
                    <span className="text-gray-600 dark:text-gray-400">Previous slide</span>
                  </li>
                  <li className="flex items-center">
                    <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">F</kbd>
                    <span className="text-gray-600 dark:text-gray-400">Toggle fullscreen</span>
                  </li>
                  <li className="flex items-center">
                    <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">T</kbd>
                    <span className="text-gray-600 dark:text-gray-400">Toggle thumbnails</span>
                  </li>
                  <li className="flex items-center">
                    <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">ESC</kbd>
                    <span className="text-gray-600 dark:text-gray-400">Exit fullscreen</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Navigation Tips
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Use arrow keys to navigate between slides</li>
                  <li>• Press F to toggle fullscreen mode</li>
                  <li>• Press T to show/hide slide thumbnails</li>
                  <li>• Click on any thumbnail to jump to that slide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PresentationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <PresentationPageContent />
    </Suspense>
  );
}
