# PowerDev

A modern, full-stack web development agency website built with Next.js 15, featuring a beautiful dark theme, 3D animations, and a comprehensive admin dashboard.

## 🚀 Features

### Frontend
- **Modern Design**: Dark theme with gradient backgrounds and smooth animations
- **3D Elements**: Interactive 3D logo and hero canvas using Three.js
- **Responsive Layout**: Mobile-first design that works on all devices
- **Component Library**: Built with Radix UI and Tailwind CSS
- **Animations**: Smooth transitions powered by Framer Motion

### Sections
- **Hero**: Eye-catching landing section with 3D elements
- **About**: Company information and team details
- **Services**: Web development services showcase
- **Products**: Product catalog with filtering
- **Portfolio**: Project showcase with detailed views
- **Pricing**: Service packages and pricing plans
- **Testimonials**: Customer reviews and feedback
- **Contact**: Contact form and business information
- **Join Us**: Career opportunities section

### Backend & Database
- **API Routes**: RESTful API endpoints for data management
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: API key-based authentication for admin routes
- **File Upload**: Image upload functionality
- **Admin Dashboard**: Content management system

### Admin Features
- **Dashboard**: Admin panel for content management
- **User Management**: User roles and permissions
- **Content Management**: Manage portfolio, products, and testimonials
- **Theme Toggle**: Dark/light mode switching

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics and animations
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Modern database ORM
- **PostgreSQL** - Reliable relational database
- **Next-Cloudinary** - Image optimization and management

### Development Tools
- **Turbopack** - Fast development builds
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Next Sitemap** - Automatic sitemap generation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PowerDev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables in `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/powerdev_db"
   DIRECT_URL="postgresql://username:password@localhost:5432/powerdev_db"
   API_SECRET_KEY="your-secret-api-key-here"
   SITE_URL="https://your-domain.com"
   SEED_PASSWORD_SECRET="your-seed-password-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:

- **User**: User accounts with roles (USER, ADMIN)
- **Portfolio**: Project showcase items
- **Product**: Product catalog items
- **Testimonial**: Customer reviews and feedback

## 📁 Project Structure

```
PowerDev/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin dashboard routes
│   ├── (main)/            # Main website routes
│   ├── api/               # API routes
│   └── login/             # Authentication pages
├── components/            # React components
│   ├── 3d/               # 3D components (Three.js)
│   ├── admin/            # Admin dashboard components
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── data/                 # Static data files
├── lib/                  # Utility functions and types
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Make sure to set the following environment variables in your production environment:

- `DATABASE_URL` - Production database connection string
- `DIRECT_URL` - Direct database URL for migrations
- `API_SECRET_KEY` - Secure API key for authentication
- `SITE_URL` - Your production domain
- `SEED_PASSWORD_SECRET` - Secret for password encryption

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma db seed` - Seed the database with sample data

## 🎨 Customization

### Themes
The application supports dark/light themes. You can customize the theme in:
- `components/ThemeProvider.tsx` - Theme configuration
- `tailwind.config.ts` - Color scheme customization

### Styling
- Global styles: `app/globals.css`
- Component styles: Individual component files with Tailwind classes
- Custom animations: Framer Motion configurations

### Content
- Static content: `data/` directory
- Dynamic content: Database models and API routes

## 📝 API Endpoints

- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/[id]` - Get specific portfolio item
- `GET /api/products` - Get all products
- `POST /api/upload` - Upload files
- `POST /api/forms` - Submit contact forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ using Next.js, React, and modern web technologies.# PowerDev
