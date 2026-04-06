---
title: "Development Setup Guide"
description: "Get started with the Longevity Coach development environment"
created: 2025-06-23
updated: 2025-06-23
weight: 10
---

# Development Setup Guide

This guide will help you set up your development environment for the Longevity Coach project.

## Prerequisites

- Node.js 18+ and npm 9+
- Git
- A code editor (VS Code recommended)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/longevitycoach/longevitycoach.git
   cd longevitycoach
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

## Project Structure

```
.
├── content/           # Documentation and content
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/      # App Router
│   │   ├── components/# Reusable components
│   │   └── styles/   # Global styles
│   └── public/       # Static files
└── memory-bank/      # Project documentation
```

## Contributing

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:

   ```bash
   git commit -m "feat: add your feature"
   ```

3. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a pull request.

## Troubleshooting

- If you encounter dependency issues, try:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- For TypeScript errors, ensure your editor is using the workspace version of TypeScript.

## Need Help?

- Check the [GitHub Issues](https://github.com/longevitycoach/longevitycoach/issues)
- Join our [Discord community](#) (coming soon)
- Email support@longevitycoach.com
