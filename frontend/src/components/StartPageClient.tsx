'use client';

import { Activity, BarChart2, BookOpen, HeartPulse, MessageSquare, Users } from 'lucide-react';

import { ContentTeaser } from './ContentTeaser';
import { PresentationEmbed } from './PresentationEmbed';

export function StartPageClient() {
  return (
    <div className="space-y-12">
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Empowering your journey to optimal health and longevity through personalized,
          evidence-based strategies.
        </p>
      </div>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Our Vision & Mission</h2>
        <div className="space-y-8">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <PresentationEmbed
              src="/assets/presentation/longevity-vision.html"
              title="Longevity Vision Presentation"
              className="w-full h-[600px]"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Why Longevity Matters</h3>
            <p className="text-lg">
              Longevity isn&apos;t just about adding years to your life—it&apos;s about adding life
              to your years. Our approach focuses on optimizing healthspan, the period of life spent
              in good health, through evidence-based practices and personalized strategies.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Explore Our Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ContentTeaser
            title="Optimal Health Metrics"
            description="Discover the key biomarkers for longevity and how to optimize them for better healthspan. Track your progress with our comprehensive guides."
            href="/optimum"
            ctaText="View Metrics"
            icon={<BarChart2 className="w-5 h-5" />}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700"
          />

          <ContentTeaser
            title="My Health Journey"
            description="Follow my personal health optimization journey, lessons learned, and results. Discover what works and what doesn't through real-world experience."
            href="/journey"
            ctaText="Read My Story"
            icon={<Activity className="w-5 h-5" />}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700"
          />

          <ContentTeaser
            title="Contact & Support"
            description="Get in touch with any questions or feedback. Our team is here to support your health optimization journey every step of the way."
            href="/contact"
            ctaText="Get in Touch"
            icon={<MessageSquare className="w-5 h-5" />}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700"
          />

          <ContentTeaser
            title="Blog & Articles"
            description="Explore our collection of articles, research summaries, and practical guides on longevity, health optimization, and evidence-based practices."
            href="/blog"
            ctaText="Read Articles"
            icon={<BookOpen className="w-5 h-5" />}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700"
          />

          <ContentTeaser
            title="Community"
            description="Join our community of like-minded individuals on the journey to better health and longevity. Share experiences and learn from others."
            href="/community"
            ctaText="Join Community"
            icon={<Users className="w-5 h-5" />}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700"
          />

          <ContentTeaser
            title="Health Assessments"
            description="Take our health assessment to get personalized recommendations and track your progress over time."
            href="/assessments"
            ctaText="Start Assessment"
            icon={<HeartPulse className="w-5 h-5" />}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700"
          />
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-8 my-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Optimizing Your Health Today</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join our community and take the first step towards a longer, healthier life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            Get Started
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
