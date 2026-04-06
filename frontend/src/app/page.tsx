import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Longevity Coach - Your Guide to Health & Longevity',
  description:
    'Discover optimal health strategies, track your journey, and learn about evidence-based longevity practices',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">Longevity Coach</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
          Your personal guide to optimal health and longevity through evidence-based practices.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
              <CardTitle>Optimal Metrics</CardTitle>
              <CardDescription>
                Track and understand your key health metrics for optimal longevity.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link href="/optimum">Explore Metrics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
              <CardTitle>My Journey</CardTitle>
              <CardDescription>
                Follow my personal health journey and lessons learned.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link href="/journey">View Journey</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Have questions or want to collaborate? Reach out to us.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Latest Updates</h2>
        <div className="text-center text-gray-500">
          <p>Coming soon: Latest articles and updates on longevity research.</p>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
          Begin tracking your health metrics and join our community focused on longevity and optimal
          health.
        </p>
        <Button asChild size="lg">
          <Link href="/optimum">Get Started</Link>
        </Button>
      </section>
    </div>
  );
}
