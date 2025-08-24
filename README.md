# Course Generator

A modern, mobile-responsive React course generation application built with shadcn/ui components and powered by OpenRouter AI.

## Features

- 🎨 **Modern UI**: Built with shadcn/ui components for a clean, professional look
- 📱 **Mobile-First**: Responsive design that works perfectly on all devices
- 🤖 **AI Course Generation**: Powered by OpenRouter with access to multiple AI models
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds
- 🔒 **Secure**: Environment variable configuration for API keys
- 🎯 **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: OpenRouter API (OpenAI SDK)
- **Icons**: Lucide React
- **State Management**: React Hooks

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

## Quick Start

1. **Clone and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd course-generator
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your OpenRouter API key:

   ```env
   VITE_OPENROUTER_API_KEY=your_actual_api_key_here
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── openrouter.ts # OpenRouter API client
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles and Tailwind
```

## Configuration

### Environment Variables

| Variable                  | Description             | Required |
| ------------------------- | ----------------------- | -------- |
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key | Yes      |

### OpenRouter Models

The app is configured to use `openai/gpt-3.5-turbo` by default. You can modify the model in `src/App.tsx`:

```typescript
const response = await openai.chat.completions.parse({
  model: 'openai/gpt-4o', // Change this to any available model
  // ... other options
})
```

## Mobile Responsiveness

The app is built with mobile-first design principles:

- Responsive breakpoints using Tailwind CSS
- Touch-friendly button sizes (44px minimum)
- Optimized spacing for mobile devices
- Fixed bottom input for easy access

## Development

### Adding New shadcn/ui Components

1. Install the component:

   ```bash
   npx shadcn@latest add [component-name]
   ```

2. Import and use in your components:
   ```typescript
   import { ComponentName } from '@/components/ui/component-name'
   ```

### Styling

- Uses Tailwind CSS with custom CSS variables for theming
- Dark mode support built-in
- Consistent spacing and typography scales
- Accessible color contrasts

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables in Production

Make sure to set the `VITE_OPENROUTER_API_KEY` environment variable in your production environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:

- Check the [OpenRouter documentation](https://openrouter.ai/docs)
- Review the [shadcn/ui documentation](https://ui.shadcn.com/)
- Open an issue in this repository
