---
title: "DEP-001: GitHub Pages Setup & Content Strategy"
description: "Documentation and content deployment strategy"
created: 2025-06-04
updated: 2025-06-23
authors:
status: approved
related: ["dec-009-component-library-selection"]
tags: ["documentation", "deployment", "github-pages"]
---

# GitHub Pages Setup & Content Strategy

## Context and Problem Statement

We need a comprehensive solution for hosting our documentation and static content with the following requirements:

- Zero-cost hosting solution
- Automated deployment from our repository
- Versioned documentation
- Support for custom domains
- Integration with our component library (see [DEP-009](./dec-009-component-library-selection.md))
- Automated rebuilds when component library changes

## Decision

We will use **GitHub Pages** with the following architecture:

- **Source Content**: `/content` directory in the main branch
- **Static Site Generator**: Next.js with static export
- **Component Library**: Headless UI + Radix UI (as per DEP-009)
- **Deployment**: Automated via GitHub Actions to `gh-pages` branch
- **URL**: https://longevitycoach.github.io/longevitycoach/

## Content Structure

```
/content
├── docs/                    # Documentation content
│   ├── guides/              # How-to guides
│   ├── reference/           # API and component references
│   └── concepts/            # Conceptual documentation
├── components/              # Component documentation
│   ├── button.md
│   ├── form/
│   └── layout/
├── blog/                    # Blog posts
├── assets/                  # Images and other media
│   ├── images/
│   └── downloads/
└── config.yml              # Site configuration
```

### 1. Content Management

- All content will be written in Markdown with frontmatter
- Content will be organized by type and functionality
- Images and assets will be co-located with their content
- Content will be generated in the `/conten/preparedContent` directory
  - startpage.md:
    - https://github.com/ma3u/blood-test/blob/main/public/longevity.md
    - /docs/index.html
  - journey.md:
    - Personal Jouirney based on Atomic habbits shown as visual time line of https://www.linkedin.com/pulse/build-personalized-health-coach-based-current-state-buchhorn-roth-ptyfe/ and longevity.md
  - optimal.md:
    - Optimum Values: https://github.com/ma3u/blood-test/blob/main/public/ReferenceValues.md
    - contact.md:
  - Business Plan: copy and embedd the business plan from docs/presentation/

### 2. Build Process

- Next.js will be used to generate static HTML
- Create modern responsive design elements with Tailwind CSS
- On the startpage teaser each section should be clickable and lead to the corresponding page
- On the startpage teaser each section should have a modern design with a modern color scheme
- reference page should have a modern design with a modern color scheme
- contact page will use the /docs/index.html contact section as template
- create a modern Navigation
- Create mobile first design
- Create a modern footer
- Create a modern header with navigation
- use the image /content/assets/images/longevitycoach.png as logo for the first page
- use the image /content/assets/images/photo_ma3u.webp for the journey.md
- Use Headless UI and Radix UI for components
- Use MDX for rich component integration
- Use TypeScript for type safety
- Use GitHub Actions for CI/CD
- generate static HTML files
- Use GitHub Pages for hosting
- The build will be triggered on:
  - Push to main branch
  - Changes to `/content` directory
  - Updates to component library (monitored via package.json)

### 3. Deployment Workflow

1. On push to `main` or changes to monitored paths:
   - Checkout repository
   - Install dependencies
   - Build static site
   - Deploy to `gh-pages` branch
   - Invalidate CDN cache

### 4. GitHub Actions Configuration

- Workflow file: `.github/workflows/gh-pages.yml`
- Dependencies cached between builds
- Deployment status reported to PRs
- Preview deployments for PRs

## Status

- [x] Basic GitHub Pages setup
- [ ] Migrate existing content to new structure
- [ ] Set up Next.js static export
- [ ] Configure GitHub Actions for automated deployment
- [ ] Implement component library integration

## Related

- [DEP-009: Component Library Selection](./dec-009-component-library-selection.md)
- Issue: #5 - Set up GitHub Pages for documentation
- PR: #4 - GitHub Pages Setup

## Notes

- The site will be available at: https://longevitycoach.github.io/longevitycoach/
- Preview deployments will be available for each PR
- Content updates will be automatically deployed on merge to `main`
- The build process will be optimized for performance and cache efficiency
