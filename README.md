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

Welcome to the **AI Voice Companion SaaS**. This project is a full-stack web application designed to provide users with interactive, low-latency voice tutoring sessions. It leverages the latest advancements in AI infrastructure to create a seamless conversational experience, acting as a personal tutor, language practice partner, or conversational companion.

## 🌟 Comprehensive Features

### 1. Ultra-Low Latency Voice Interaction
The core of this application is its ability to handle real-time voice conversations. By utilizing **Vapi AI** as middleware, the application connects directly to top-tier AI providers, bypassing traditional slow REST APIs for streaming audio processing. This results in human-like response times during conversations.

### 2. Provider Ecosystem
We have configured the application to use highly specialized AI providers to optimize for both speed and quality:
- 👂 **Transcription (STT - Speechmatics):** Converts user speech into text with high accuracy, even recognizing different accents and custom vocabularies.
- 🧠 **Brain (LLM - Cerebras):** The `llama3.1-8b` model running on Cerebras hardware provides near-instantaneous text generation, acting as the intelligent core of the companion.
- 🗣️ **Voice (TTS - RimeAI):** The `mist` model provides highly realistic, emotionally nuanced text-to-speech generation.

### 3. Dynamic AI Personas
Users are not locked into a single AI personality. The application allows for the creation and customization of different companions based on:
- **Subjects:** Mathematics, Science, History, Language Arts, etc.
- **Topics:** Specific sub-categories within a subject.
- **Teaching Styles:** Accommodating different learning preferences (e.g., Socratic method, direct instruction).

### 4. Full-Stack Infrastructure
- **Secure Authentication:** Integrated with **Clerk** to handle user sign-ups, logins, and session management securely.
- **Persistent Storage:** A relational database powered by **Supabase** (PostgreSQL) stores user profiles, companion configurations, and a comprehensive history of past sessions.

---

## 🏗️ Architecture & Data Flow

The architecture is designed for modern serverless environments:

1. **Frontend (Next.js App Router):** Handles the UI, state management, and initiates the WebRTC connection to Vapi.
2. **Authentication (Clerk):** Protects routes and ensures only authenticated users can access the dashboard and initiate calls.
3. **Voice Middleware (Vapi SDK):** The client-side `@vapi-ai/web` SDK connects directly to Vapi's servers. Vapi handles the complex orchestration of sending audio to Speechmatics, passing the transcript to Cerebras, and streaming the generated audio back from RimeAI to the browser.
4. **Backend/Database (Supabase):** Next.js Server Actions communicate securely with Supabase to read and write companion data and session histories.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| --- | --- | --- |
| **Framework** | Next.js 15+ (App Router) | Server-side rendering, routing, API endpoints |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design |
| **UI Components**| Radix UI & Lucide Icons | Accessible component primitives and iconography |
| **Database** | Supabase (PostgreSQL) | Relational database for application state |
| **Authentication**| Clerk | Secure user identity management |
| **AI Orchestration**| Vapi AI (`@vapi-ai/web`) | WebRTC connection and AI provider routing |
| **Error Tracking** | Sentry | Production monitoring and debugging |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher) & npm installed.
- **Accounts Required:**
  - [Clerk](https://clerk.dev) (Authentication)
  - [Supabase](https://supabase.com) (Database)
  - [Vapi](https://vapi.ai) (Voice AI Middleware)

### 1. Clone the repository

```bash
git clone https://github.com/vivekdevaa124/SaaS-app.git
cd SaaS-app
npm install
```

### 2. Set up Environment Variables

Create exactly one `.env.local` file in the root of the project. Copy the template below and fill in your specific keys from the respective dashboards.

```env
# Clerk Authentication (Get from Clerk Dashboard -> API Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=...
NEXT_PUBLIC_CLERK_SIGN_UP_URL=...

# Supabase Database (Get from Supabase Dashboard -> Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Vapi AI Voice (Get from Vapi Dashboard -> API Keys -> Public Key)
NEXT_PUBLIC_VAPI_WEB_TOKEN=...
```

### 3. Setup the Database Schema

You need to create the required tables in your Supabase project. We have provided an SQL script to automate this.

1. Go to your Supabase Dashboard -> **SQL Editor**.
2. Open the `supabase_setup.sql` file located in the root of this project.
3. Paste the contents into the Supabase SQL Editor and click **Run**. This creates the `companions`, `session_history`, and `bookmarks` tables.

### 4. Configure Vapi Integrations

To ensure the AI voice calls route successfully, you must link your provider accounts within Vapi.
1. Go to your [Vapi Dashboard](https://dashboard.vapi.ai).
2. Navigate to **Integrations** on the left menu.
3. Add your distinct API keys for **Speechmatics**, **Cerebras**, and **RimeAI**. Make sure they show as "Connected".

### 5. Start the Development Server

```bash
npm run dev
```

The application will now cleanly boot and be available at [http://localhost:3000](http://localhost:3000).

---

## 🗂️ Project Structure Deep Dive

- `/app` - Contains the Next.js App Router structure.
  - `(auth)` - Clerk authentication routes (`/sign-in`, `/sign-up`).
  - `(app)` - Protected application routes including the main `/dashboard`.
  - `/companions/[id]` - Dynamic route for starting a voice session with a specific companion.
- `/components` - Reusable modular React components.
  - `CompanionComponent.tsx` - The core functional component that handles the Vapi WebRTC connection, microphone toggling, and displays the transcript.
- `/lib` - Core business logic and integrations.
  - `utils.ts` - Contains the `configureAssistant` function where the Vapi payload (model, voice, transcriber settings) is dynamically generated based on the selected companion.
  - `supabase.ts` - The initialized Supabase client for database operations.
  - `actions/` - Next.js Server Actions for handling database mutations securely on the server.
- `/types` - Strict TypeScript interfaces defining the shape of our data (e.g., `Companion`, `Session`).

---

## 🤝 Contributing

We welcome contributions! If you'd like to improve the project, please follow these steps:

1. **Fork the Project**
2. **Create your Feature Branch:** `git checkout -b feature/AmazingFeature`
3. **Maintain Code Quality:** Ensure types and linting pass before committing. We enforce strict typing.
   ```bash
   npm run lint
   npx tsc --noEmit
   ```
4. **Commit your Changes:** `git commit -m 'Add some AmazingFeature'`
5. **Push to the Branch:** `git push origin feature/AmazingFeature`
6. **Open a Pull Request**
