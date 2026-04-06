'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ContentTeaserProps {
  title: string;
  description: string;
  href: string;
  ctaText?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ContentTeaser({
  title,
  description,
  href,
  ctaText = 'Learn more',
  className = '',
  icon,
}: ContentTeaserProps) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden h-full flex flex-col transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <CardHeader className="pb-4">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 text-base text-gray-600 dark:text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-0">
        <Link
          href={href}
          className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
