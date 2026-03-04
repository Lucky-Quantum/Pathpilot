# PathPilot - AI Career Coach

A full-stack AI-powered career coaching platform built with Next.js, featuring resume building, AI cover letter generation, mock interview practice, and personalized career guidance.

## 🚀 Features

- **AI Resume Builder** - Create professional resumes with AI-powered suggestions
- **AI Cover Letter Generator** - Generate personalized cover letters using Gemini AI
- **Mock Interview Practice** - Test your interview skills with AI-powered quizzes and performance tracking
- **Behind The Build** - Learn about the story and technology behind PathPilot
- **User Authentication** - Secure authentication with Clerk
- **Dashboard** - Personalized career dashboard with progress tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: Neon DB (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Clerk
- **AI**: Google Gemini API
- **Background Jobs**: Inngest
- **Fonts**: Playfair Display, Outfit, JetBrains Mono

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon DB account
- Clerk account
- Google Gemini API key

## ⚡ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd pathpilot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database (Neon DB)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Gemini AI
GEMINI_API_KEY=AIza...
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-career-coach/
├── actions/                 # Server Actions
│   ├── cover-letter.js
│   ├── dashboard.js
│   ├── interview.js
│   ├── resume.js
│   └── user.js
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/             # Main application routes
│   │   ├── ai-cover-letter/
│   │   ├── behind-the-build/
│   │   ├── dashboard/
│   │   ├── interview/
│   │   ├── onboarding/
│   │   └── resume/
│   ├── api/                # API routes
│   │   └── inngest/
│   └── layout.js
├── components/             # React components
│   ├── ui/                # Shadcn UI components
│   ├── header.jsx
│   └── hero.jsx
├── data/                  # Static data files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   └── inngest/
└── prisma/                # Database schema
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma database studio

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section |
| `/sign-in` | User authentication |
| `/sign-up` | User registration |
| `/onboarding` | New user onboarding |
| `/dashboard` | Main user dashboard |
| `/resume` | Resume builder |
| `/ai-cover-letter` | AI cover letter generator |
| `/interview` | Mock interview practice |
| `/behind-the-build` | Project story and tech details |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
