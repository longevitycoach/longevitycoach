---
title: "Style Guide"
description: "Guidelines for writing consistent and maintainable code and content"
created: 2025-06-23
updated: 2025-06-23
weight: 20
---

# Style Guide

This guide outlines the coding and content standards for the Longevity Coach project.

## Code Style

### JavaScript/TypeScript

- Use TypeScript for all new code
- Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Use `camelCase` for variables and functions
- Use `PascalCase` for types, interfaces, and React components
- Use 2 spaces for indentation
- Use single quotes for strings
- Include semicolons
- Maximum line length: 100 characters

### React Components

- Use functional components with hooks
- Define props interfaces for all components
- Use descriptive component and prop names
- Keep components small and focused
- Use TypeScript for prop types
- Destructure props at the top of the component

### CSS/SCSS

- Use Tailwind CSS for styling
- Follow the [Tailwind CSS best practices](https://tailwindcss.com/docs/optimizing-for-production)
- Use utility classes first, extract components when needed
- Keep custom CSS to a minimum
- Use CSS variables for theming

## Content Guidelines

### Writing Style

- Use clear, concise language
- Write in active voice
- Use second person ("you") for user documentation
- Use present tense
- Keep paragraphs short (3-5 sentences)
- Use headings to break up content
- Use lists for steps or related items

### Markdown Formatting

- Use ATX-style headings (##, ###, etc.)
- Use fenced code blocks with language specification
- Use reference-style links at the bottom of the document
- Use tables for tabular data
- Use backticks for `inline code`

## Component Documentation

Each component should be documented with:

1. A brief description
2. Props table with types and defaults
3. Usage examples
4. Best practices
5. Related components

Example:

```tsx
/**
 * Button component for user interactions
 *
 * @component
 * @example
 * <Button variant="primary">Click me</Button>
 */
interface ButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline";
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  // Component implementation
};
```

## Accessibility

- Use semantic HTML
- Ensure proper heading hierarchy
- Add alt text to images
- Ensure sufficient color contrast
- Make interactive elements keyboard-navigable
- Use ARIA attributes when necessary

## Performance

- Optimize images
- Lazy load non-critical resources
- Minimize JavaScript bundle size
- Use code splitting
- Implement proper caching

## Testing

- Write unit tests for utility functions
- Write integration tests for components
- Test for accessibility
- Test across browsers and devices
- Include error boundaries

## Version Control

- Write descriptive commit messages
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Keep commits small and focused
- Use feature branches
- Open pull requests for review

## Documentation

- Document all public APIs
- Include usage examples
- Keep README files up to date
- Document breaking changes
- Include a changelog
