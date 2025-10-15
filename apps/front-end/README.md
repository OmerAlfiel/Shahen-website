# Shahen - Next.js Application

This is a [Next.js](https://nextjs.org/) project for Shahen, a freight and cargo transportation service platform in Saudi Arabia.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the frontend directory:

```bash
cd apps/front-end
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Starting Production Server

```bash
npm run start
# or
yarn start
```

## 📁 Project Structure

```
front-end/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── dashboard/         # Dashboard page
│   └── tracking/          # Tracking page
├── components/            # React components
│   ├── ui/               # UI components (buttons, inputs, etc.)
│   ├── modals/           # Modal components
│   ├── header.tsx        # Header component
│   ├── footer.tsx        # Footer component
│   └── ...               # Other components
├── contexts/             # React contexts
│   └── language-context.tsx
├── hooks/                # Custom React hooks
│   ├── use-contact.ts
│   ├── use-quote.ts
│   └── ...
├── lib/                  # Utility functions
├── services/             # API services
│   ├── contact-api.ts
│   └── quote-api.ts
├── styles/               # Global styles
│   └── globals.css
├── public/               # Static assets
└── next.config.js        # Next.js configuration
```

## 🌐 Features

- **Bilingual Support**: Arabic and English language support
- **Truck Booking**: Multiple truck types and sizes
- **Real-time Tracking**: Track shipments in real-time
- **Contact Form**: Easy communication with the team
- **Responsive Design**: Mobile-first, fully responsive
- **Mapbox Integration**: Location selection with maps
- **Insurance Options**: Cargo insurance available

## 🛠️ Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Mapbox GL**: Interactive maps
- **Date-fns**: Date formatting and manipulation
- **Lucide React**: Icon library

## 📝 Key Components

### Language Context

Manages application language (Arabic/English) and translations.

### API Services

- `contact-api.ts`: Contact form submissions
- `quote-api.ts`: Shipping quote requests

### Custom Hooks

- `use-contact`: Contact form state management
- `use-quote`: Quote request state management
- `use-viewport-height`: Mobile viewport height fix
- `use-intersection-observer`: Scroll animations

## 🎨 Styling

The project uses Tailwind CSS with custom configurations for:

- RTL support for Arabic language
- Custom color schemes
- Responsive breakpoints
- Animations and transitions

## 🌍 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox access token

## 📱 Pages

- `/`: Home page with hero, features, and truck types
- `/contact`: Contact form page
- `/login`: User authentication
- `/dashboard`: User dashboard (protected)
- `/tracking`: Shipment tracking

## 🚢 Deployment

The application is configured for deployment on:

- Vercel (recommended for Next.js)
- Railway (with nixpacks.toml and railway.toml)
- Docker (with .dockerignore)

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

## 📄 License

© 2025 COMPANY FIKR FOR COMMUNICATIONS AND INFORMATION TECHNOLOGY. All rights reserved.

## 🤝 Support

For support, contact us at:

- Phone: 0500381369
- Email: Available on website
- WhatsApp: Available on website
