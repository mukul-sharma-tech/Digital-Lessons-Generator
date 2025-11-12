// app/api/inngest/route.ts
import { inngest } from "@/lib/inngest";
import { serve } from "inngest/next";
import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { traceable } from "langsmith/traceable";

// --- 1. Initialize our clients (Supabase & Google) ---

const getSupabaseClient = () => createClient();

// Verify required environment variables
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set");
}

if (!process.env.LANGCHAIN_API_KEY) {
  console.warn("LANGCHAIN_API_KEY is not set - LangSmith tracing will be disabled");
}

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// --- 2. Define the System Prompt for Gemini ---
const SYSTEM_PROMPT = `
You are an expert TypeScript developer, React educator, and instructional designer.
You generate **interactive, visual, and engaging React components (TSX)** for any lesson topic.

---

### 🧠 Your Goal
Given a topic, create a **small, self-contained interactive React lesson component**.
It must be visually appealing, educational, and use **React hooks for interactivity**.

If the topic involves:
- **Math / Logic / Visualization:** create an interactive explainer (sliders, buttons, dynamic visualization).
- **Concepts (like AI, networks, OS):** create an explorable concept quiz or step-through example.
- **Code / Programming:** include an interactive code snippet simulation or mini challenge.
- **Animations (Math / Physics):** simulate animations using React (e.g., useEffect + setInterval). 
  You may mention how this could be enhanced using Manim (Python), but never import or require Python directly.

---

### ⚙️ TECHNICAL REQUIREMENTS

1. **Language & Framework**
   - Must be valid **TypeScript React (TSX)**.
   - Must include: \`import React, { useState, useEffect } from 'react';\`
   - No external libraries, APIs, or DOM manipulations.

2. **Component**
   - Name: \`LessonComponent\`
   - Must include **interactivity** via \`useState\` or \`useEffect\`.
   - Must end with: \`render(<LessonComponent />)\`

3. **Styling**
   - Use **Tailwind CSS** only.
   - Always include padding (\`p-6\`), rounded corners (\`rounded-xl\`), and shadows.
   - Ensure **contrast** (white-on-dark or dark-on-light).
   - Example outer container:
     - Dark: \`bg-gray-900 text-white\`
     - Light: \`bg-white text-gray-900 shadow-lg\`

4. **Output**
   - Return **only pure TSX code** (no markdown fences, no comments).
   - The component should work standalone inside a white or gray container.

---

### 🎨 VISUAL INSPIRATION
- Use animations with transitions (e.g., \`transition\`, \`hover:scale-105\`).
- Include short quizzes, toggles, reveal buttons, or sliders.
- Example idea patterns:
  - "Interactive Quiz"
  - "Step-by-step Concept Visualizer"
  - "Explore & Learn" card
  - "Math visualizer with changing values"

---

### 🧩 EXAMPLES

**User Topic:** "Pythagoras Theorem"
import React, { useState } from 'react';

const LessonComponent = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a*a + b*b).toFixed(2);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pythagoras Visualizer</h2>
      <p className="mb-4 text-gray-300">Change sides a and b to see the hypotenuse update dynamically.</p>
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="text-sm text-gray-400">a: {a}</label>
          <input type="range" min="1" max="10" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-400">b: {b}</label>
          <input type="range" min="1" max="10" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="text-xl font-semibold">c = √(a² + b²) = {c}</div>
    </div>
  );
};

render(<LessonComponent />);

---

### 🚫 NEVER DO
- Static paragraphs only.
- No background or padding.
- No shadow or rounded corners.
- Missing interactivity.
`;




function expandPrompt(outline: string): string {
  const templates = [
    (t: string) => `Create an interactive React lesson teaching the concept of "${t}" in a fun and visual way. Include small quizzes or sliders to make it hands-on.`,
    (t: string) => `Design a short, self-contained React lesson that helps users understand "${t}" through interactivity and visual feedback.`,
    (t: string) => `Generate a mini interactive React component that explains "${t}" using examples, quizzes, or dynamic visuals.`,
    (t: string) => `Teach the topic "${t}" as if you were a friendly AI tutor — use React interactivity to make learning fun.`,
  ];

  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  return randomTemplate(outline);
}


// Wrap the AI generation in a traceable function for LangSmith
const generateWithAI = traceable(
  async (outline: string, systemPrompt: string) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(outline);
    return result.response.text();
  },
  { name: "generate-lesson-code" }
);

// --- 3. Define the Inngest Background Job ---
const generateLessonFn = inngest.createFunction(
  { id: "generate-lesson-fn" },
  { event: "lesson/generate" },
  async ({ event }) => {
    const { lessonId, outline } = event.data;
    const supabase = await getSupabaseClient();

    console.log(`[LangSmith] Generating lesson ${lessonId} for outline: "${outline}"`);

    try {
      // Step 1: Call Gemini via traceable wrapper (automatically traced by LangSmith)
      // const tsxContent = await generateWithAI(outline, SYSTEM_PROMPT);

      const expandedPrompt = expandPrompt(outline);
      const tsxContent = await generateWithAI(expandedPrompt, SYSTEM_PROMPT);

      if (!tsxContent) {
        throw new Error("AI returned empty content");
      }

      console.log(`[LangSmith] Generated ${tsxContent.length} characters of TSX`);

      // Step 2: Validate the TSX
      if (tsxContent.includes("require(")) {
        throw new Error("Generated content uses require() instead of import statements.");
      }

      if (!tsxContent.includes("import React") ||
        !tsxContent.includes("const LessonComponent") ||
        !tsxContent.includes("render(<LessonComponent />)")) {
        throw new Error("Generated content is invalid (missing import, component definition, or render call).");
      }

      // Step 3: Update Supabase with the generated content
      const { error } = await supabase
        .from("lessons")
        .update({
          content: tsxContent,
          status: "generated",
        })
        .eq("id", lessonId);

      if (error) {
        throw new Error(`Supabase update error: ${error.message}`);
      }

      console.log(`[LangSmith] Successfully saved lesson ${lessonId} to database`);
      return { success: true, lessonId };

    } catch (error: unknown) {
      // Step 4: Handle failure and ensure error.message is accessible
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("[LangSmith] Failed to generate lesson:", errorMessage);

      await supabase
        .from("lessons")
        .update({ status: "failed" })
        .eq("id", lessonId);

      throw error;
    }
  }
);

// --- 4. Export the Inngest API handler ---
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateLessonFn],
});
