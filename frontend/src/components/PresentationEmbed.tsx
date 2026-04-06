'use client';

import React from 'react';

interface PresentationEmbedProps {
  src: string;
  title: string;
  className?: string;
}

export function PresentationEmbed({ src, title, className = '' }: PresentationEmbedProps) {
  return (
    <div
      className={`w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <iframe
        src={src}
        title={title}
        allowFullScreen
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
