# Smart Brain Tutoring - Frontend Only

This is a frontend-only version of the Smart Brain Tutoring and Learning Center application. It includes all the UI components, pages, and styling from the original project but removes all backend dependencies. The application now uses mock data and simulated authentication for demonstration purposes.

## Features

- 🎨 Complete UI/UX with modern design
- 📱 Responsive design for all devices
- 🎭 Beautiful animations and transitions
- 🧩 Modular component architecture
- 🎯 Multiple pages (Home, About, Services, Pricing, etc.)
- 🔐 Mock authentication system (no backend required)
- 📊 Mock data for all components and features
- 📊 Interactive components and charts
- 🎨 Tailwind CSS with custom design system

## Pages Included

- **Home** - Landing page with hero section, features, and testimonials
- **About** - Company information and mission
- **Services** - Tutoring services overview
- **Pricing** - Credit packages and pricing plans
- **Tutors** - Tutor information and application
- **FAQ** - Frequently asked questions
- **Contact** - Contact information and forms
- **Blog** - Blog and resources
- **Legal Pages** - Terms, Privacy, Refund, Accessibility

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Recharts** - Data visualization
- **Lottie** - Animations
- **Swiper** - Carousel/slider components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── animations/     # Animation components
│   ├── charts/         # Chart components
│   ├── tutors/         # Tutor-specific components
│   └── skeletons/      # Loading skeleton components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── assets/             # Static assets (images, etc.)
└── styles/             # Global styles and CSS
```

## Mock Authentication

The app includes a mock authentication system for demonstration purposes:

- **Demo Login**: Use any email/password to "sign in"
- **Demo User**: Automatically logs in as a demo user
- **No Backend**: All authentication is simulated locally

To test authentication:

1. Click "Sign Up" or "Log In"
2. Enter any credentials
3. You'll be logged in as a demo user

## Customization

### Colors and Theming

The app uses a comprehensive design system defined in `tailwind.config.ts`. You can customize:

- Color palette
- Typography
- Spacing
- Border radius
- Shadows
- Animations

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

### Styling

- Use Tailwind CSS classes for styling
- Custom CSS can be added to `src/index.css`
- Component-specific styles can be added to individual component files

## What's Not Included

This frontend-only version does not include:

- Database connections
- User authentication backend
- Payment processing
- Real-time features
- Admin dashboard functionality
- Data persistence
- API integrations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a frontend-only demo project. If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. Please check with the original project for licensing terms.

## Support

For questions about this frontend-only version, please refer to the original project documentation or create an issue in the repository.
