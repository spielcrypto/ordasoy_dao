# Ordasoy DAO - Next.js Frontend

This is the Next.js frontend application for Ordasoy DAO, a decentralized platform connecting plantation companies with investors through NFT-based investment opportunities.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher (recommended) or npm/yarn

### Installation

1. Install dependencies:
```bash
pnpm install
# or
npm install
```

2. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # UI components (shadcn/ui)
│   │   └── sections/    # Page sections
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── providers/       # React context providers
├── public/              # Static assets
└── package.json
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typescript-check` - Run TypeScript type checking

## Features

- **Next.js 14** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** with OKLCH color system
- **Shadcn/ui** component library
- **Dark/Light mode** support
- **React Query** for server state management
- **Zustand** for client state management

## Tech Stack

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/ui
- next-themes
- @tanstack/react-query
- Zustand
- Sonner (toast notifications)

