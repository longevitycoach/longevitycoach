# Content Structure

This directory contains all content for the Longevity Coach website.

## Directory Structure

- `docs/` - Documentation content
  - `guides/` - How-to guides and tutorials
  - `reference/` - API and component references
  - `concepts/` - Conceptual documentation
- `components/` - Component documentation
  - `form/` - Form components
  - `layout/` - Layout components
- `blog/` - Blog posts
- `assets/` - Static assets
  - `images/` - Image files
  - `downloads/` - Downloadable files

## Adding New Content

1. Create a new Markdown (`.md`) file in the appropriate directory
2. Add frontmatter at the top of the file:
   ```yaml
   ---
   title: "Page Title"
   description: "Brief description"
   created: YYYY-MM-DD
   updated: YYYY-MM-DD
   ---
   ```
3. Write content using Markdown syntax

## Best Practices

- Use descriptive filenames in kebab-case (e.g., `getting-started.md`)
- Keep line lengths under 100 characters
- Use relative links to other content
- Add alt text for images
- Keep images in the `assets/images` directory

## Previewing Changes

Run the development server to preview your changes:

```bash
npm run dev
```

The site will be available at http://localhost:3000
