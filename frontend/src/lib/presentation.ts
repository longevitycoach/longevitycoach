import fs from 'fs';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

// Define the structure of a slide
export interface Slide {
  id: string;
  title: string;
  description: string;
  slideNumber: number;
  path: string;
  content?: MDXRemoteSerializeResult;
  metadata: {
    created: string;
    updated: string;
    authors: string[];
    tags: string[];
    status: 'draft' | 'published' | 'archived';
  };
}

// Define the presentation structure
export interface Presentation {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  metadata: {
    created: string;
    updated: string;
    version: string;
  };
}

// Get the directory path for presentation content
const getContentDirectory = () => {
  return path.join(process.cwd(), 'content/presentation');
};

// Get all slide files from the content directory
export const getAllSlideFiles = async (): Promise<string[]> => {
  try {
    const contentDir = getContentDirectory();
    const slideFiles: string[] = [];

    // Read the main presentation directory
    // Look for slide files in the slides subdirectory
    const slidesDir = path.join(contentDir, 'slides');
    if (fs.existsSync(slidesDir)) {
      const slideEntries = fs.readdirSync(slidesDir, { withFileTypes: true });
      for (const entry of slideEntries) {
        if (entry.isFile() && entry.name.endsWith('.mdx')) {
          slideFiles.push(path.join('slides', entry.name));
        }
      }
    }

    // Sort slides by their numeric prefix (e.g., 01-intro.mdx, 02-overview.mdx)
    return slideFiles.sort((a, b) => {
      const aNum = parseInt(a.split('-')[0].replace(/\D/g, ''), 10);
      const bNum = parseInt(b.split('-')[0].replace(/\D/g, ''), 10);
      return aNum - bNum;
    });
  } catch (error) {
    console.error('Error reading slide files:', error);
    return [];
  }
};

// Parse frontmatter from MDX content
const parseFrontmatter = (content: string): Record<string, unknown> => {
  const frontmatter: Record<string, unknown> = {};
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (frontmatterMatch) {
    const frontmatterText = frontmatterMatch[1];
    frontmatterText.split('\n').forEach((line) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();

        // Handle array values
        if (value.startsWith('[') && value.endsWith(']')) {
          frontmatter[key] = value
            .slice(1, -1)
            .split(',')
            .map((item) => item.trim().replace(/['"]/g, ''));
        }
        // Handle object values (simple key-value pairs)
        else if (value.includes('{') && value.includes('}')) {
          try {
            frontmatter[key] = JSON.parse(value);
          } catch (e) {
            frontmatter[key] = value;
          }
        }
        // Handle boolean values
        else if (value === 'true' || value === 'false') {
          frontmatter[key] = value === 'true';
        }
        // Handle numeric values
        else if (!isNaN(Number(value))) {
          frontmatter[key] = Number(value);
        }
        // Handle string values
        else {
          frontmatter[key] = value.replace(/^["']|["']$/g, '');
        }
      }
    });
  }

  return frontmatter;
};

// Load a single slide by ID
export const getSlideById = async (id: string): Promise<Slide | null> => {
  try {
    const slides = await getAllSlideFiles();
    const slideFile = slides.find((file) => file.includes(id));

    if (!slideFile) {
      return null;
    }

    const filePath = path.join(getContentDirectory(), slideFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(fileContent);

    // Remove frontmatter from content
    const content = fileContent.replace(/^---\n[\s\S]*?\n---\n*/, '');

    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      parseFrontmatter: false,
    });

    return {
      id,
      title: frontmatter.title || 'Untitled Slide',
      description: frontmatter.description || '',
      slideNumber: frontmatter.slide || 0,
      path: `/presentation/slides/${id}`,
      content: mdxSource,
      metadata: {
        created: frontmatter.created || new Date().toISOString(),
        updated: frontmatter.updated || new Date().toISOString(),
        authors: frontmatter.authors || [],
        tags: frontmatter.tags || [],
        status: frontmatter.status || 'draft',
      },
    };
  } catch (error) {
    console.error(`Error loading slide ${id}:`, error);
    return null;
  }
};

// Get all slides with their content
export const getAllSlides = async (): Promise<Slide[]> => {
  try {
    const slideFiles = await getAllSlideFiles();
    const slides: Slide[] = [];

    for (const file of slideFiles) {
      const id = path.basename(file, '.mdx').replace(/^\d+-/, '');
      const slide = await getSlideById(id);
      if (slide) {
        slides.push(slide);
      }
    }

    return slides.sort((a, b) => a.slideNumber - b.slideNumber);
  } catch (error) {
    console.error('Error loading slides:', error);
    return [];
  }
};

// Get the presentation structure
export const getPresentation = async (): Promise<Presentation> => {
  const slides = await getAllSlides();

  return {
    id: 'longevity-ai-coach',
    title: 'Longevity AI Coach',
    description: 'Interactive presentation of the Longevity AI Coach platform',
    slides,
    metadata: {
      created: '2025-06-23',
      updated: new Date().toISOString(),
      version: '1.0.0',
    },
  };
};

// Get adjacent slides for navigation
export const getAdjacentSlides = async (currentSlideId: string) => {
  const slides = await getAllSlides();
  const currentIndex = slides.findIndex((slide) => slide.id === currentSlideId);

  if (currentIndex === -1) {
    return { prevSlide: null, nextSlide: null };
  }

  return {
    prevSlide: currentIndex > 0 ? slides[currentIndex - 1] : null,
    nextSlide: currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null,
  };
};

// Get slide by slide number
export const getSlideByNumber = async (slideNumber: number): Promise<Slide | null> => {
  const slides = await getAllSlides();
  return slides[slideNumber - 1] || null;
};

// Get the total number of slides
export const getTotalSlides = async (): Promise<number> => {
  const slides = await getAllSlideFiles();
  return slides.length;
};
