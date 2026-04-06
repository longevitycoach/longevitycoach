import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import Layout from '@/components/layout/Layout';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// SEO & Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://longevitycoach.app'),
  title: {
    default: 'Longevity Coach | Optimize Your Healthspan',
    template: '%s | Longevity Coach',
  },
  description:
    'Optimize your healthspan through personalized blood biomarker analysis and evidence-based longevity strategies.',
  keywords: [
    'longevity',
    'health optimization',
    'biomarkers',
    'healthspan',
    'longevity coach',
    'biohacking',
    'personalized medicine',
    'preventive healthcare',
    'longevity science',
    'health tracking',
  ],
  authors: [
    {
      name: 'Longevity Coach Team',
      url: 'https://longevitycoach.app/about',
    },
  ],
  creator: 'Longevity Coach',
  publisher: 'Longevity Coach',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://longevitycoach.app',
    title: 'Longevity Coach | Optimize Your Healthspan',
    description:
      'Optimize your healthspan through personalized blood biomarker analysis and evidence-based longevity strategies.',
    siteName: 'Longevity Coach',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Longevity Coach - Optimize Your Healthspan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Longevity Coach | Optimize Your Healthspan',
    description:
      'Optimize your healthspan through personalized blood biomarker analysis and evidence-based longevity strategies.',
    creator: '@longevitycoach',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png' }, { url: '/safari-pinned-tab.svg', rel: 'mask-icon' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
};

// Viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

// Google Analytics measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Vercel Analytics */}
        <SpeedInsights />
        <Analytics />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>

          {/* Cookie Consent */}
          <div
            id="cookie-consent"
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 z-50 transition-transform duration-300 transform translate-y-full"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0 md:mr-4">
                  We use cookies to enhance your experience. By continuing to visit this site, you
                  agree to our use of cookies.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      document.cookie =
                        'cookie-consent=accepted; max-age=31536000; path=/; samesite=lax';
                      document.getElementById('cookie-consent')?.classList.add('translate-y-full');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => {
                      document.cookie =
                        'cookie-consent=accepted; max-age=31536000; path=/; samesite=lax';
                      document.getElementById('cookie-consent')?.classList.add('translate-y-full');
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Accept Cookies
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Script id="cookie-consent-init" strategy="afterInteractive">
            {`
              if (!document.cookie.split('; ').find(row => row.startsWith('cookie-consent='))) {
                document.getElementById('cookie-consent')?.classList.remove('translate-y-full');
              }
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
