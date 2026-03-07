<div align="center">
  <h1>🎙️ AI Voice Companion SaaS</h1>
  <p>A real-time AI voice companion application built with Next.js 15+, allowing users to have conversational tutoring sessions using advanced AI models.</p>

  <!-- Badges -->
  <a href="https://github.com/vivekdevaa124/SaaS-app/commits/main">
    <img src="https://img.shields.io/github/last-commit/vivekdevaa124/SaaS-app?style=flat-square" alt="Last Commit" />
  </a>
  <a href="https://github.com/vivekdevaa124/SaaS-app/issues">
    <img src="https://img.shields.io/github/issues/vivekdevaa124/SaaS-app?style=flat-square" alt="Issues" />
  </a>
  <a href="https://github.com/vivekdevaa124/SaaS-app/pulls">
    <img src="https://img.shields.io/github/issues-pr/vivekdevaa124/SaaS-app?style=flat-square" alt="Pull Requests" />
  </a>
</div>

<br />

The application uses **Vapi AI** to connect the latest Speech-to-Text (STT), Large Language Models (LLMs), and Text-to-Speech (TTS) providers into a seamless, low-latency voice experience.

## ✨ Features

- **Real-time Voice Conversations:** Talk naturally with AI companions with low latency.
- **Customizable AI Personas:** Support for different subjects, topics, and teaching styles.
- **Robust Authentication:** Secure user management and sign-in via [Clerk](https://clerk.com/).
- **Database Architecture:** Stores companions, session history, and bookmarks securely in [Supabase](https://supabase.com/).
- **Provider Integrations:** Configured to use top-tier AI providers via [Vapi](https://vapi.ai/):
  - 👂 **Transcription (STT):** Speechmatics
  - 🧠 **Brain (LLM):** Cerebras (`llama3.1-8b`)
  - 🗣️ **Voice (TTS):** RimeAI (`mist` model, `abbie` voice)

## 🛠️ Technology Stack

| Category | Technology |
| --- | --- |
| **Framework** | Next.js (App Router, Turbopack) |
| **UI & Styling** | React 19, Tailwind CSS v4, Lucide Icons |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Clerk |
| **AI / Middleware** | Vapi AI (`@vapi-ai/web`) |
| **Error Tracking** | Sentry |

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed on your machine.
- Accounts for [Clerk](https://clerk.dev), [Supabase](https://supabase.com), and [Vapi](https://vapi.ai).

### 1. Clone the repository

```bash
git clone https://github.com/vivekdevaa124/SaaS-app.git
cd SaaS-app
npm install
```

### 2. Set up your Environment Variables

Create a `.env.local` file in the root of the project by copying the example format:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_clerk_sign_in_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_clerk_sign_up_url

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Vapi AI Voice
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_public_key
```

### 3. Setup the Database

You need to create the required tables in your Supabase project.

1. Go to your Supabase Dashboard -> SQL Editor.
2. Open the `supabase_setup.sql` file from the root of this project.
3. Paste the contents into the SQL Editor and run it to create the `companions`, `session_history`, and `bookmarks` tables.

### 4. Configure Vapi Integrations

To ensure the AI voice calls work, verify your Vapi account is set up with the required integrations:
1. Go to your [Vapi Dashboard](https://dashboard.vapi.ai).
2. Under "Integrations", add API keys for **Speechmatics**, **Cerebras**, and **RimeAI**.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🗂️ Project Structure

- `/app` - Next.js app router pages, layouts, and API routes.
- `/components` - Reusable React components (e.g., `CompanionComponent.tsx`, `Sidebar.tsx`).
- `/lib` - Utility functions, Vapi configuration (`utils.ts`), and Supabase client setup.
- `/types` - TypeScript type definitions.
- `/constants` - Application constants, predefined voice configurations, and theme colors.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Ensure types and linting pass (`npm run lint` and `npx tsc --noEmit`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request
