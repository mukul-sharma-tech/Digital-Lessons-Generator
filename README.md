# 🧠 Digital Lessons Generator

A full-stack **Next.js** application built to solve the **“Digital Lessons”** challenge. Users enter a topic, and the system generates & renders a **fully interactive, AI-powered React (TSX) lesson** in real-time.

The project is architected with **decoupled background jobs**, **realtime updates**, **sandboxed rendering**, and **multi-layer reliability** to handle unpredictable AI output safely.

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components)
- **Database:** Supabase (Postgres)
- **Realtime:** Supabase Realtime
- **Backend Jobs:** Inngest (reliable background job generation)
- **AI Models:** Google Gemini 2.5 Flash → fallback: 2.0 Flash
- **AI Tracing:** LangSmith
- **Renderer:** react-live (sandboxed TSX execution)
- **Styling:** Tailwind CSS

---

## ✨ Key Features

### 🔹 AI Lesson Generation  
Input a topic (e.g., *“Pythagoras Theorem”*) → generate a complete interactive React component lesson.

### 🔹 Decoupled Architecture  
Inngest handles generation as a background job.  
Users never wait — they get an instant “Generating…” status.

### 🔹 Real-time UI  
Supabase Realtime updates the lessons table instantly without refresh.

### 🔹 Safe Sandboxed Rendering  
AI-generated TSX is executed inside a `react-live` sandbox with error boundaries.

### 🔹 Full Observability  
LangSmith logs every generation with prompts, outputs, and errors.

### 🔹 AI Model Fallback  
If gemini-2.5-flash fails → gemini-2.0-flash is automatically tried.

### 🔹 Robust Error Handling  
Multi-layer system handles:
- API failures  
- RLS errors  
- Bad AI code  
- Runtime errors  

### 🔹 Responsive UI  
Mobile-first, clean, and fully responsive interface.

---

## 🔬 AI Tracing with LangSmith

LangSmith provides trace logs for every AI run.

### How to Share Traces:
1. Open your LangSmith project (e.g., `lesson-generator`)
2. Open any trace  
3. Click **Share** → copy public link

#### Example Traces:
- **Successful Run:**
  https://smith.langchain.com/public/27889cf3-6b5b-43ec-a9d8-c81cfcd66f22/r
  https://smith.langchain.com/public/449fb9d0-d9f6-4256-8f81-1014de6e88b3/r
  https://smith.langchain.com/public/82fcbb6c-c3f1-4f87-b86c-ea84aed3dca5/r
  https://smith.langchain.com/public/a6e08744-c64a-4d84-9cc2-f6701af866d9/r
  https://smith.langchain.com/public/6ab63cca-9a2a-49aa-99b0-97819d882b04/r  
---

## ⚙️ Architecture: Step-by-Step Flow

### 1️⃣ Page Load (`/`)
Next.js Server Component fetches lessons.  
`<LessonsTable />` listens via Supabase Realtime.

### 2️⃣ User Submit  
User enters a topic → calls `/api/generate`.

### 3️⃣ Kick-off (`/api/generate`)
Creates a DB row (`status = "generating"`).  
Sends an **Inngest event**.  
Returns `202 Accepted` immediately.

### 4️⃣ Realtime Update (Start)
Supabase broadcasts INSERT → UI shows new lesson with “Generating…”

### 5️⃣ Inngest Handshake  
Inngest receives event → securely calls `/api/inngest`.

### 6️⃣ Backend Brain (`/api/inngest`)
- Starts traced function via LangSmith  
- Calls Gemini (2.5 → fallback 2.0)  
- Validates TSX format  
- Updates lesson row with generated content  
- Sets `status = "generated"`

### 7️⃣ Realtime Update (Finish)
Supabase broadcasts UPDATE → UI updates instantly

### 8️⃣ Lesson Page (`/lessons/[id]`)
Fetches code → passes to `<LessonRenderer />`.

### 9️⃣ Sandboxed Rendering  
`react-live` sanitizes, executes, and catches errors safely.

---

## 🛡️ Defense-in-Depth Architecture

A 3-layer system ensures safety from AI-generated bugs.

---

### **🔰 Layer 1: Gatekeeper (Backend Prompting & Fallbacks)**

**File:** `app/api/inngest/route.ts`

- Strict prompt rules  
- Multi-key fallback  
- Model fallback (2.5 → 2.0)  
- Rudimentary TSX validation

---

### **🧪 Layer 2: Safety Net (Frontend Sandbox)**

**File:** `LessonRenderer.tsx`

- Code cleaning  
- Sandboxed evaluation with `react-live`  
- `<LiveError />` catches runtime errors  
- App never crashes

---

### **📦 Layer 3: Black Box (Observability)**

**File:** `app/api/inngest/route.ts`

- LangSmith trace logging  
- Allows debugging & SYSTEM_PROMPT improvements  

---

## 🛠️ Local Development

### 1. Clone & Install
```bash
git clone ...
bun install
```

## 🛠️ Setup Guide

### 2. Create Supabase Project
After creating your Supabase project, copy:
- **Project URL**
- **Anon Key**

Add them to your environment variables later.

---

### 3. Run SQL (Create Table + RLS)

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
CREATE POLICY "Allow public read access" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.lessons FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON public.lessons FOR DELETE USING (true);
```

### 4. Enable Realtime

Go to:

**Database → Replication → supabase_realtime → Add table → `lessons`**

This enables real-time updates for the lessons table.

---

## 🌱 Environment Variables (`.env.local`)

Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GOOGLE_API_KEY=
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=
INNGEST_DEV=true
INNGEST_EVENT_KEY=inngest_dev_key
```



---

## ▶️ Run Dev Servers

### Terminal 1 — Start Next.js
```bash
bun run dev
```
### Terminal 2 — Start Inngest Dev Server

```bash
npx inngest-cli dev
```
Inngest Dev Dashboard:  
**http://localhost:8288**

---

# 🚀 Deployment (Vercel)

### 1. Push the project to GitHub  
### 2. Import the repository into Vercel  
### 3. Add Environment Variables

Add **all variables** from `.env.local` **except**:

❌ `INNGEST_DEV`  
❌ `INNGEST_EVENT_KEY` (dev key)

These are used **only for local development**.

---

### 4. Set Up Inngest Production

In **Inngest Dashboard → Create a Production Project**.

You will receive two keys:

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=


Add both of these at:  
**Vercel → Project Settings → Environment Variables**

---

### 5. Deploy the Project  
Click **Deploy** on Vercel.

---

### 6. Final Step — Set Inngest Endpoint URL

Go to:

**Inngest Cloud → Production Environment → Endpoint URL**

Set this value to: https://your-app.vercel.app/api/inngest
