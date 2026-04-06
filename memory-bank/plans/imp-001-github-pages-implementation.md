---
type: plan
id: IMP-001
title: GitHub Pages Implementation Plan
description: Implementation plan for setting up GitHub Pages with Next.js static export for the Longevity Coach project.
status: draft
created: 2025-06-23
updated: 2025-06-25
related:
  - DEC-001
  - DEC-009
---

# IMP-001: GitHub Pages Implementation Plan

## Overview

This document outlines the detailed implementation plan for setting up GitHub Pages with Next.js static export as specified in [DEC-001](../decisions/dec-001-github-pages-setup.md).

## Implementation Status

- **Decision Document**: [DEC-001](../decisions/dec-001-github-pages-setup.md) (Approved)
- **Current Phase**: 2 - Content Migration
- **Last Updated**: 2025-06-23

## Phase 1: Project Setup & Configuration (Completed ✅)

### 1.1 Next.js & Dependencies

- [x] Initialize Next.js with TypeScript and Tailwind CSS
- [x] Install required dependencies:
  - @headlessui/react
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - next-mdx-remote
  - gray-matter

### 1.2 Configuration

- [x] Set up `next.config.js` for static export
- [x] Configure MDX support
- [x] Set up TypeScript configuration
- [x] Configure Tailwind CSS with custom theme
- [x] Enable static export (`next export`)

## Phase 2: Content Migration (In Progress)

### 2.1 Generate Content and structure

- [ ] Set up content directories:
  ```
  /content
    /startpage          # Main landing page content
    /optimum           # Optimal blood values and metrics
    /journey           # Personal health journey
    /contact           # Contact information and form
  ```
- [ ] Create the content for the startpage (embedd the presentation, teaser each content page and link to it)
  - [ ] embedded the business presentation [Business Presentation](https://github.com/ma3u/longevitycoach/tree/main/content/assets/presentation/)
  - [ ] teaser each content page and link to it
- [ ] Create the content for the journey page (embedd the longevity.md and LinkedIn. article)
- [ ] Create the content for the optimum page (embedd the ReferenceValues.md)
- [ ] Create the content for the contact page (embedd the contact.md)
  - [ ] Integrate contact form from `/docs/index.html`
- [ ] Use the related links in the Related Resources section for content creation

### 2.2 Content Requirements

- [ ] Create modern, responsive design for all pages
- [ ] Ensure all pages follow the style guide
- [ ] Implement clickable section teasers on startpage
- [ ] Design modern color scheme for reference pages

### 2.3 Asset Management

- [ ] Organize assets:
  - `/content/assets/images/` for all images
  - `content/assets/presentation/` for embedded slides (GitHub link: [Business Presentation](https://github.com/ma3u/longevitycoach/tree/main/content/assets/presentation/))
  - Use `/content/assets/images/longevitycoach.png` as main logo
  - Use `/content/assets/images/photo_ma3u.webp` for journey section

## Phase 3: Component Integration

### 3.1 UI Components

- [ ] Implement using Headless UI and Radix UI
- [ ] Create reusable components:
  - Navigation
  - Footer
  - Cards
  - Forms
  - Buttons
  - Interactive elements

### 3.2 MDX Integration

- [ ] Set up MDX for rich content
- [ ] Create custom MDX components
- [ ] Ensure TypeScript type safety

## Phase 4: Deployment & CI/CD

### 4.1 GitHub Pages Setup

- [ ] Configure GitHub Actions workflow
- [ ] Set up automatic builds on:
  - Push to `main` branch
  - Changes to `/content` directory
  - Component library updates

### 4.2 Build Process

- [ ] Generate static HTML files
- [ ] Optimize assets
- [ ] Generate sitemap
- [ ] Set up proper caching headers

## Phase 5: Testing & Launch

### 5.1 Testing

- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Accessibility validation

### 5.2 Launch Preparation

- [ ] Final content review
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Documentation updates

## Phase 6: Maintenance

### 6.1 Monitoring

- [ ] Set up error tracking
- [ ] Monitor performance
- [ ] Track content updates

### 6.2 Documentation

- [ ] Update documentation
- [ ] Create contribution guidelines
- [ ] Document component usage

## GitHub Integration

- [ ] Enable GitHub Pages in repository settings
- [ ] Set up branch protection for `main` and `gh-pages`
- [ ] Configure required status checks
- [ ] Set up branch rules for PRs

## Monitoring & Maintenance

- [ ] Set up GitHub Actions status badges
- [ ] Configure monitoring for broken links
- [ ] Set up analytics (if needed)
- [ ] Document maintenance procedures

## Timeline

- Phase 1: 1 day
- Phase 2: 2-3 days
- Phase 3: 2-3 days
- Phase 4: 1 day
- Phase 5: 1 day
- Phase 6: 1 day

Total estimated time: 1-2 weeks

## Related Resources

- [DEP-001: GitHub Pages Setup & Content Strategy](../decisions/dec-001-github-pages-setup.md)
- [Linkedin](https://www.linkedin.com/pulse/build-personalized-health-coach-based-current-state-buchhorn-roth-ptyfe/)
- [Business Plan](https://github.com/ma3u/longevitycoach/tree/main/content/assets/presentation/)
- [ReferenceValues.md](https://github.com/ma3u/blood-test/blob/main/public/ReferenceValues.md)
- [longevity.md](https://github.com/ma3u/blood-test/blob/main/public/longevity.md)
- [contact.md](https://github.com/ma3u/blood-test/blob/main/public/contact.md)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [MDX Documentation](https://mdxjs.com/)

## Status

Last Updated: 2025-06-23

## Notes

- Keep content and code in sync with the component library
- Ensure all documentation is accessible and follows WCAG guidelines
- Consider implementing search functionality with Algolia or similar
- Set up automated link checking in CI/CD
