'use client';

export function CookieConsent() {
  const dismiss = () => {
    document.cookie = 'cookie-consent=accepted; max-age=31536000; path=/; samesite=lax';
    document.getElementById('cookie-consent')?.classList.add('translate-y-full');
  };

  return (
    <div
      id="cookie-consent"
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 z-50 transition-transform duration-300 transform translate-y-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0 md:mr-4">
            We use cookies to enhance your experience. By continuing to visit this site, you agree
            to our use of cookies.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={dismiss}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Decline
            </button>
            <button
              onClick={dismiss}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
