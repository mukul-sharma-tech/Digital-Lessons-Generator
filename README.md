<div align="center">

# 🧠 Digital Lessons Generator

**AI-Powered Interactive Learning Platform**

*Transform any topic into an engaging, interactive lesson with a 3D human-like teacher*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📖 Overview

A full-stack **Next.js** application that transforms any topic into a **fully interactive, AI-powered React lesson** in real-time. Features include:

- 🤖 **AI Lesson Generation** - Generate complete interactive React components from any topic
- 🎓 **3D Avatar Teacher** - Learn from an immersive human-like teacher with multi-language support
- ⚡ **Real-time Updates** - Instant UI updates via Supabase Realtime
- 🛡️ **Production-Ready** - Multi-layer error handling and validation
- 🔍 **Full Observability** - LangSmith tracing for every AI generation

---

## 🚀 Tech Stack

<table>
<tr>
<td align="center" width="33%">
  <strong>Frontend</strong><br/>
  Next.js 14 (App Router)<br/>
  React Three Fiber<br/>
  Tailwind CSS
</td>
<td align="center" width="33%">
  <strong>Backend</strong><br/>
  Supabase (Postgres)<br/>
  Inngest (Background Jobs)<br/>
  Server Actions
</td>
<td align="center" width="33%">
  <strong>AI & Tools</strong><br/>
  Google Gemini 2.5 Flash<br/>
  LangSmith Tracing<br/>
  React Live (Sandbox)
</td>
</tr>
</table>

### Core Technologies

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router, Server Components) |
| **Database** | Supabase (Postgres) with Realtime |
| **Background Jobs** | Inngest (reliable job generation) |
| **AI Models** | Google Gemini 2.5 Flash → fallback: 2.0 Flash |
| **AI Tracing** | LangSmith |
| **3D Graphics** | @react-three/fiber, @react-three/drei |
| **Renderer** | react-live (sandboxed TSX execution) |
| **Styling** | Tailwind CSS |

---

## ✨ Key Features

### 🔹 AI Lesson Generation
> Input a topic (e.g., *"Pythagoras Theorem"*) → generate a complete interactive React component lesson.

**Features:**
- ✅ Automatic TSX code generation
- ✅ Interactive components with quizzes and sliders
- ✅ Fully responsive design
- ✅ Mobile-first approach

---

### 🔹 Decoupled Architecture
> Inngest handles generation as a background job. Users never wait — they get an instant "Generating…" status.

**Benefits:**
- ⚡ Instant feedback
- 🔄 Background processing
- 📊 Real-time status updates
- 🎯 Non-blocking UI

---

### 🔹 Real-time UI
> Supabase Realtime updates the lessons table instantly without refresh.

**Capabilities:**
- 🔔 Live status updates
- 📡 WebSocket connections
- 🔄 Automatic UI refresh
- ⚡ Zero manual refresh needed

---

### 🔹 Safe Sandboxed Rendering
> AI-generated TSX is executed inside a `react-live` sandbox with error boundaries.

**Security:**
- 🛡️ Isolated execution environment
- 🚫 No access to app/global scope
- ⚠️ Runtime error capture
- 🔒 Safe code execution

---

### 🔹 Full Observability
> LangSmith logs every generation with prompts, outputs, and errors.

**Tracing:**
- 📊 Complete execution logs
- 🔍 Prompt inspection
- 🐛 Error debugging
- 📈 Performance metrics

---

### 🔹 AI Model Fallback
> If gemini-2.5-flash fails → gemini-2.0-flash is automatically tried.

**Reliability:**
- 🔄 Automatic fallback
- 🎯 Zero downtime
- 📈 High availability
- ⚡ Seamless switching

---

### 🔹 Robust Error Handling
> Multi-layer system handles all edge cases gracefully.

**Error Types Handled:**
- ❌ API failures
- 🔒 RLS errors
- 💻 Bad AI code
- ⚠️ Runtime errors

---

### 🔹 Responsive UI
> Mobile-first, clean, and fully responsive interface.

**Design:**
- 📱 Mobile-optimized
- 💻 Desktop-friendly
- 🎨 Modern UI/UX
- ♿ Accessible

---

### 🎓 3D Avatar Teacher
> Interactive 3D human-like teacher that explains lessons in story format.

**Features:**
- 🌍 **Multi-language Support:** English, Hindi, and Hinglish
- 🗣️ **Voice Narration:** Text-to-speech with lip-sync animations
- 🔄 **Dynamic Content:** Automatically extracts and explains lesson topics
- 🎭 **Immersive Experience:** 3D avatar with natural animations and gestures

---

## 🔬 AI Tracing with LangSmith

LangSmith provides comprehensive trace logs for every AI generation, enabling full observability and debugging.

### 📤 How to Share Traces

1. Open your LangSmith project (e.g., `lesson-generator`)
2. Navigate to any trace
3. Click **Share** → copy public link
4. Share with your team or use for debugging

### 🔗 Example Traces

<details>
<summary><b>View Example Trace Links</b></summary>

- [Successful Run #1](https://smith.langchain.com/public/27889cf3-6b5b-43ec-a9d8-c81cfcd66f22/r)
- [Successful Run #2](https://smith.langchain.com/public/449fb9d0-d9f6-4256-8f81-1014de6e88b3/r)
- [Successful Run #3](https://smith.langchain.com/public/82fcbb6c-c3f1-4f87-b86c-ea84aed3dca5/r)
- [Successful Run #4](https://smith.langchain.com/public/a6e08744-c64a-4d84-9cc2-f6701af866d9/r)
- [Successful Run #5](https://smith.langchain.com/public/6ab63cca-9a2a-49aa-99b0-97819d882b04/r)

</details>

---

## ⚙️ Architecture: Step-by-Step Flow

<img width="1888" height="5740" alt="image" src="https://github.com/user-attachments/assets/42f77e20-9f4f-4a37-9988-387fdccb989e" />


### 📋 Detailed Flow

#### 1️⃣ **Page Load** (`/`)
- Next.js Server Component fetches lessons
- `<LessonsTable />` listens via Supabase Realtime

#### 2️⃣ **User Submit**
- User enters a topic → calls `/api/generate`

#### 3️⃣ **Kick-off** (`/api/generate`)
- Creates a DB row (`status = "generating"`)
- Sends an **Inngest event**
- Returns `202 Accepted` immediately

#### 4️⃣ **Realtime Update (Start)**
- Supabase broadcasts INSERT
- UI shows new lesson with "Generating…"

#### 5️⃣ **Inngest Handshake**
- Inngest receives event
- Securely calls `/api/inngest`

#### 6️⃣ **Backend Brain** (`/api/inngest`)
- ✅ Starts traced function via LangSmith
- ✅ Calls Gemini (2.5 → fallback 2.0)
- ✅ Validates TSX format
- ✅ Updates lesson row with generated content
- ✅ Sets `status = "generated"`

#### 7️⃣ **Realtime Update (Finish)**
- Supabase broadcasts UPDATE
- UI updates instantly

#### 8️⃣ **Lesson Page** (`/lessons/[id]`)
- Fetches code → passes to `<LessonRenderer />`
- **✨ New:** "Learn from a Human-like Teacher" button appears

#### 9️⃣ **Sandboxed Rendering**
- `react-live` sanitizes, executes, and catches errors safely

#### 🔟 **3D Teacher Explanation** (`/lessons/[id]/explain`)
- User clicks "Learn from a Human-like Teacher" button
- Language selector appears (English, Hindi, Hinglish)
- Content is extracted from lesson code
- Story is generated via `/api/generate-story` using Gemini AI
- 3D avatar narrates the story with speech synthesis and lip-sync
- Interactive 3D model with orbit controls

---

## 🛡️ TSX Validation + Auto-Retry System

> **Recent Major Reliability Upgrade**

### ✅ True TSX Validation

The backend now validates generated code using **esbuild transpilation**.

```
If TSX cannot compile → generation attempt is discarded
```

### ✅ Automatic 3× Retry Loop

Generation runs inside a retry loop:

```typescript
for (let attempt = 1; attempt <= 3; attempt++) {
  // Regenerate TSX
  // Validate via esbuild
  // Repeat silently if failed
}
```

**What this means:**
- 🔄 Regenerates TSX automatically
- ✅ Validates via esbuild
- 🔁 Repeats up to three times silently
- 👤 Users see "Generating…", never error noise

### ✅ Fail-Safe Mode

Only if:
- ❌ All 3 attempts fail
- ❌ Model fallback fails

Then → `status = "failed"`  
Frontend shows a clean error message.

> **This upgrade makes the system EXTREMELY reliable for AI-generated code.**

---

## 🛡️ Defense-in-Depth (4 Layers)

### 🟣 Layer 0 — Backend TSX Validation (NEW)

| Feature | Description |
|---------|-------------|
| **esbuild transpilation** | Syntax-level correctness |
| **Auto-retries** | Up to 3 attempts |
| **Fallback model** | Gemini 2.0 if 2.5 fails |
| **Result** | Blocks all invalid TSX before DB write |

---

### 🔰 Layer 1 — Backend Gatekeeper

| Feature | Description |
|---------|-------------|
| **Strict system prompts** | Controlled generation |
| **Output sanitization** | Clean code output |
| **Safety heuristics** | Content validation |
| **Structured formatting** | Consistent output |

---

### 🧪 Layer 2 — Frontend Sandbox Execution

| Feature | Description |
|---------|-------------|
| **react-live sandbox** | Isolated execution |
| **Fast refresh isolation** | No global scope access |
| **Live runtime error capture** | Real-time debugging |
| **No app/global scope** | Complete isolation |

---

### 📦 Layer 3 — Trace Logging (LangSmith)

| Feature | Description |
|---------|-------------|
| **View full execution** | Complete trace logs |
| **Inspect failures** | Error analysis |
| **Optimize prompts** | Performance tuning |
| **Debug generation** | Consistency checks |

---

## 🎓 3D Teacher Integration

### 📖 Overview

The 3D Teacher feature provides an **immersive, human-like learning experience** where an animated 3D avatar explains lesson topics in a story format. This feature is seamlessly integrated into the lesson viewing experience.

### 🔄 How It Works

#### 1. **Access Point**
- On any generated lesson page (`/lessons/[id]`), a prominent button appears:
  - **"Learn from a Human-like Teacher"**
- This button is only visible when `lesson.status === "generated"`

#### 2. **Language Selection**
User is presented with a language selector:

| Language | Description |
|----------|-------------|
| **English** | Full English narration |
| **Hindi (हिंदी)** | Complete Hindi narration |
| **Hinglish** | Mixed Hindi and English |

#### 3. **Content Processing**
- System automatically extracts meaningful text from the lesson's TSX code
- Removes code syntax, imports, and JSX tags
- Extracts string literals and content for story generation

#### 4. **Story Generation** (`/api/generate-story`)
- Server-side API route handles story generation securely
- Uses Gemini 2.5 Flash with explicit language instructions
- System instruction ensures proper language output
- Generates engaging, beginner-friendly story explanations

#### 5. **3D Avatar Presentation**
- 3D model loads with natural animations (Idle, Talking)
- Text-to-speech synthesis in selected language
- Lip-sync animations match speech patterns
- Blinking and head movements for natural behavior
- Orbit controls allow users to view from different angles

### 🔧 Technical Implementation

#### **Components:**

| Component | Description |
|-----------|-------------|
| `LessonStoryNarrator.tsx` | Main 3D presentation component (Next.js compatible) |
| `Avatar.jsx` | 3D model with animations and lip-sync |
| `/lessons/[id]/explain/page.tsx` | Explanation page with language selection |
| `/api/generate-story/route.ts` | Server-side story generation API |

#### **Features:**

- ✅ Secure API key handling (server-side only)
- ✅ Multi-language support with proper translation
- ✅ Automatic content extraction from lesson code
- ✅ Real-time speech synthesis
- ✅ Responsive 3D rendering
- ✅ Error handling and fallbacks

#### **3D Model Requirements:**

- **Location:** `/public/models/human.glb`
- **Required Features:**
  - Idle and Talking animations
  - Morph targets: `mouthOpen`, `eyeBlinkLeft`, `eyeBlinkRight`
  - Proper head mesh for lip-sync

### 📡 API Endpoint

#### **POST `/api/generate-story`**

**Request Body:**
```json
{
  "content": "Extracted lesson content",
  "topic": "Lesson topic/title",
  "language": "english" | "hindi" | "hinglish"
}
```

**Response:**
```json
{
  "story": "Generated story in selected language"
}
```

---

## 🛠️ Setup Guide

### 📋 Prerequisites

- Node.js 18+ or Bun
- Supabase account
- Google Gemini API key
- Inngest account (for production)

---

### 1️⃣ Clone & Install

```bash
git clone <repository-url>
cd --project
bun install
# or
npm install
```

---

### 2️⃣ Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy the following:
   - **Project URL**
   - **Anon Key**

> These will be added to your environment variables.

---

### 3️⃣ Run SQL (Create Table + RLS)

Run this SQL in **Supabase → SQL Editor**:

```sql
-- Create the table
CREATE TABLE public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  outline TEXT,
  status TEXT DEFAULT 'generating' NOT NULL,
  content TEXT
);

-- Enable RLS
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access" 
  ON public.lessons FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" 
  ON public.lessons FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" 
  ON public.lessons FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete access" 
  ON public.lessons FOR DELETE USING (true);
```

---

### 4️⃣ Enable Realtime

1. Go to **Database → Replication**
2. Find **supabase_realtime**
3. Click **Add table** → select `lessons`

> This enables real-time updates for the lessons table.

---

### 5️⃣ Environment Variables

Create a `.env.local` file in the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API
GOOGLE_API_KEY=your_primary_gemini_key
GOOGLE_API_KEY2=your_secondary_gemini_key  # Optional: For 3D teacher (avoids rate limits)

# LangSmith (Optional)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langsmith_key

# Inngest (Development)
INNGEST_DEV=true
INNGEST_EVENT_KEY=inngest_dev_key
```

> **Note:** `GOOGLE_API_KEY2` is used for the 3D teacher story generation feature as a second key to avoid rate limits on the first API key (which is used mainly for AI-generated lessons). If not set, it will fall back to `GOOGLE_API_KEY`.

---

## ▶️ Run Dev Servers

### Terminal 1 — Start Next.js

```bash
bun run dev
# or
npm run dev
```

> Server will start at `http://localhost:3000`

---

### Terminal 2 — Start Inngest Dev Server

```bash
npx inngest-cli dev
```

> Inngest Dev Dashboard: **http://localhost:8288**

---

## 🚀 Deployment (Vercel)

### 1️⃣ Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

---

### 2️⃣ Import to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Configure project settings

---

### 3️⃣ Add Environment Variables

Add **all variables** from `.env.local` **except**:

- ❌ `INNGEST_DEV`
- ❌ `INNGEST_EVENT_KEY` (dev key)

> These are used **only for local development**.

---

### 4️⃣ Set Up Inngest Production

1. Go to **Inngest Dashboard**
2. Create a **Production Project**
3. You will receive two keys:
   - `INNGEST_EVENT_KEY`
   - `INNGEST_SIGNING_KEY`

4. Add both keys at:
   - **Vercel → Project Settings → Environment Variables**

---

### 5️⃣ Deploy

Click **Deploy** on Vercel.

---

### 6️⃣ Final Step — Set Inngest Endpoint URL

1. Go to **Inngest Cloud → Production Environment**
2. Navigate to **Endpoint URL**
3. Set this value to:
   ```
   https://your-app.vercel.app/api/inngest
   ```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [LangSmith Documentation](https://docs.smith.langchain.com/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Made with ❤️ using Next.js, Supabase, and AI**

[⬆ Back to Top](#-digital-lessons-generator)

</div>
