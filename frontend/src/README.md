# Frontend Architecture

This directory contains the Next.js application for Longevity Coach.

## Directory Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── (marketing)/        # Marketing pages (landing, about, etc.)
│   ├── (app)/              # Authenticated app routes
│   ├── api/                # API routes
│   └── [...]
│
├── components/             # Reusable UI components
│   ├── ui/                  # Base UI components (buttons, inputs, etc.)
│   │   ├── button/
│   │   ├── card/
│   │   └── ...
│   │
│   ├── layout/             # Layout components
│   │   ├── header/
│   │   ├── footer/
│   │   └── ...
│   │
│   ├── forms/              # Form components
│   │   ├── form-field/
│   │   ├── input/
│   │   └── ...
│   │
│   └── features/           # Feature-specific components
│       ├── dashboard/
│       ├── blood-tests/
│       └── ...
│
├── lib/                   # Utility functions and libraries
│   ├── utils/
│   ├── hooks/
│   └── services/
│
├── styles/                # Global styles and themes
│   ├── globals.css
│   └── theme.css
│
└── types/                 # TypeScript type definitions
    └── index.ts
```

## Component Organization

### Base UI Components (`/components/ui`)

- Primitive components (buttons, inputs, etc.)
- Built with Headless UI and Radix UI primitives
- Styled with Tailwind CSS
- Should be highly reusable and composable

### Layout Components (`/components/layout`)

- Page layouts and structural components
- Header, footer, navigation
- Grid and container components

### Form Components (`/components/forms`)

- Form controls and inputs
- Form validation components
- Complex form layouts

### Feature Components (`/components/features`)

- Feature-specific components
- Page-specific components that aren't reusable
- Organized by feature or domain

## Best Practices

1. **Component Structure**

   - One component per file
   - Co-locate component tests
   - Include a `README.md` for complex components

2. **Styling**

   - Use Tailwind CSS for styling
   - Prefer utility classes over custom CSS
   - Use CSS variables for theming

3. **State Management**

   - Use React hooks for local state
   - Use Zustand for global state
   - Keep state as local as possible

4. **Performance**
   - Use dynamic imports for large components
   - Implement proper code splitting
   - Optimize images and assets

## Development Workflow

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

2. Create your component:

   ```bash
   # Create a new component
   mkdir -p src/components/ui/your-component
   touch src/components/ui/your-component/index.tsx
   touch src/components/ui/your-component/your-component.stories.tsx
   touch src/components/ui/your-component/your-component.test.tsx
   ```

3. Document your component:

   - Add JSDoc comments
   - Create a story in Storybook
   - Write tests

4. Submit a pull request

## Testing

Run tests:

```bash
npm test
```

Run Storybook:

```bash
npm run storybook
```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.
